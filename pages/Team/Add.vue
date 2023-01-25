<template>
    <div>
      <div class="container_Add">
      <div class="line">
      <div class="soz">Создание компании</div>
      <div class="chevrol"><img src="@/assets/resourses/icons/chevrol.png"></div>
      <div>Добавление пользователей</div>
    </div>
       <new_company />
      </div>
    </div>
</template>
<script> 
import { useThePrivateStore } from '~~/stores/private';
definePageMeta({
  layout: "user",
  middleware: ['auth'],
});
export default { 
  setup() {
   const priv = useThePrivateStore()
   return{priv}
}
}
</script>
<style scored lang="scss">
 @import "@/assets/scss/style.scss";
 @import "@/assets/scss/input.scss";
 @import "@/assets/scss/button.scss";
 @import "@/assets/scss/font_family.scss";
 .line{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: absolute;
    left: 129px;
    top: 32px;
    width: 600px;
    height: 50px;
  }
  .chevrol{
    position: relative;
    top: 3px;
  }
  .soz{
    color: rgb(12, 12, 12);
  }
  .container_Add{
    position: absolute;
    height: 640px;
  }
</style>
