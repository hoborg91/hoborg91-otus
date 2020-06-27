const fs = require('fs');

function randomInt(upperBound) {
    if (typeof upperBound !== typeof 0 || upperBound <= 0)
        throw new Error(`Given upperBound equals ${upperBound}.`);
    const num = Math.random();
    return Math.floor(num * upperBound);
}

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}

function createSourceFile(sourceFile, megabytes) {
    return new Promise((resolve, reject) => {
        const bytes = megabytes * 1024 * 1024;
        let writtenCount = 0;
        if (!fs.existsSync(sourceFile) || fs.statSync(sourceFile).size === 0) {
            let writtenBytes = 0;
            function write() {
                var stream = fs.createWriteStream(sourceFile, { flags: 'a', });
                for (let i = 0; i < 100 * 1000; i++) {
                    const toWrite = randomInt(1000 * 1000) + '\n';
                    writtenBytes += byteCount(toWrite);
                    stream.write(toWrite);
                    writtenCount++;
                }
                stream.end(() => {
                    const progress = Math.floor((writtenBytes / bytes) * 100);
                    console.log(`[Create source file] ${(progress < 100 ? progress : 100)}% completed`);
                    if (writtenBytes < bytes) {
                        write();
                    } else {
                        resolve(sourceFile, writtenCount);
                    }
                });
            }
            write();
        }
        else {
            resolve(sourceFile, writtenCount);
        }
    });
}

module.exports = createSourceFile;