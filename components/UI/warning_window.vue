<template>
  <div class="warning">
    <div class="arrow"><img src="@/assets/resourses/icons/i.png">Заполните это поле.</div>
    <div class="meD">
      <div class="med"></div>
    <div class="med_mini"></div>
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
.warning{
  position: absolute;
  padding: 0;
  margin: 0;
  width: 200px;
  height: 70px;
  z-index: 1;
}
.med{
  position: absolute;
  width:0;
	height:0;
  border:10px solid transparent;
	border-bottom-color: rgb(0, 0, 0);
  z-index: 5;
}
.med_mini{
  position: absolute;
  top: 2px;
  left: 1px;
  width:0;
	height:0;
  border:9px solid transparent;
	border-bottom-color: rgb(255, 255, 255);
  z-index: 5;
}
.meD{
  position: absolute;
  left: 10px;
  top: 1px;
}
.arrow{
  background: white;
  position: absolute;
  top: 20px;
  width: 175px;
  height: 40px;
  border: 1px #727272;
  border-style: solid;
  border-radius: 5px;
  box-shadow: 5px 3px 3px 1px rgb(211, 211, 211);
  padding-right: 10px;
  //текст
  text-align: right;
  line-height: 40px;
  color: rgb(36, 36, 36);
  font-family: 'Roboto_regular';
  font-size: 14px;
  z-index: 1;
  //картинка
  img {
    position: absolute;
    left: 5px;
    top: 5px;
  }
}

</style>
