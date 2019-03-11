import { dbSettings } from '../shared/config/vars';
import * as mysql from 'mysql';

const pool = mysql.createPool(dbSettings);

class Database {
  constructor() {
  }
  static query(sql, args = null) {
    return new Promise((resolve, reject) => {
      pool.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  static queryDB(sql, args = null) {
    return new Promise((resolve, reject) => {
      pool.query(sql, args, (err, rows, cols) => {
        if (err) return reject(err);
        rows = this.removeByKey(rows, {
          key: 'protocol41'
        });
        const result =
          rows.length > 1
            ? JSON.parse(JSON.stringify(rows))
            : JSON.parse(JSON.stringify(rows[0]));
        resolve(result);
      });
    });
  }

  static removeByKey(array, params) {
    if (array.length) {
      array.some(function (item, index) {
        return array[index][params.key] ? !!array.splice(index, 1) : false;
      });

      return array;
    }
    return [{ result: 1 }];
  }

  static getFirstOrDefault(arrayArg) {
    return arrayArg[0];
  }

}
export default Database;
