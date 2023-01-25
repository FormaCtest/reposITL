<template>
    <div class="help">
      <div class="base">Не менее 6 символов, только строчные буквы и цифры.</div>
      <div class="Dem">
        <div class="d23"></div>
    </div>
    </div>
  </template>
  <script>
  export default {
    // data(){
    //   return{
    //     size1: 100,
    //     size2: 200
    //   }
    // }
    // props: {
    // size1: {
    //   type: Number,
    //   required: true
    // },
    // size2: {
    //   type: Number,
    //   required: true
    // }
    // }
  }
  </script>
  
  <style scored lang="scss">
@import "@/assets/scss/font_family.scss";
  .d23:before {
  content: "";
  height: 0; 
  width: 0;
  position: absolute; 
  left: 0; 
  top: -35px;
  border-bottom: 8px solid #ffffff;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  z-index: 3;
  }
  .help{
    position: absolute;
    padding: 0;
    margin: 0;
    width: 200px;
    height: 150px;
    z-index: 2;
    
  }
  .Dem{
    position: absolute;
    left: 60px;
    top: 49px;
  }
  .base{
    padding: 20px;
    background: white;
    position: absolute;
    top: 20px;
    width: 165px;
    height: 50px;
    border-color: white;
    border-style: solid;
    border-radius: 3px;
    box-shadow: 0px 2px 20px 2px rgb(236, 236, 236);
    padding-right: 10px;
    //текст
    text-align: left;
    line-height: 18px;
    color: rgb(71, 71, 71);
    font-family: 'Roboto_regular';
    font-size: 13px;
    z-index: 2;
    //картинка
    img {
      position: absolute;
      left: 5px;
      top: 5px;
    }
  }
  
  </style>
  