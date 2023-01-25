
<template>
    <div>
        <div @click.prevent="def.vis_support()" :style="{top: a_support+'px'}" class="n"><img class = "support" src= '@/assets/resourses/icons/support.png'></div>
    </div>
</template>
<script>
import { useVisFunStore } from '@/stores/NavbarStore' 
export default {
  props:{
    a_support:{
      type: Number
    }
  },  
    setup() {
      const def = useVisFunStore()

      return {def}
    }
    
}

</script>
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss";
@import "@/assets/scss/style.scss";
@import "@/assets/scss/font_family.scss";
</style>
