import { TransactionController } from '../../controllers/transaction.controller';
import { getCustomerById } from '../../validations/customer.validations';

const validate = require('express-validation');

const transaction = (router) => {

    router.post(
        '/createtransaction',
        async (req, res, next) => {
            const transactionController = new TransactionController();
            const response = await transactionController.createTransaction(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.get(
        '/gettransactionbycustomerid',
        async (req, res, next) => {
            const transactionController = new TransactionController();
            const response = await transactionController.getTransactionByCustomerid(req.query.customerId);
            return res.status(response.status).send(response);
        }
    );

    router.post(
        '/createtransfer',
        async (req, res, next) => {
            const transactionController = new TransactionController();
            const response = await transactionController.createTransfer(req.body);
            return res.status(response.status).send(response);
        }
    );
}

export default transaction;