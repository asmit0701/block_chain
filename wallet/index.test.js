const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');

describe('Wallet', () => {
    let wallet, tp;
    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('Creating a transaction', () => {
        let transaction, sendAmount, recepient;
        beforeEach(() => {
            sendAmount = 50;
            recepient = '4ddr355';
            transaction = wallet.createTransaction(recepient, sendAmount, tp);
        });

        describe('And doing the same transaction again', () => {
            beforeEach(() => {
                wallet.createTransaction(recepient, sendAmount, tp);
            });
            it('Doubles the `sendAmount` subtracted from wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - sendAmount * 2);
            });
            it('Clones the `sendAmount` output for the recepient', () => {
                expect(transaction.outputs.filter(output => output.address === recepient).map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            })
        });
    });
});
