import moment from 'moment';
import * as vars from './config/vars';
import * as error from './middlewares/error';
export { vars, error };
export { EnvLoader } from './config/envLoader';
export function getTimestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}
export function getDateDifference(dateStr) {
    return moment().diff(moment(dateStr), 'minute');
}