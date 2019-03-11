import Joi from 'joi';

export const getCustomerById = {
    query: {
        customerId: Joi.string().required()
    }
}