<template>
<div>
  <div class="sot"><p href='#'>Настройки /</p><p href='#'> Теги</p></div> 
  <div class="add_s"><span >Список тегов</span></div>
  <div class="of_tags">
   <div @click="current_sorting=list; sort_tag(list)" class='let' v-for="list of arr_RU">{{ list }}</div>
  </div>
  <div class="current_sorting">{{ current_sorting }}</div>
  <div class="list_tag">

  </div>
</div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
import { useTeamUserStore } from '~~/stores/UserData';
import { useTeamsStore } from '~~/stores/Teams';
definePageMeta ({
  layout: "company",
  middleware: ['auth', 'team'],
})
export default{
setup(){
  const priv = useThePrivateStore()
  const team = useTeamUserStore()
  const teams = useTeamsStore()
  return {priv, team, teams}
},
 data(){
  return{
    arr_RU: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'],
    current_sorting: ''
  }
 },
 methods:{
  sort_tag(lt){
  
  }
 }
}
</script>
<style lang="scss" scss>
@import "@/assets/scss/font_family.scss";
.list_tag{
  position: relative;
  top: 250px;
  left: 430px;
  width: 200px;

}
.of_tags{
  position: absolute;
  top: 150px;
  width: 700px;
  left: 430px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Roboto_regular';
  font-size: 18px;
  color: rgb(60, 60, 255);
}
.current_sorting{
  position: absolute;
  font-size: 20px;
  font-family: 'Roboto_regular';
  top: 200px;
  left: 430px;
  color: black;
}
.sot{
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    line-height: 1.5;
    width: 400px;
    height: 20px;
    left: 430px;
    top: 30px;
    text-decoration: none;
    cursor: pointer;
    font-family: "Roboto_regular";
    font-size: 13px;
    color: #999999;
    p:hover{
        text-decoration: underline;
    }
}
.let{
  cursor: pointer;
}
.add_s{
position: absolute;
width: 365px;
left: 430px;
top: 90px;
font-family: "Roboto_regular";
font-size: 20px;
div{
  padding-top: 5px;
  background-color: #eef4fd;
  color: black;
  font-size: 12px;
  width: 50px;
  height: 20px;
  text-align: center;
}
}
</style>