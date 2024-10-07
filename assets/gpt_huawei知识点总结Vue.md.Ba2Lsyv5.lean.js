import{E as a,c as n,J as l,p,a as h,a6 as s,o as t}from"./chunks/framework.c2jmegWL.js";const k={memo:{"App.vue":`
 <template>
    <div>
      <div @click="select(item.id)"   :key="item.id" v-for="(item) in arr" v-memo="[item.id === active]">
        {{ item.id }} - selected： {{ item.id == active }}
      </div>
    </div>
 </template>
 <script setup >
    import { ref, reactive } from 'vue'
 
    const arr = reactive([])
    for (let i = 0; i < 10000; i++) {
    arr.push({
       id: i + 1,
       name: "test"
    })
    }
    const active = ref(1)
    const select = async (index) => {
    active.value = index;
    console.time()
    await Promise.resolve()
    console.timeEnd()
    }
 <\/script>
  <style scoped lang='less'>
  </style>
       `}},e=s("",165),E=s("",26),o=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"gpt/huawei知识点总结Vue.md","filePath":"gpt/huawei知识点总结Vue.md","lastUpdated":null}'),r={name:"gpt/huawei知识点总结Vue.md"},F=Object.assign(r,{setup(d){return(g,y)=>{const i=a("Playground");return t(),n("div",null,[e,l(i,{files:p(k).memo},null,8,["files"]),h(),E])}}});export{o as __pageData,F as default};
