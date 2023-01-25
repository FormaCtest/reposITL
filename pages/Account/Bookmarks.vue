<template>
    <div>
    <div>
        <span class="my_bookmark">Мои закладки</span>
    </div> 
    </div>
</template>
<script>
definePageMeta({
    layout: 'user',
    middleware: ['auth']
})
</script>
<style lang="scss" scored>
@import "@/assets/scss/font_family.scss";
.my_bookmark{
    position: absolute;
  font-size: 20px;
  font-family: 'Roboto_regular';
  left: 410px;
  top: 40px;
  color: rgb(49, 49, 49);

}
</style>