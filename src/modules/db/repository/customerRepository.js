
import db from '../database';
import { encryptPassword } from '../../../auth/password-auth';

export class CustomerRepository {
    constructor() { }

    async getCustomerByUsername(username) {
        var customer = await db.query(`select * from customer where username = '${username}'`);
        if (customer.length > 0) {
            return customer[0];
        } else {
            return null;
        }
    }

    async createCustomer(customer_obj) {
        var result = await db.query(`INSERT INTO customer
        (NRIC,username,password,name,address,gender,nationality,DOB,role)
        VALUES
        ('${customer_obj.NRIC}',
        '${customer_obj.username}',
        '${customer_obj.password}',
        '${customer_obj.name}',
        '${customer_obj.address}',
         ${customer_obj.gender},
        '${customer_obj.nationality}',
        '${customer_obj.DOB}',
        'User');`);

        return result;
    }

    async getAllCustomer() {
        var result = await db.query(`SELECT * FROM customer WHERE role='User';`);

        return result;
    }

    async getCustomerById(userId) {
        var customer = await db.query(`SELECT * FROM customer WHERE id=${userId};`);
        if (customer.length > 0) {
            return customer[0];
        } else {
            return null;
        }
    }

    async updateCustomer(customer_obj) {
        var result = await db.query(`
            UPDATE customer
            SET
            NRIC = '${customer_obj.NRIC}',
            username = '${customer_obj.username}',
            name = '${customer_obj.name}',
            address = '${customer_obj.address}',
            gender =  ${customer_obj.gender},
            nationality = '${customer_obj.nationality}',
            DOB = '${customer_obj.DOB}'
            WHERE id = ${customer_obj.id}`);

        return result;
    }

    async updateCustomerAccount(details) {
        var result = await db.query(`
        UPDATE customer
        SET
        account_id = ${details.accountId}
        WHERE id = ${details.id};`);

        return result;
    }
}
