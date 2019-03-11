import { BranchController } from '../../controllers/branch.controller';
import { getCustomerById } from '../../validations/customer.validations';

const validate = require('express-validation');

const branch = (router) => {

    router.post(
        '/createbranch',
        async (req, res, next) => {
            const branchController = new BranchController();
            const response = await branchController.createBranch(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.post(
        '/updatebranch',
        async (req, res, next) => {
            const branchController = new BranchController();
            const response = await branchController.updateBranch(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.get(
        '/getallbranch',
        async (req, res, next) => {
            const branchController = new BranchController();
            const response = await branchController.getAllBranch();
            return res.status(response.status).send(response);
        }
    );

    router.get(
        '/getBranchById',
        async (req, res, next) => {
            const branchController = new BranchController();
            const response = await branchController.getBranchById(req.query.branchId);
            return res.status(response.status).send(response);
        }
    );
}

export default branch;