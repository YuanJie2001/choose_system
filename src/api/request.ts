
import { ElMessage } from 'element-plus';
import path from 'path';
const fs = require('fs')
// export function getLogData() {
//     return axios({
//         method: 'get',
//         url: 'http://localhost:3000/log.json'
//     });
// }

// export function writeLogData(currentLog) {
//     return axios({
//         method: 'post',
//         url: 'http://localhost:3000/log.json',
//         data: JSON.stringify(currentLog)
//     });
// }

export function getLogData() {
    let rs = fs.readFileSync(path.join(__dirname, './log.json'), 'utf8');
    console.log(rs);

    return JSON.parse(rs);
};


export function writeLogData(currentLog = {}) {
    fs.writeFile(path.join(__dirname, './log.json'), JSON.stringify(currentLog), 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    });
}

export function deleteLogData() {
    fs.writeFile(path.join(__dirname, './log.json'), '', 'utf8', function (err) {
        if (err) {
            ElMessage.error('清空日志失败');
        }
    });
    ElMessage.success('清空日志成功');
}