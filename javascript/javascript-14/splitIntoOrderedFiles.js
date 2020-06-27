const fs = require('fs');
const { pipeline, } = require('stream');
const { parseChunk, } = require('./utilities.js');

function splitIntoOrderedFiles(sourceFile, callback) {
    return new Promise((resolve, reject) => {
        console.log('[Split into parts] Begin...');
        const result = [];
        pipeline(
            fs.createReadStream(sourceFile),
            async function*(source) {
                let last = '';
                for await (const chunk of source) {
                    const parsed = parseChunk(chunk, last);
                    last = parsed.last;
                    for (let j = 0; j < parsed.nums.length; j++)
                        yield parsed.nums[j];
                }
                const lastResult = parseInt(last);
                if (Number.isInteger(lastResult))
                    yield lastResult;
            },
            async function*(source) {
                let partIndex = 0;
                let numsBuf = [];
                for await (const num of source) {
                    numsBuf.push(num);
                    //if (partIndex > 10)
                    //    break;
                    if (numsBuf.length > 200 * 1000) {
                        const toWrite = numsBuf.sort((a, b) => a - b)
                            .reduce((a, n) => a + '\n' + n);
                    
                        const partFileName = `part-${partIndex}.txt`;
                        const w = fs.createWriteStream(partFileName);
                        w.write(toWrite);
                        w.end();
                        result.push(partFileName);

                        numsBuf = [];
                        partIndex++;
                    }
                }
                const toWrite = numsBuf
                    .sort((a, b) => a - b)
                    .reduce((a, n) => a + '\n' + n);
                const partFileName = `part-${partIndex}.txt`;
                const w = fs.createWriteStream(partFileName);
                w.write(toWrite + '');
                w.end();
                result.push(partFileName);

                numsBuf = [];
            },
            (err) => {
                if (err) {
                    console.error('[Split into parts] Pipeline failed.', err);
                    reject(err);
                } else {
                    console.log('[Split into parts] Pipeline succeeded.');
                    resolve(result);
                }
            }
        );
    });
}

module.exports = splitIntoOrderedFiles;