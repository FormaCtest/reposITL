<template>
  <div>
    <div class="B">
  <div class="fon">
    <Favicon />
    <sign />
    <div class="main">
    <h1>Вовлекайте сотрудников в процесс и создавайте культуру непрерывного обмена знаниями и опытом.</h1>
    </div>
    <div class="correction">
    <h3>Постоянное развитие достигается за счет правильного управления информацией и знаниями.</h3>
    </div>
     <NuxtLink to="register"><button class="button create"><p class="create_text">Создать бесплатно</p></button></NuxtLink>
     <div class="sacred_shadow1"><div class="sacred_shadow2"><div class="screen"><img src='@/assets/resourses/icons/screen.png'></div></div></div>
  </div>
  </div>
    </div>
</template>

<script setup>
import { useThePrivateStore } from '~~/stores/private';
const priv = useThePrivateStore()
if (priv.token) {
  navigateTo("/Account/your_company")
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/style.scss";
@import "@/assets/scss/button.scss";
.create{
  position: absolute;
  left: 68px;
  top: 515px;
}
.B{
  margin-top: 0px;
  padding-top: 0px;
}
</style>
