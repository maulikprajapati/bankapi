
import db from '../database';

export class BranchRepository {
    constructor() { }

    async createBranch(branch_obj) {
        var result = await db.query(`INSERT INTO branch
        (name,
        location,
        description)
        VALUES
        ('${branch_obj.name}',
        '${branch_obj.location}',
        '${branch_obj.description}');`);

        return result;
    }

    async updateBranch(branch_obj) {
        var result = await db.query(`UPDATE branch
        SET
        name = '${branch_obj.name}',
        location = '${branch_obj.location}',
        description = ${branch_obj.description}
        WHERE id = ${branch_obj.id};`);

        return result;
    }

    async getAllBranch() {
        var result = await db.query(`SELECT * FROM branch;`);
        return result;
    }

    async getBranchById(branchId) {
        var branch = await db.query(`SELECT * FROM branch where id=${branchId};`);
        if (branch.length > 0) {
            return branch[0];
        } else {
            return null;
        }
    }
}
