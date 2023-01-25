
<template>
    <div>
       <div @click="set.vis_setting()" v-bind:style="{top: a_setting+'px'}" class="personalspace3 n"><img class = "setting" src= '@/assets/resourses/icons/setting.png'></div>
    </div>
</template>

<script>
import { useVisFunStore } from '~~/stores/NavbarStore';
export default {
   props:{
    a_setting:{
        type: Number
    }
   },
   setup(){
    const set = useVisFunStore()
    return {set}
   }
}
</script>
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss";
.personalspace3{
    z-index: 1;
  position: absolute;
  height: 65px;
  width: 80px;
  left: 0px;
  top: 641px;
  border-radius: 0px;
  }
  .setting{
  position:absolute;
  height: 22px;
  left: 29px;
  top: 20px;
  border-radius: nullpx;
  }
</style>