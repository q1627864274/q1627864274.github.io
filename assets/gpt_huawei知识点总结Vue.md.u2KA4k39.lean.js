import{C as n,c as l,o as p,ax as i,G as h,k as t}from"./chunks/framework.CJlX88Tx.js";const k={memo:{"App.vue":`
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
       `}},g=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"gpt/huawei知识点总结Vue.md","filePath":"gpt/huawei知识点总结Vue.md","lastUpdated":null}'),e={name:"gpt/huawei知识点总结Vue.md"},y=Object.assign(e,{setup(E){return(r,s)=>{const a=n("Playground");return p(),l("div",null,[s[0]||(s[0]=i("",165)),h(a,{files:t(k).memo},null,8,["files"]),s[1]||(s[1]=i("",27))])}}});export{g as __pageData,y as default};
