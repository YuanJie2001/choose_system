let flag = false;
let btn0 = document.getElementById('btn0');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');


function loadData(array = []) {
    let arr = array;
    let content = document.getElementById('parent');
    let child = document.getElementById('para');

    for (let i = 0; i < arr.length; i++) {
        var span = document.createElement("li");
        span.id = "spanid" + i;
        span.style.color = "white";
        span.innerHTML = arr[i];
        child.parentNode.insertBefore(span, child);

    }
}

let count=1;
function fn(min, max) {
    var numbers = [];
    for (var i = min; i <= max; i++) {
      numbers.push(i);
    }
  
    var randomNumbers = [];
    for (var j = 0; j < count; j++) {
      var randomIndex = Math.floor(Math.random() * (max - min + 1 - j)) + j;
      var temp = numbers[randomIndex];
      numbers[randomIndex] = numbers[j];
      numbers[j] = temp;
      randomNumbers.push(numbers[j]);
    }
  
    return randomNumbers;
}

function myTimer() {
    let myNodelist = document.querySelectorAll("li");
    let rd = fn(0, myNodelist.length-1);

    console.log(rd);

    for (let i = 0; i < myNodelist.length-1; i++) {
        if (rd.includes(i)) {
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
    for (let i = 0; i < myNodelist.length-1; i++) {
        myNodelist[i].style.color = "white";
        myNodelist[i].style.background = '#918597';
    }
}

var myVar;

// 选择Excel文件的<input>元素
const fileInput = document.getElementById('excel-file');
// 监听文件选择事件
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    // 创建FileReader对象
    const reader = new FileReader();

    // 监听文件加载完成事件
    reader.onload = function (event) {
        loadData();
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

        // 解析数据
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
        // 打印数据
        console.log(jsonData);
        loadData(jsonData);
    };

    // 读取Excel文件数据
    reader.readAsArrayBuffer(file);

});

btn0.onclick = function myStopFunction0() {
    let number = document.getElementById('number');
    count = number.value;
}

btn1.onclick = function myStopFunction1() {
    clearInterval(myVar);
    myVar = setInterval(function () { myTimer() }, 100);
}

btn2.onclick = function myStopFunction2() {
    clearInterval(myVar);
}

btn3.onclick = function myStopFunction3() {
    clearInterval(myVar);
    clearMyTimer();
}

