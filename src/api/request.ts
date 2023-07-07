
import { ElMessage } from 'element-plus';
import path from 'path';
const fs = require('fs')

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
    fs.writeFile(path.join(__dirname, './log.json'), JSON.stringify({}), 'utf8', function (err) {
        if (err) {
            ElMessage.error('清空日志失败');
        }
    });
    ElMessage.success('清空日志成功');
}

export function getPassword() {
    let rs  = fs.readFileSync(path.join(__dirname, './veritify.json'), 'utf8');
    let data = JSON.parse(rs);
    return data.password;
}

export function updatePassword(newPassword = '') {
    fs.writeFile(path.join(__dirname, './veritify.json'), JSON.stringify({ password: newPassword }), 'utf8', function (err) {
        if (err) {
            ElMessage.error('修改密码失败');
        } else {
            ElMessage.success('修改密码成功');
        }
    });
}