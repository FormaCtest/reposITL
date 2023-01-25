
<template>
    <div>
        <div @click="vis_plus.vis_plus" v-bind:style="{top: a_plus+'px'}" class="personalspace1 n"><img class = "plus" src= '@/assets/resourses/icons/plus.png'></div>
    </div>
</template>
<script>
import { useVisFunStore } from '~~/stores/NavbarStore';
export default {
    props: {
        a_plus:{
            type: Number
        }
    },
    setup(){
        const vis_plus =  useVisFunStore()
            return {vis_plus}
        
    }
    
}
</script>
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss";
.personalspace1{ 
    z-index: 1;
  position: absolute;
  height: 65px;
  width: 80px;
  left: 0px;
  top: 193px;
  border-radius: 0px;
  }
  
  
  .plus{
  position: absolute;
  left: 30px;
  top: 21px;
  border-radius: nullpx;
  }
</style>
