import { TransactionRepository } from '../modules/db/repository/transactionRepository';
import { getResponse, getErrorResponse } from '../modules/shared/config/response';

const httpStatus = require('http-status');

export class TransactionController {
    constructor() { }

    async createTransaction(details) {
        try {
            const transactionRepository = new TransactionRepository();
            const response = await transactionRepository.createTransaction(details);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async getTransactionByCustomerid(customerId) {
        try {
            const transactionRepository = new TransactionRepository();
            const response = await transactionRepository.getTransactionByCustomerid(customerId);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async createTransfer(details) {
        try {
            const transactionRepository = new TransactionRepository();
            const response = await transactionRepository.createTransfer(details);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}