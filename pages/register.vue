<template>
  <div >
    <div class="container">
    <div class="line">
      <div class="reg">Регистрация</div>
      <div class="chevrol"><img src="@/assets/resourses/icons/chevrol.png"></div>
      <div>Создание компании</div>
      <div class="chevrol"><img src="@/assets/resourses/icons/chevrol.png"></div>
      <div>Добавление пользователей</div>
    </div>
    <registration_window />
    </div>
  </div>
</template>
<script>
definePageMeta({
  layout: "navbar",
});
export default {
setup(){
  
}
}
</script>
<style scoped lang="scss">
 @import "@/assets/scss/style.scss";
 .create{
  position: absolute;
  left: 130px;
  top: 684px;
  height: 52px;
  width: 195px;
}
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
  .chevrol{
    position: relative;
    top: 3px;
  }
  .container{
    position: absolute;
    height: 780px;
    width: 1200px;
    z-index: 2;
  }
</style>
