const BlockChain = require('./index');
const Block = require('./block');

describe("BlockChain", () => {
    let bc, bc2;
    beforeEach(() => {
        bc = new BlockChain;
        bc2 = new BlockChain;
    });
    it('BlockChain Starts with `Genesis` Block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    it('BlockChain can add new Blocks', () => {
        const data = 'foo';
        bc.addblock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });
    it('Validates valid blockchain', () => {
        bc2.addblock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });
    it('Invalidate block with corrupt genesis block', () => {
        bc2.chain[0].data = 'corrupted genesis';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('Invalidate a block with corrupt middle block', () => {
        bc2.addblock('data');
        bc2.chain[1].data = 'Corrupted';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    it('Replacing the current blockchain', () => {
        bc2.addblock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('Does not replace current chain with chain of lesser length', () => {
        bc.addblock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});
