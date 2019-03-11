
import db from '../database';

export class TransactionRepository {
    constructor() { }

    async createTransaction(details) {
        var account = await db.query(`select * from account where id=${details.accountId}`);
        if (!account || account.length == 0) {
            throw 'Invalid account id';
        }
        if (details.type.toLowerCase() == 'debit') {
            if (account[0].amount < details.amount) {
                throw 'Insufficient amount';
            }
        }

        if (account[0].security_pin != details.securityPin) {
            throw 'Invalid security PIN';
        }

        var result = await db.query(`INSERT INTO transaction
        (amount,
        type,
        account_id)
        VALUES
        (${details.amount},
        '${details.type}',
        ${details.accountId});
        `);
        if (result.affectedRows == 1) {
            if (details.type.toLowerCase() == 'credit') {
                const newAmt = account[0].amount + details.amount;
                await db.query(`update account set amount=${newAmt} where id=${details.accountId}`);
            } else {
                const newAmt = account[0].amount - details.amount;
                await db.query(`update account set amount=${newAmt} where id=${details.accountId}`);
            }
        } else {
            return null;
        }
    }

    async getTransactionByCustomerid(customerId) {
        var customer = await db.query(`select * from customer where account_id=${customerId}`);
        if (customer.length > 0) {
            return await db.query(`select * from transaction where account_id=${customer[0].account_id}`);
        } else {
            throw 'Invalid customer';
        }
    }

    async createTransfer(details) {
        var fromAccount = await db.query(`select * from account where id=${details.fromAccountId}`);
        var toAccount = await db.query(`select * from account where id=${details.toAccountId}`);
        if (!fromAccount || fromAccount.length == 0) {
            throw 'Invalid From account id';
        }
        if (!toAccount || toAccount.length == 0) {
            throw 'Invalid To account id';
        }
        if (fromAccount[0].amount < details.amount) {
            throw 'Insufficient amount';
        }
        if (fromAccount[0].security_pin != details.securityPin) {
            throw 'Invalid security PIN';
        }

        var result = await db.query(`INSERT INTO transaction
        (amount,
        type,
        account_id)
        VALUES
        (${details.amount},
        'Debit',
        ${details.fromAccountId});

        INSERT INTO transaction
        (amount,
        type,
        account_id)
        VALUES
        (${details.amount},
        'Credit',
        ${details.toAccountId});

        update account set amount=${toAccount[0].amount + details.amount} where id=${details.toAccountId};

        update account set amount=${fromAccount[0].amount - details.amount} where id=${details.fromAccountId};
        `);
        if (result) {
            return true;
        } else {
            throw 'Some error occured';
        }
    }
}
