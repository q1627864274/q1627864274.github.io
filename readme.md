   <transition name="fade-transform" mode="out-in">
         <div :key="page" style="height: 100%;">
            <component :is="componentToRender" :key="page"></component>
         </div>
    </transition>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
组件变化时，发现消失的时候生效，进入的时候没有生效
    
