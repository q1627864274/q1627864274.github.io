import{E as h,c as p,J as n,p as l,a as i,m as s,a6 as k,o as e}from"./chunks/framework.c2jmegWL.js";const t={example:{"App.vue":`
        <template>
          <h1>{{ msg }}</h1>
          <input v-model="msg">
          <Fuben/>
        </template>
        <script setup>
        import { ref } from 'vue'
        import Fuben from "./Fuben.vue"
        const msg = ref('你好 林大大1哟!')
        <\/script>
        `,"Fuben.vue":`
        <template>
          <h1>{{ msg }}</h1>
          <input v-model="msg">
        </template>
        
        <script setup>
        import { ref } from 'vue'
        const msg = ref('我是副本')
        <\/script>
        `},triangle:{"App.vue":`
<template>
    <div class="border"></div>
</template>
<script setup>
<\/script>
<style>
.border {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px;
    border-top: 0;
    border-color: transparent transparent #d9534f;
}
</style>
       `},emptTriangle:{"App.vue":`
<template>
  <div class="border"></div>
</template>
<script setup>
<\/script>
<style>
.border {
    width: 0;
    height: 0;
    border-style:solid;
    border-width: 0 50px 50px;
    border-color: transparent transparent #d9534f;
    position: relative;
}
.border:after {
    content: '';
    border-style: solid;
    border-width: 0 40px 40px;
    border-color: transparent transparent #96ceb4;
    position: absolute;
    top: 6px;
    left: -40px;
}
</style>
        `}},E=s("h4",{id:"如何画一个三角形",tabindex:"-1"},[i("如何画一个三角形 "),s("a",{class:"header-anchor",href:"#如何画一个三角形","aria-label":'Permalink to "如何画一个三角形"'},"​")],-1),d=s("ol",null,[s("li",null,[s("p",null,"画一个普通的三角形？ 没有宽高的div盒子，border宽度为50px，边款线为solid，上左右的边框颜色为transparent，下边框为想要的颜色")]),s("li",null,[s("p",null,"发现盒子隐藏的部分任然占据部分高度，需要将上方的宽度去掉，实现一个三角形 border-top: 0;")])],-1),r=s("ol",{start:"3"},[s("li",null,"怎么实现一个空心的三角形？ 利用这个div的伪类例如after再创建一个三角形，父亲为50px，伪类为40px，使用子绝父相，通过left，top进行移动将这个伪类定位覆盖div上，再讲伪类的border颜色修改为白色，这样就得到一个空心的三角形")],-1),g=k("",108),u=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"CSS/huawei知识点总结CSS.md","filePath":"CSS/huawei知识点总结CSS.md","lastUpdated":null}'),y={name:"CSS/huawei知识点总结CSS.md"},B=Object.assign(y,{setup(o){return(F,c)=>{const a=h("Playground");return e(),p("div",null,[E,d,n(a,{files:l(t).triangle},null,8,["files"]),i(),r,n(a,{files:l(t).emptTriangle},null,8,["files"]),i(),g])}}});export{u as __pageData,B as default};
