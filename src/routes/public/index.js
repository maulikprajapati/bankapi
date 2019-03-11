import Express from 'express';

// create router instance
const router = Express.Router();

import customer from '../private/customer.route';
customer(router);

export default router;
