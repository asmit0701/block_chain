const Transaction = require('./transaction');
const Wallet = require('./index');
const { intFromLE } = require('elliptic/lib/elliptic/utils');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;
    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3cip13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('Outputs the `amount` subtracted from wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it('Outputs the `amount` added to recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });

    it('Inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('Validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('Invalidates an invalid transaction', () => {
        transaction.outputs[0].amount = 500000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    })

    describe('Does not complete transaction with absurd amount', () => {
        beforeEach(() => {
            amount = 100000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('Does not complete the transaction', () => {
            expect(transaction).toEqual(undefined);
        })
    });
    describe('Updates output for already existing transaction address', () => {
        let nextRecipient, nextAmount;
        beforeEach(() => {
            nextRecipient = 'n3xt-R3c1p13nt';
            nextAmount = 20;
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });
        it(`Subtracts next amount from sender's amount`, () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount);
        });
        it('Generates new output for next recipient', () => {
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount)
        })
    })

});