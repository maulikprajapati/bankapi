import { CustomerRepository } from '../modules/db/repository/customerRepository';
import { getResponse, getErrorResponse } from '../modules/shared/config/response';

const httpStatus = require('http-status');

export class CustomerController {
    constructor() { }

    async createCustomer(customer_obj) {
        try {
            const customerRepository = new CustomerRepository();
            const response = await customerRepository.createCustomer(customer_obj);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCustomer() {
        try {
            const customerRepository = new CustomerRepository();
            const response = await customerRepository.getAllCustomer();
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCustomerById(userId) {
        try {
            const customerRepository = new CustomerRepository();
            const response = await customerRepository.getCustomerById(userId);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCustomer(customer_obj) {
        try {
            const customerRepository = new CustomerRepository();
            const response = await customerRepository.updateCustomer(customer_obj);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCustomerAccount(details) {
        try {
            const customerRepository = new CustomerRepository();
            const response = await customerRepository.updateCustomerAccount(details);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}