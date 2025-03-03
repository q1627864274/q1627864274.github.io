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
       `}},c=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"realProject/realProject.md","filePath":"realProject/realProject.md","lastUpdated":null}'),d={name:"realProject/realProject.md"},u=Object.assign(d,{setup(g){return(y,s)=>{const n=h("Playground"),k=h("mindMap");return E(),r("div",null,[s[0]||(s[0]=p(`<h4 id="vite-对图片的识别和处理" tabindex="-1">vite 对图片的识别和处理 <a class="header-anchor" href="#vite-对图片的识别和处理" aria-label="Permalink to &quot;vite 对图片的识别和处理&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">路径必须是静态的！（使用动态的不生效例如v</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bind绑定）</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 标签的路径</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(img.)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CSS中的路径</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如果是静态的路径才会产生这些下面的处理</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 让模块和路径产生依赖，有依赖才会生成到打包结果</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 生成到打包结果会加上文件指纹</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">对于动态的怎么处理？</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> imgUrl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./img1.png&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> imgUr2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./img2.png&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> imgUr3 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./img3.png&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">导入拿到的是打包路径的结果， imgUrl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">assets</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">2ee14cc22.jpg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">这种方法太繁琐</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> 动态导入import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`./assets/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">val</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.jpg\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res.default</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">生成的js文件太多，增加网络请求</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> URL处理（也会被vite监听到）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // 参数1图片路径，参数2图片相对于那个模块</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`./assets/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">val</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.jpg\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">meta</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.url)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  path.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> url</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">打包结果干净</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">项目中遇到开发过程图片显示正常，打包之后图片消失。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> :src=&quot;item.imgType</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;热式&#39;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./samall.svg&#39;</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> :</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> \`./big.svg\`&quot;&gt;</span></span></code></pre></div><h4 id="vite-图片生产和打包名称一致" tabindex="-1">vite 图片生产和打包名称一致 <a class="header-anchor" href="#vite-图片生产和打包名称一致" aria-label="Permalink to &quot;vite 图片生产和打包名称一致&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 通过import导入</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bigImg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./bigImg.png&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> smallImg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;./smallImg.png&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   生产环境：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">asserts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bigImg.png</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">asserts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">smallImg.png</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   生产环境：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    /</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">asserts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">big</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">414c4ac.png.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:img</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">........................</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   (变成了base64)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   vite的优化，当图片很小打包的时候就不需要进行网络请求了，整一个dataURL就行了</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">想要开发环境也一致保持 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">asserts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">small</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">111c4ac.png.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  build: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   assetsInlineLimit:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // 大于0KB都要打包处理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">如果想要生产环境也保持小图base64的格式，怎么处理？</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">手写一个vite插件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;node:fs&#39;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 插件一个函数而不是对象，方便传值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyPlugin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">limit</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4096</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;my-plugin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // vite中使用了esbuild，rollop</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // transform属于rollop其中的一个钩子函数</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       // 加载一个模块就会运行，将内容和路径给你</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      async</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> transform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">code</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (process.env.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NODE_ENV</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;development&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ensWith</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> stat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.promise.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (stat.size </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> limit) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">         // 转化为base64</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> buffer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fs.promise.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> base64</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> buffer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;base64&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> dataurl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`data:image/png;base64,\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">base64</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            code: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`export default \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dataurl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       MyPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h4 id="图片预览的处理方式" tabindex="-1">图片预览的处理方式 <a class="header-anchor" href="#图片预览的处理方式" aria-label="Permalink to &quot;图片预览的处理方式&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data url</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">src需要的是，统一资源定位符</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">什么是dataurl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">标准格式字符串</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">content</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type;base64,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">固定   类型，例如：  资源数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plain</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          text</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">css</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          application</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">json</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          application</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">javascript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          image</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">png</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">不需要经过网络通信</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FileReader的优点是兼容性较好，但是将大文件转换为DataURL会消耗更多内存</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> createObjectURL性能好，但是生成的URL只在当前页面有效，并且需要手动管理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">（释放）URL占用的资源    </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.revokeObjectURL</span></span></code></pre></div>`,6)),a(n,{files:t(e).viewImg},null,8,["files"]),s[1]||(s[1]=l()),s[2]||(s[2]=i("h4",{id:"selct全选all的循环",tabindex:"-1"},[l("selct全选all的循环 "),i("a",{class:"header-anchor",href:"#selct全选all的循环","aria-label":'Permalink to "selct全选all的循环"'},"​")],-1)),s[3]||(s[3]=i("ol",null,[i("li",null,"采用循环（推荐）")],-1)),a(n,{files:t(e).arrayLoop},null,8,["files"]),s[4]||(s[4]=i("h4",{id:"多线程-new-worker",tabindex:"-1"},[l("多线程(new Worker) "),i("a",{class:"header-anchor",href:"#多线程-new-worker","aria-label":'Permalink to "多线程(new Worker)"'},"​")],-1)),a(n,{files:t(e).multithreading},null,8,["files"]),s[5]||(s[5]=p(` <h4 id="后台管理项目的屏幕适配" tabindex="-1">后台管理项目的屏幕适配 <a class="header-anchor" href="#后台管理项目的屏幕适配" aria-label="Permalink to &quot;后台管理项目的屏幕适配&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 采用缩放</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   对最外层容器（默认是body）设置了宽高（px）</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">和缩放</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(scale)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   缺点：缩放存在留白和失真</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   项目中采用第三方库：发现popper组件，下拉框的组件存在错位，不缩放的情况</span></span></code></pre></div><h4 id="_100ms轮询数据构建趋势图" tabindex="-1">100ms轮询数据构建趋势图 <a class="header-anchor" href="#_100ms轮询数据构建趋势图" aria-label="Permalink to &quot;100ms轮询数据构建趋势图&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 为了让数组不再增加</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">采用2的n次方处理，均匀采点</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">当数组为100的间隔两个取20个点，100到200之前，每隔两个push点进去，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">当为200的时候，总数组就有100个点，然后均匀两次，这样得到了每4个间隔的点，总数组还是50个</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">当200</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">400之前，每隔4个push进入，当400就有100，然后处理成50</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 一次类推，这样就保持50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">100个点之前，可以看到趋势图了</span></span></code></pre></div><h4 id="el-tree组件子选项有很多的导致页面卡顿-vue2" tabindex="-1">el-tree组件子选项有很多的导致页面卡顿(vue2) <a class="header-anchor" href="#el-tree组件子选项有很多的导致页面卡顿-vue2" aria-label="Permalink to &quot;el-tree组件子选项有很多的导致页面卡顿(vue2)&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 采用组件提供的懒加载模式，点击才会进行加载字选项</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 一次性子选项太多，点击下拉展开也会很卡顿，因为一次性dom渲染太多了，采用虚拟滚动组件和el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tree相结合，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   例如vue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">easy</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tree这个第三方库，内部就是vue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scroll</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">list与tree组件相结合</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 实现了虚拟滚动发现，点击全部勾选，还是存在卡顿，因为内部会递归调用setCheck导致变慢</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    解决方案：check</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">strictly设为true  父子组件不再联动    绑定check</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">change方法，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    内部采用this.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ref.tree.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setChecked</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()去实现字选项的勾选，这样就减少了卡顿</span></span></code></pre></div>`,7)),a(k)])}}});export{c as __pageData,u as default};
