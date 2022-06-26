const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addblock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            if (chain[i].lastHash !== chain[i - 1].hash || chain[i].hash !== Block.createHash(chain[i])) {
                return false;
            }
        }
        return true;
    }

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('Chain not long enough');
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('Invalid chain');
            return;
        }

        console.log('Replacing BlockChain with new Chain');
        this.chain = newChain;
    }
}

module.exports = Blockchain; 
