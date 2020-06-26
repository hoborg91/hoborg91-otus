const stream = require('stream');
const fs = require('fs');
const { parseChunk, } = require('./utilities.js');

class Reader {
    _numbers = [];
    _last = null;
    _onReady;
    _resume;
    _ended = false;
    _name;
    _total = 0;
    _consumed = 0;

    constructor(partFile) {
        this._name = partFile;
        const readStream = fs.createReadStream(partFile);
        readStream.pause();
        readStream.on("data", (chunk) => {
            const parsed = parseChunk(chunk, this._last);
            this._numbers.push(...parsed.nums);
            this._total += parsed.nums.length;
            this._last = parsed.last;
            readStream.pause();
            this._onReady(this._name + ` (data, ${this._numbers.length})`);
        });
        readStream.on("end", () => {
            this._ended = true;
            readStream.close();
            this._cleanLast();
        });
        this.close = () => readStream.close();
        this._resume = () => readStream.resume();
    }

    _cleanLast() {
        if (this._last !== null && this._last.length > 0) {
            const parsedLast = parseInt(this._last);
            this._numbers.push(parsedLast);
            this._total += 1;
            this._last = '';
        }
    }

    run(onReady) {
        if (onReady !== null && onReady !== undefined)
            this._onReady = onReady;
        if (this.isAbsExhausted())
            return;
        if (this._ended) {
            this._cleanLast();
            this._onReady(this._name + ` (run, ${this._numbers.length})`);
            return;
        }
        this._resume();
    }

    peek() {
        if (this._numbers.length === 0)
            throw new Error('Cannot peek!');
        return this._numbers[0];
    }

    consume() {
        if (this._numbers.length === 0)
            throw new Error('Cannot consume!');
        this._consumed++;
        return this._numbers.shift();
    }

    isFull() {
        return this._numbers.length > 0;
    }

    isTempExhausted() {
        return !this.isFull() && this._ended === false;
    }

    isAbsExhausted() {
        return !this.isFull() && this._ended === true;
    }

    getName() {
        return this._name;
    }
}

module.exports = Reader;