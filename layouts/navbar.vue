<template>
  <div>
    <nav>
      <div>
        <slot />
        <empty />
        <div class="nAv">
        <nuxt-link to="/"><div class="nAv"><img src ='@/assets/resourses/icons/logo.png'></div></nuxt-link>
        </div>
        </div>
    </nav>
    </div>
</template>
<script>
export default {

}
</script>
<style scored lang="scss">
@import "@/assets/scss/style_nav.scss";
</style>
