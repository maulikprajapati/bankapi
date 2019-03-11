import { AccountRepository } from '../modules/db/repository/accountRepository';
import { getResponse, getErrorResponse } from '../modules/shared/config/response';

const httpStatus = require('http-status');

export class AccountController {
    constructor() { }

    async createAccount(account_obj) {
        try {
            const accountRepository = new AccountRepository();
            const response = await accountRepository.createAccount(account_obj);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAccountById(accountId) {
        try {
            const accountRepository = new AccountRepository();
            const response = await accountRepository.getAccountById(accountId);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAccount(account_obj) {
        try {
            const accountRepository = new AccountRepository();
            const response = await accountRepository.updateAccount(account_obj);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}