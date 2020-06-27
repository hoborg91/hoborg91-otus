const fs = require('fs');

function parseNums(file) {
    return (fs.readFileSync(file) + '')
        .split('\n')
        .filter(c => c.length > 0)
        .map(c => parseInt(c));
}

function checkOrder(nums, i, file) {
    if (i > 0 && nums[i - 1] > nums[i]) {
        throw new Error(`Not ordered: "${file}", index = ${i - 1}, ` + 
            `elements = ${nums[i - 1]} and ${nums[i]}.`);
    }
}

const srcFile = 'source.txt';
const dstFile = 'output.txt';

const src = parseNums(srcFile);
const dst = parseNums(dstFile);

console.log(`Source file numbers count: ${src.length}.`);
console.log(`Destination file numbers count: ${dst.length}.`);

if (src.length !== dst.length)
    throw new Error('src.length !== dst.length');

const srcDict = [];
const dstDict = [];

for (let i = 0; i < src.length; i++) {
    const srcElement = src[i];
    const dstElement = dst[i];

    if (srcDict[srcElement] === undefined)
        srcDict[srcElement] = 1;
    else
        srcDict[srcElement]++;

    if (dstDict[dstElement] === undefined)
        dstDict[dstElement] = 1;
    else
        dstDict[dstElement]++;
    
    checkOrder(dst, i, dstFile);

    if (i % (100 * 1000) === 0) {
        const progress = Math.floor((i / src.length) * 100);
        console.log('Checked: ' + (progress < 100 ? progress : 100) + '%');
    }
}
console.log('Checked: 100%');

srcDict.forEach((sv, si) => {
    const dv = dstDict[si];
    if (sv !== dv)
        throw new Error(`No coincidence. ` +
            `Element ${si} is presented ${sv} time(s) in ${srcFile} and ` +
            `${(dv || 0)} time(s) in ${dstFile}.`);
});

console.log('OK');