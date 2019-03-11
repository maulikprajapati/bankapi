import Express from 'express';

// create router instance
const router = Express.Router();

/**
 * @swagger
 * tags:
 * - name: Customer
 *   description: Operations for customer
 *
 * - name: Order
 *   description: Operations for orders of customer
 *
 * - name: Item
 *   description: Operations for items in any order
 */

/**
 * @swagger
 * definitions:
 *  InternalErrorResponse:
 *    description: Internal server error response.
 *    type: object
 *    properties:
 *      status:
 *          type: number
 *          example: 500
 *          description: 
 *      messageCode:
 *          type: string
 *      data: 
 *          type: string
 */

import account from './account.route';
account(router);

import customer from './customer.route';
customer(router);

import branch from './branch.route';
branch(router);

import transaction from './transaction.route';
transaction(router);

export default router;
