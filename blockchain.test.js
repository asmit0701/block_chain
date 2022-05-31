const BlockChain = require('./blockchain');
const Block = require('./block');

describe("BlockChain", () => {
    let bc;
    beforeEach(() => {
        bc = new BlockChain;
    });
    it('BlockChain Starts with `Genesis` Block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    it('BlockChain can add new Blocks', () => {
        const data = 'foo';
        bc.addblock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });
});