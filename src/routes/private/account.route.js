import { AccountController } from '../../controllers/account.controller';

const validate = require('express-validation');

const account = (router) => {

    router.post(
        '/createaccount',
        async (req, res, next) => {
            const accountController = new AccountController();
            const response = await accountController.createAccount(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.get(
        '/getaccountid',
        async (req, res, next) => {
            const accountController = new AccountController();
            const response = await accountController.getAccountById(req.query.accountId);
            return res.status(response.status).send(response);
        }
    );

    router.post(
        '/updateaccount',
        async (req, res, next) => {
            const accountController = new AccountController();
            const response = await accountController.updateAccount(req.body);
            return res.status(response.status).send(response);
        }
    );
}

export default account;