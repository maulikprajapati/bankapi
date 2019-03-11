import { BranchRepository } from '../modules/db/repository/branchRepository';
import { getResponse, getErrorResponse } from '../modules/shared/config/response';

const httpStatus = require('http-status');

export class BranchController {
    constructor() { }

    async createBranch(branch_obj) {
        try {
            const branchRepository = new BranchRepository();
            const response = await branchRepository.createBranch(branch_obj);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateBranch(branch_obj) {
        try {
            const branchRepository = new BranchRepository();
            const response = await branchRepository.updateBranch(branch_obj);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllBranch() {
        try {
            const branchRepository = new BranchRepository();
            const response = await branchRepository.getAllBranch();
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBranchById(branchId) {
        try {
            const branchRepository = new BranchRepository();
            const response = await branchRepository.getBranchById(branchId);
            return getResponse(httpStatus.OK, response);
        } catch (error) {
            return getErrorResponse(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}