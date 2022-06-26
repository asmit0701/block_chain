const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');
//console.log(MINE_RATE);
class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block-
        TimeStamp : ${this.timestamp}
        Last Hash : ${this.lastHash.substring(0, 10)}
        Hash      : ${this.hash.substring(0, 10)}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Mine Rate : ${MINE_RATE}
        Data      : ${this.data}
        `
    }

    static genesis() {
        return new this('Genesis Time', '_______', 'Fir$T_H@$h', [], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
        let nonce, time;
        nonce = 0;
        let hash;
        let { difficulty } = lastBlock;
        const lastHash = lastBlock.hash;

        do {
            nonce++;
            time = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, time);
            hash = Block.hash(time, lastHash, data, nonce, difficulty, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this(time, lastHash, hash, data, nonce, difficulty);
    }
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static createHash(block) {
        const timestamp = block.timestamp;
        const lastHash = block.lastHash;
        const data = block.data;
        const nonce = block.nonce;
        const difficulty = block.difficulty;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }
    static adjustDifficulty(lastBlock, currentTime) {
        let difficulty = lastBlock.difficulty;
        //console.log(MINE_RATE);
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        //console.log(`${lastBlock.time} ${MINE_RATE} ${currentTime}`);
        return difficulty;
    }
}
module.exports = Block;