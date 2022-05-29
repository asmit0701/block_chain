const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block-
        TimeStamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 10)}
        Hash     : ${this.hash.substring(0, 10)}
        Data     : ${this.data}
        `
    }

    static genesis() {
        return new this('Genesis Time', '_______', 'Fir$T_H@$h', []);
    }

    static mineBlock(lastBlock, data) {
        const time = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(time, lastHash, data);
        return new this(time, lastHash, hash, data);
    }
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}
module.exports = Block;