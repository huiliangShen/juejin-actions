import axios from "axios";
import to from './await-to.js';
import {headers} from "../config/index.js";

export const isObject = obj => typeof obj === 'object' && obj != null;

export default async (options) => {
    const Options = Object.assign({}, options, {headers})

    const [err, res] = await to(axios(Options))

    let result = [err, res]
    if (err || !isObject(res)) {
        return result
    }

    const {data: {err_no: dataErrNo}} = res
    if (dataErrNo === 0) {
        result = [err, res && res.data]
    }
    if (dataErrNo === 403) {
        result = [
            { ...res.data, err_msg: [res.data.err_msg, '目前未登录，请检查 JUEJIN_COOKIE 是否正确'] },
            res.data,
        ];
    }
    return result
}
