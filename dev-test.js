const Block = require('./block');

const fooBlock = Block.mineBlock(Block.genesis(), 'First Block');
console.log(fooBlock.toString());