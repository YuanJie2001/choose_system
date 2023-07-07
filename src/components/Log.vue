<template>
  <el-container>
    <el-main class="contain">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>日志信息</span>
            <el-button class="button" text @click="deleteLog">清空日志</el-button>
          </div>
        </template>
        <div v-for="item in data" :key="item" class="text item">{{ '信息: [' + item.names +"],    "+ '时间: '+ item.date}}</div>
      </el-card>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>  


<script setup lang="ts">
import { onMounted,  ref } from 'vue';
import { getLogData,deleteLogData } from '@/api/request.ts'

let data = ref('')

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
  text-align:  left;
}

.item {
  margin-bottom: 18px;
}

</style>