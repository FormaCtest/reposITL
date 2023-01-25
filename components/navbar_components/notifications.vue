
<template>
    <div>
        <nuxt-link  to="#"><div v-bind:style="{top: a_notifications+'px'}" class="personalspace4 n"><img class = "notifications" src= '@/assets/resourses/icons/notifications.png'></div></nuxt-link>
    </div>
</template>
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss";
.personalspace4{
    z-index: 1;
  position: absolute;
  height: 65px;
  width: 80px;
  left: 0px;
  top: 441px;
  border-radius: 0px;
  }
  .notifications{
  position: absolute;
  height: 23px;
  left: 40%;
  right: 40%;
  top: calc(50% - 27px/2 - 4px);
  }
</style>
<script>
export default {
    props: {
        a_notifications:{
            type: Number
        }
    }
}
</script>