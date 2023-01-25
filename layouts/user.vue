<template>
    <div>
      <nav>
        <div>
          <slot /> 
          <empty />
          <support_window v-if="fun.support"/>
          <user_window v-if="fun.user"/>
          <home :a_home="130"/>
          <support  :a_support="500"/>
          <user :a_user="566"/>
          <div class="nAv">
          <nuxt-link to="/Account/your_company"><div><img src ='@/assets/resourses/icons/logo.png'></div></nuxt-link>
          </div>
          </div>
      </nav>
      </div>
  </template>
  <script>
  import {useThePrivateStore } from '~~/stores/private'
  import { useVisFunStore } from '~~/stores/NavbarStore'
  export default {
  setup() {
  const priv = useThePrivateStore() //хранилище информации доступа, токены, авторизация, зависимости для промежуточного ПО
  const fun = useVisFunStore()  //функциональность навбара
  return { priv, fun}
  },
  }
  </script>
 <style scored lang="scss">
 @import "@/assets/scss/style_nav.scss";
 .nAv{
  position: fixed;
  left: 1.9%;
 }
 </style>
  