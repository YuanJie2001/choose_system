<template>
  <el-container>
    <el-main class="contain">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>日志信息</span>
            <el-button text @click="updateVisible = true">
              修改校验码
            </el-button>
            <el-button text @click="veritifyVisible = true">
              清空日志
            </el-button>

            <el-dialog v-model="updateVisible" title="修改校验码" width="30%" :before-close="handleClose">
              <el-input v-model="input" placeholder="旧校验码" />
              <el-input v-model="newInput" placeholder="新校验码" />
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="updateVisible = false">取消</el-button>
                  <el-button type="primary" @click="update">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>

            <el-dialog v-model="veritifyVisible" title="身份验证" width="30%" :before-close="handleClose">
              <el-input v-model="input" placeholder="请输入校验码" />
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="veritifyVisible = false">取消</el-button>
                  <el-button type="primary" @click="verify">
                    确定
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </div>
        </template>
        <div v-for="item in data" :key="item" class="text item">{{ '信息: [' + item.names + "], " + '时间: ' + item.date }}
        </div>
      </el-card>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>  


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getLogData, deleteLogData } from '@/api/request.ts'
import { ElMessageBox } from 'element-plus';
import { updatePassword, getPassword } from '../api/request';
let data = ref('')
const input = ref('')
const newInput = ref('')
const veritifyVisible = ref(false)
const updateVisible = ref(false)
async function readFile() {
  // 读取json文件
  let rs = await getLogData();
  console.log(rs);
  data.value = rs;
}


async function deleteLog() {
  // 读取json文件
  let rs = await deleteLogData();
  data.value = rs;
}

onMounted(() => {
  readFile();
});


function update() {
  updateVisible.value = false
  let pd = getPassword()
  if(pd == input.value){
    updatePassword(newInput.value)
  }else{
    ElMessageBox.alert('校验码错误')
  }
}
function verify() {
  veritifyVisible.value = false
  let pd = getPassword()
  if(pd == input.value){
    deleteLog()
  }else{
    ElMessageBox.alert('校验码错误')
  }
}


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你要关闭这个窗口吗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}


</script>
<style>
@import "../assets/css/index.css";

.el-main {
  background: rgba(0, 0, 0, 0.5);
  color: #333;
  text-align: center;
}


.el-footer {
  background: rgba(0, 0, 0, 0.5);
  color: #333;
  text-align: center;
  line-height: 60px;
}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 18px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>