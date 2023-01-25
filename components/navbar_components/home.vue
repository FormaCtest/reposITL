<template>
    <div>
        <div @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/my_works')" :style="{top: a_home+'px'}" class="n"><img class = "home" src= '@/assets/resourses/icons/home.png'></div>
    </div>
</template>
<script>
import { useTeamsStore } from '~~/stores/Teams';
export default {
   props:{
    a_home:{
      type: Number
    }
   },
   setup(){
    const teams = useTeamsStore()
    return{teams}
   }
}
</script> 
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss"; 

</style>
