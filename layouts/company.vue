<template>
    <div>
      <div>
        <div>
          <empty :h="649"/>
          <start_window />
          <slot />
          <user_window v-if="fun.user"/>
          <support_window v-if="fun.support"/>
          <create-window v-if="fun.plus"/>
          <setting-window v-if="fun.setting"/>
          <create-window v-if="fun.plus" />
          <home :a_home="130"/>
          <support  :a_support="500"/>
          <user :a_user="566"/>
          <setting :a_setting="434" v-if="this.teams.role==='owner'||this.teams.role==='admin'"/>
          <plus :a_plus="196"/>
          <magnifier :a_magnifier="262"/> 
          <div class="nAv">
          <div @click="fun.reset(), navigateTo('/'+teams.session_TeamCode+'.itl.wiki')"><img src ='@/assets/resourses/icons/logo.png'></div>
          </div>
          </div>
        </div>
      </div>
  </template>
  <script>
  import { useSectionStore } from '~~/stores/SectionStore'
  import {useThePrivateStore } from '~~/stores/private'
  import { useTeamsStore } from '~~/stores/Teams'
  import { useVisFunStore } from '~~/stores/NavbarStore'
  export default {
  setup() {
    const teams = useTeamsStore()
  const priv = useThePrivateStore() //хранилище информации доступа, токены, авторизация, зависимости для промежуточного ПО
  const fun = useVisFunStore()  //функциональность навбара
  const sect = useSectionStore()
  return { priv, fun, teams, sect}
  },
 
  }
  </script>
 <style scored lang="scss">
 @import "@/assets/scss/style_nav.scss";
 .nAv{
  position: fixed;
  left: 1.9%;
  cursor: pointer;
 }
 </style>
  