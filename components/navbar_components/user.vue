
<template>
    <div>
        <div :style="{top: a_user+'px'}" class="n" @click.prevent="def.vis_user()"><img class = "user" src= '@/assets/resourses/icons/user.png'></div>
    </div>
</template>
<script >
import { useVisFunStore } from '@/stores/NavbarStore' 

export default {
  props:{
  a_user:{ 
     type: Number
  }
},
    setup() {
      const def = useVisFunStore()
      return {def}
    },
   }
</script>
<style scored lang="scss">
 @import "@/assets/scss/style_nav.scss";
</style>