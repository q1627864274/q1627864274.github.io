import{C as h,c as r,o as E,ax as p,G as a,a as l,j as i,k as t}from"./chunks/framework.CJlX88Tx.js";const e={viewImg:{"App.vue":`
 <template>
    <input type="file" @change="handleChange" ref="ipt">123
    <img id="preview" ref="img">
 </template>
 
 <script setup>
    import { ref } from 'vue'
    // 使用ref创建响应式变量
    const ipt = ref(null)
    const img = ref(null)
    const handleChange = () => {
    if (ipt.value && ipt.value.files.length > 0) {
       const file = ipt.value.files[0]
 
       // 方式一：使用FileReader
       // const reader = new FileReader()
       // reader.onload = (e) => {
       //   if (img.value) {
       //     img.value.src = e.target.result
       //   }
       // }
       // reader.readAsDataURL(file)
 
       // 方式二：使用URL.createObjectURL
       if (img.value) {
          const urlObj = URL.createObjectURL(file)
          img.value.src = urlObj
       }
    }
    }
 <\/script>
 <style>
 </style>
       `},arrayLoop:{"App.vue":`
 <template>
    <div class="query">
       <!-- 使用v-for遍历productQuery中的每个项来创建下拉框 -->
       <div v-for="(query, name) in productQuery" :key="name">
          <!-- 只为selectDatas存在的项目渲染select元素 -->
          <select v-if="query.selectDatas" v-model="query.selectedValue">
             <option v-for="item in query.selectDatas" :key="item.value" :value="item.value">
                {{ item.label }}
             </option>
          </select>
          <!-- 特别为measuringRange渲染输入框 -->
          <input v-else type="number" v-model="query.selectedValue" />
       </div>
 
       <!-- 查询按钮 -->
       <button @click="handleQuery">循环查询</button>
       <button @click="handleQuery2">递归查询</button>
       </br>
    </div>
    <h4>循环查询耗时：{{Number(totalTime).toFixed(2)}}</h4>
    <h4>得到的条数：{{length}}</h4>
    <h4>递归查询耗时：{{Number(totalTime2).toFixed(2)}}</h4>
    <h4>得到的条数：{{length2}}</h4>
 </template>
     
    <script setup>
    import { ref, onMounted  } from 'vue'
    const totalTime = ref(null)
    const totalTime2 = ref(null)
    const length = ref(0)
    const length2 = ref(0)
    const productQuery = ref({
       gas: {
          selectedValue: 1,
          selectDatas: [
             { value: 'all', label: 'All' },
             { value: 1, label: 'He' },
             { value: 4, label: 'Ar' },
             { value: 8, label: 'Air' },
             { value: 13, label: 'N2' },
             { value: 15, label: 'O2' },
             { value: 25, label: 'CO2' },
          ]
       },
       port: {
          selectedValue: 3,
          selectDatas: [
             { value: 'all', label: 'All' },
             { value: 3, label: 'IGS' },
             { value: 'L', label: 'VCR' }
          ]
       },
       communications: {
          selectedValue: 5,
          selectDatas: [
             { value: 'all', label: 'All' },
             { value: 3, label: 'DeviceNet' },
             { value: 5, label: 'EtherCAT' },
          ]
       },
       measuringRange: {
          selectedValue: 20,
       },
    })
    function handleQuery () {
       const startTime = performance.now();
       // 初始化查询条件数组
       let queue = [{}]; // 开始时队列中有一个空的条件对象
    
       // 遍历每个筛选条件
       for (const key of Object.keys(productQuery.value)) {
          const field = productQuery.value[key];
          let newQueue = []; // 用于存储当前步骤扩展后的所有条件组合
    
          if (field.selectedValue === 'all') {
             // 如果选择了'all'，则扩展当前队列中每个元素为多个条件，除了'all'本身
             for (const option of field.selectDatas.filter(option => option.value !== 'all')) {
                for (const current of queue) {
                   newQueue.push({ ...current, [key]: option.value });
                }
             }
          } else {
             // 只包含选中的项
             for (const current of queue) {
                newQueue.push({ ...current, [key]: field.selectedValue });
             }
          }
          // 更新队列为新扩展的队列
          queue = newQueue;
       }
    
       // 此时queue包含了所有可能的条件组合
       console.log('queue', queue);
       length.value = queue.length
       const endTime = performance.now();
       totalTime.value = endTime - startTime
    }
    function handleQuery2 () {
       const startTime = performance.now();
       // 初始化查询条件数组
       let initialConditions = [];
    
       // 为每个下拉框准备查询条件，如果选中'all'，则包括所有选项，否则只包括选中的项
       for (const key of Object.keys(productQuery.value)) {
          const field = productQuery.value[key];
          if (field.selectedValue === 'all') {
             // 排除'all'本身的选项
             initialConditions.push(field.selectDatas.filter(option => option.value !== 'all').map(option => ({ [key]: option.value })));
          } else {
             initialConditions.push([{ [key]: field.selectedValue }]);
          }
       }
       // 递归地组合所有查询条件
       let combinedConditions = combineConditions(initialConditions);
       length2.value = combinedConditions.length
       const endTime = performance.now();
       totalTime2.value = endTime - startTime
    }
    
    // 递归组合查询条件
    function combineConditions (conditions, index = 0, current = {}, result = []) {
       if (index === conditions.length) {
          result.push(current);
          return;
       }
       conditions[index].forEach(condition => {
          combineConditions(conditions, index + 1, { ...current, ...condition }, result);
       });
       return result;
    }
    onMounted(() => {
       // 填充gas的selectDatas到1000项
       for (let i = 1; i <= 10000; i++) {
          productQuery.value.gas.selectDatas .push({ value: i, label: "ss" })
       }
     })
    <\/script>
     
    <style>
    /* 可以在这里添加样式 */
    .query {
       display: flex;
    }
    input {
       width: 40px;
    }
    </style>
    `},multithreading:{"App.vue":`
 <template>
    <button @click="processInMainThread">主线程</button>
   <h4>主线程计算时间: {{ time1 }}</h4>
   <button @click="parallelProcessing">多线程</button>
   <h4>多线程计算时间: {{ time2 }}</h4>
 </template>
  
 <script setup>
 import {ref} from 'vue'
 const time1 = ref(null)
 const time2 = ref(null)
 function processInMainThread() {
   const startTime = performance.now();
   let result = 0;
   for (let i = 0; i < 10000; i++) {
     result += i; // 假设的计算操作
   }
   const endTime = performance.now();
   time1.value = endTime - startTime
 }
 function parallelProcessing() {
   const cpuCores = navigator.hardwareConcurrency || 4;
   const totalCount = 10000;
   const chunkSize = Math.ceil(totalCount / cpuCores);
   let completedWorkers = 0;
   let totalResult = 0;
   const startTime = performance.now();
 
   for (let i = 0; i < cpuCores; i++) {
    const worker = new Worker(new URL('./countWorker.js', import.meta.url), {
       type: 'module',
    });
     const start = i * chunkSize;
     const end = (i + 1) * chunkSize;
 
     worker.postMessage({ start, end: Math.min(end, totalCount) });
 
     worker.onmessage = (e) => {
       totalResult += e.data;
       completedWorkers++;
 
       if (completedWorkers === cpuCores) {
         const endTime = performance.now();
         time2.value = endTime - startTime
         worker.terminate();
       }
     };
   }
 }
 <\/script>
 <style>
 </style>
       `,"myWorker.js":`
 self.onmessage = (e) => {
    const { start, end } = e.data;
    let result = 0;
    for (let i = start; i < end; i++) {
    result += i;
    }
    self.postMessage(result);
 };
       `}},c=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"realProject/realProject.md","filePath":"realProject/realProject.md","lastUpdated":null}'),d={name:"realProject/realProject.md"},u=Object.assign(d,{setup(g){return(y,s)=>{const n=h("Playground"),k=h("mindMap");return E(),r("div",null,[s[0]||(s[0]=p("",6)),a(n,{files:t(e).viewImg},null,8,["files"]),s[1]||(s[1]=l()),s[2]||(s[2]=i("h4",{id:"selct全选all的循环",tabindex:"-1"},[l("selct全选all的循环 "),i("a",{class:"header-anchor",href:"#selct全选all的循环","aria-label":'Permalink to "selct全选all的循环"'},"​")],-1)),s[3]||(s[3]=i("ol",null,[i("li",null,"采用循环（推荐）")],-1)),a(n,{files:t(e).arrayLoop},null,8,["files"]),s[4]||(s[4]=i("h4",{id:"多线程-new-worker",tabindex:"-1"},[l("多线程(new Worker) "),i("a",{class:"header-anchor",href:"#多线程-new-worker","aria-label":'Permalink to "多线程(new Worker)"'},"​")],-1)),a(n,{files:t(e).multithreading},null,8,["files"]),s[5]||(s[5]=p("",7)),a(k)])}}});export{c as __pageData,u as default};
