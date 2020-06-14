const fs = require('fs');
const util = require('util');
const pathUtil = require('path');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

async function tree(path, recursive) {
    if (typeof path !== typeof '' || path.trim().length === 0)
        throw new Error('The given "path" argument must be a valid directory path.');
    if (recursive !== undefined && recursive !== true)
        throw new Error('The given "recursive" argument must be either undefined or true.');

    let files = [], folders = [];
    
    const items = await readdir(path);
    for (let i = 0; i < items.length; i++) {
        const item = pathUtil.join(path, items[i]);
        const st = await stat(item);
        if (st.isDirectory())
            folders.push(item);
        else
            files.push(item);
    }

    const subResultsPromises = folders.map(async (subFolder, index) => {
        const subPath = subFolder;
        const subResult = await tree(subPath, true);
        return { index, subResult, };
    });
    const subResults = await Promise.all(subResultsPromises);
    subResults
        .sort((a, b) => a.index - b.index)
        .forEach(({ subResult, }) => {
            files = files.concat(subResult.files);
            folders = folders.concat(subResult.folders);
        });

    if (recursive !== true)
        folders = [ pathUtil.normalize(path), ...folders, ];

    return { files, folders, };
}

module.exports.tree = tree;
