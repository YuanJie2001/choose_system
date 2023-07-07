<script setup lang="ts">
import XLSX from 'xlsx';
import { reactive, ref, toRaw } from 'vue';
import { ElMessage } from 'element-plus';
import { getLogData, writeLogData } from '@/api/request.ts';

// 初始化点名人数
let count = 1;


const finalNames = reactive([]);

const currentLog = reactive([
  {
    names: [],
    date: ''
  }
])
// 随机点名 洗牌算法
function fn(min, max) {
  var numbers = [];
  for (var i = min; i <= max; i++) {
    numbers.push(i);
  }
  var randomNumbers = [];
  for (var j = 0; j < count; j++) {
    let randomIndex = Math.floor(Math.random() * (max - min + 1 - j)) + j;
    let temp = numbers[randomIndex];
    numbers[randomIndex] = numbers[j];
    numbers[j] = temp;
    randomNumbers.push(numbers[j]);
  }
  return randomNumbers;
}

function myTimer() {
  let myNodelist = document.querySelectorAll("li");
  let rd = fn(0, myNodelist.length - 1);
  // 清空上一次的选中
  finalNames.length = 0;
  for (let i = 0; i < myNodelist.length; i++) {
    if (rd.includes(i)) {
      // 本次选中的一批人名
      finalNames.push(experts.name[i]);
      myNodelist[i].style.color = "red";
      myNodelist[i].style.background = "#faa755";
      continue;
    }
    myNodelist[i].style.color = "white";
    myNodelist[i].style.background = '#918597';
  }
}

function clearMyTimer() {
  let myNodelist = document.querySelectorAll("li");
  for (let i = 0; i < myNodelist.length; i++) {
    myNodelist[i].style.color = "white";
    myNodelist[i].style.background = '#918597';
  }
}

const myVar = ref();
let experts = reactive({
  name: []
})
function fileUpdate() {
  const file = event.target.files[0];

  // 创建FileReader对象
  const reader = new FileReader();

  // 监听文件加载完成事件
  reader.onload = function (event) {
    experts.name = [];
    const data = new Uint8Array(event.target.result);

    // 使用XLSX或者exceljs库解析Excel文件
    const workbook = XLSX.read(data, { type: 'array' });
    // 或者使用exceljs库的方式
    // const workbook = new ExcelJS.Workbook();
    // workbook.xlsx.load(data).then(function() {
    //   // Excel文件加载完成
    // });

    // 获取第一个工作表的名称
    const sheetName = workbook.SheetNames[0];

    // 通过工作表名称获取工作表
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = ref([]);
    // 解析数据
    jsonData.value = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
    // 打印数据
    console.log(jsonData.value);
    experts.name.push(...jsonData.value);
  };

  // 读取Excel文件数据
  reader.readAsArrayBuffer(file);

}


const btn_file = ref();
function handleSelectFile() {
  btn_file.value.click();
}

function btn0() {
  let number = ref();
  number.value = document.getElementById('number');
  count = number.value.value;

  ElMessage({
    message: '选择成功,当前点名人数为' + count + '人',
    type: 'success',
    center: true
  });

}

function btn1() {
  clearInterval(myVar.value);
  myVar.value = setInterval(function () { myTimer() }, 100);
}

function btn2() {
  // 打印最后一次选中结果
  console.log(finalNames + "===");
  writeFile();
  clearInterval(myVar.value);
}

async function writeFile() {
  // 读取json文件
  let rs = await getLogData();
  console.log(rs);

  // 追加写
  if (rs.length > 0) {
    currentLog.push(...rs);
  }
  currentLog.push({ names: finalNames, date: new Date().toLocaleString() });

  // 写数据到json文件
  writeLogData(currentLog);
  // 清空当前选中
  currentLog.length = 0;
}

function btn3() {
  clearInterval(myVar.value);
  clearMyTimer();
}
</script>

<template>
  <el-container>
    <el-main class="contain">
      <li v-for="item of toRaw(experts.name)" class="mc" id="para">
        {{ item[0] }}
      </li>
    </el-main>

    <el-footer>


      <el-row class="mb-4">
        <input type="file" ref="btn_file" style="display:none" @change="fileUpdate()">
        <el-button @click="handleSelectFile" class="upload_file">上传文件</el-button>
        <input type="text" placeholder="请输入要选择的人数" id="number" />
        <el-button type="primary" @click="btn0" plain>确定</el-button>
      </el-row>
      <el-row class="mb-4">
        <el-button type="primary" @click="btn1">开始点名</el-button>
        <el-button type="primary" @click="btn2">停止</el-button>
        <el-button type="primary" @click="btn3">重置</el-button>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style>
@import "../assets/css/index.css";

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

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
</style>
