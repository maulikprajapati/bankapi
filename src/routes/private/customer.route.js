import { CustomerController } from '../../controllers/customer.controller';
import { getCustomerById } from '../../validations/customer.validations';

const validate = require('express-validation');

const customer = (router) => {
    router.get(
        '/health',
        (req, res, next) => {
            return res.send('alive');
        }
    );

    router.post(
        '/createcustomer',
        async (req, res, next) => {
            const customerController = new CustomerController();
            const response = await customerController.createCustomer(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.get(
        '/getallcustomer',
        async (req, res, next) => {
            const customerController = new CustomerController();
            const response = await customerController.getAllCustomer();
            return res.status(response.status).send(response);
        }
    );

    router.get(
        '/getcustomerbyid',
        async (req, res, next) => {
            const customerController = new CustomerController();
            const response = await customerController.getCustomerById(req.query.userId);
            return res.status(response.status).send(response);
        }
    );

    router.post(
        '/updatecustomer',
        async (req, res, next) => {
            const customerController = new CustomerController();
            const response = await customerController.updateCustomer(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.post(
        '/updatecustomeraccount',
        async (req, res, next) => {
            const customerController = new CustomerController();
            const response = await customerController.updateCustomerAccount(req.body);
            return res.status(response.status).send(response);
        }
    );
}

export default customer;