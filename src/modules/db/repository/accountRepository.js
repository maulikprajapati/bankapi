
import db from '../database';

export class AccountRepository {
    constructor() { }

    async createAccount(account_obj) {
        var result = await db.query(`INSERT INTO account
        (security_pin,
        amount,
        type,
        branch_id)
        VALUES
        ('${account_obj.securityPin}',
            ${account_obj.amount},
            '${account_obj.type}',
            ${account_obj.branchId || null});
        `);
        return result;
    }

    async getAccountById(accountId) {
        var account = await db.query(`SELECT a.id as accountId, a.amount, a.security_pin as securityPin, a.type, b.*, b.id as branchId FROM account a
        left join branch b on a.branch_id = b.id
        WHERE a.id=${accountId};`);
        if (account.length > 0) {
            return account[0];
        } else {
            return null;
        }
    }

    async updateAccount(account_obj) {
        var result = await db.query(`UPDATE account
        SET
        security_pin = '${account_obj.securityPin}',
        type = '${account_obj.type}',
        branch_id = ${account_obj.branchId || null}
        WHERE id = ${account_obj.id};`);

        return result;
    }
}
