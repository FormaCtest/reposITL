
<template>
    <div>
        <nuxt-link  to="#"><div v-bind:style="{top: a_magnifier+'px'}" class="personalspace2 n"><img class = "magnifier" src= '@/assets/resourses/icons/magnifier.png'></div></nuxt-link>
    </div>
</template>
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss";
.personalspace2{
    z-index: 1;
  position: absolute;
  height: 65px;
  width: 80px;
  left: 0px;
  top: 252px;
  border-radius: 0px;
  }
  .magnifier{
  position: absolute;
  left: 28px;
  top: 23px;
  border-radius: nullpx;
  }
</style>
<script>
export default {
    props: {
        a_magnifier:{
            type: Number
        }
    }
}
</script>