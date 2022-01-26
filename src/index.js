import {checkIn, getCounts, getCurPoint, getStatus} from './services/index.js'

async function getInfo() {
    const [err1, res1] = await getCurPoint();
    const [err2, res2] = await getCounts();
    const message = [];
    if (!err1) {
        message.push(`当前矿石数量：${res1.data}`);
    }
    if (!err2) {
        message.push(`连续签到天数: ${res2.data.cont_count}`);
        message.push(`累计签到天数: ${res2.data.sum_count}\n`);
    }
    return message
}

export async function main() {
    const [err, res] = await getStatus()
    if (err) {
        return [err, res]
    }
    if (res.err_no === 0 && !res.data) {
        const [err] = await checkIn()
        const message = await getInfo()
        return [err, {err_message: message}]
    } else {
        const message = await getInfo()
        message.unshift('您今日已完成签到，请勿重复签到！')
        return [err, {err_msg: message}]
    }
}
