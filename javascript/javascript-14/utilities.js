const parseChunk = (chunk, last) => {
    const splitted = ((last || '') + chunk).split('\n');
    last = splitted[splitted.length - 1];
    const nums = splitted
        .filter((n, index) => index < splitted.length - 1)
        .map(s => parseInt(s));
    return { nums, last, };
};

const all = (array, where) => {
    for (let i = 0; i < array.length; i++) {
        if (!where(array[i], i, array))
            return false;
    }
    return true;
};

const any = (array, where) => {
    for (let i = 0; i < array.length; i++) {
        if (where(array[i], i, array))
            return true;
    }
    return false;
};

module.exports = {
    parseChunk,
    all,
    any,
};
