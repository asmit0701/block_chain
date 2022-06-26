const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');
class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet-
        Public Key : ${this.publicKey.toString()}
        Balance    : ${this.balance}`;
    }
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recepient, amount, transactionPool) {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds balance: ${this.balance}`);
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);
        if (transaction) {
            transaction.update(this, recepient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recepient, amount);
            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }
}

module.exports = Wallet;