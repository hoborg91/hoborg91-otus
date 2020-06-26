const fs = require('fs');
const createSourceFile = require('./createSourceFile.js');
const splitIntoOrderedFiles = require('./splitIntoOrderedFiles.js');
const merge = require('./merge.js');

const sourceFile = 'source.txt';
const outputFile = 'output.txt';

createSourceFile(sourceFile, 100)
    .then((file, writtenNumbersCount) => splitIntoOrderedFiles(file))
    .then((partFiles) => merge(partFiles, outputFile))
    .then((file, writtenNumbersCount) => console.log('OK'));

console.log('Run...');