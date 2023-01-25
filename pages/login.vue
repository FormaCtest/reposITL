<template>
  <div>
    <div class="container">
    <div>
    <div class="line">
      <div class="reg">Авторизация</div>
    </div>
    <auth_window />
  </div>
  </div>
  </div> 
</template>

<style scoped lang="scss">
 @import "@/assets/scss/style.scss";

.line{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: absolute;
    left: 129px;
    top: 32px;
    width: 790px;
    height: 50px;
  }
  .container{
    position: absolute;
    z-index: 2;
    height: 600px;
    width: 1000px;
  }

</style>
<script>
definePageMeta({
  layout: "navbar",
});
export default {
setup(){
}
}
</script>
