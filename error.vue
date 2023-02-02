<template>
    <div id="_err">
        <h4>{{ 'ERROR '+error.statusCode }}</h4>
        <h4>{{ error.message }}</h4>
        <p>{{ 'URL: '+error.url }}</p>
        <p id="_paragraph" @click="handleError">>>TO RETURN</p>
    </div>
  </template>
  <script setup>
  const props = defineProps({
    error: Object
  })
  const handleError = () => clearError({ redirect: '/' })
  </script>
  <style lang="scss" scored>
  @import "@/assets/scss/font_family.scss";
  #_err{
  font-family: 'Roboto_regular';
  };
  #_paragraph{
    cursor: pointer;
    text-decoration: underline;
  }

  </style>