const fs = require('fs');
const { all, any, } = require('./utilities.js');
const Reader = require('./reader.js');

const limit = 100 * 1000;

function getMin(fullReaders) {
    let minIdx = 0;
    for (let i = 1; i < fullReaders.length; i++) {
        if (fullReaders[i].peek() < fullReaders[minIdx].peek())
            minIdx = i;
    }
    return fullReaders[minIdx].consume();
}

function merge(partFiles, outputFile) {
    return new Promise((resolve, reject) => {
        partFiles.forEach(f => console.log(f));
        const readers = partFiles.map(f => new Reader(f));
        let writtenNumbersCount = 0;
        const onReady = (who) => {
            if (all(readers, r => r.isAbsExhausted())) {
                console.log(`[Merge] Written number count: ${writtenNumbersCount}.`);
                resolve(outputFile, writtenNumbersCount);
                return;
            }
            const waitFor = readers.filter(r => r.isTempExhausted());
            if (waitFor.length > 0) {
                return;
            }
            const fullReaders = readers.filter(r => r.isFull());
            if (fullReaders.length === 0) {
                throw new Error('No full readers.');
            }
            let counter = 0;
            const writeStream = fs.createWriteStream(outputFile, { flags: 'a', });
            while (counter < limit && all(fullReaders, r => r.isFull())) {
                const nextValue = getMin(fullReaders);
                writeStream.write(nextValue + '\n');
                counter++;
            }
            writtenNumbersCount += counter;
            writeStream.on('close', () => {
                console.log(`[Merge] Written number count: ${writtenNumbersCount}.`);
                const exhausted = fullReaders.filter(r => r.isTempExhausted());
                if (exhausted.length === 0) {
                    onReady('main cycle');
                } else {
                    exhausted.forEach(r => r.run());
                }
            });
            writeStream.close();
        };
        readers.forEach(r => r.run(onReady));
    });
}

module.exports = merge;