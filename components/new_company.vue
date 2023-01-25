<template>
  <div>
    <form v-on:submit.prevent="onSubmit">
    <div class="in name"><input @input="this.error_name=false, this.un_name=false" :class="{'error': error_name}" type="text" v-model="name" placeholder="Название вашей компании"></div>
    <div class="in adress"> <div><input @input="testLink()" :class="{'error': error_link}" v-model="adress" type="text" placeholder="адрес сайта"></div></div>
    <button  type="subtim" @click.prevent="add" class="button"><p class="create_text">Создать компанию</p></button>
    </form>
       <div class="by"><p>Нажимая кнопку «Создать компанию» вы принимаете <a href="#">Условия обслуживания</a> в отношении продуктов ITL и соглашаетесь с <a href="#">Политикой конфиденциальности.</a></p></div>
        <NuxtLink to="/Account/your_company" class="miss" >Пропустить</NuxtLink>
        <help_window :class="[{'activE':visible},{'dis':true}]" v-bind:style="[{top:'330px'},{left:'470px'}]"/>
        <div class="itl"><p>itl.wiki</p><div ><img @click.prevent="help" :class="{'que':que}" src="@/assets/resourses/icons/support_2.png"></div></div>
        <div :style="[{top: '235px'},{left: '140px'}]" v-if="un_name" class="un"><p>Вы не ввели название</p></div>
        <div :style="[{top: '335px'},{left: '140px'}]" v-if="un_link" class="un"><p>Вы не ввели адрес сайта</p></div>
        <div :style="[{top: '335px'},{left: '140px'}]" v-if="un_link2" class="un"><p> короткий адресс</p></div>
        <img v-if="test1" class = "analysis" src="@/assets/resourses/icons/analysis.png">
        </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private'
import {useTeamsStore} from '@/stores/Teams'
export default {
  setup() {
    const priv = useThePrivateStore()
    const teams = useTeamsStore()
    return {priv, teams}
  },
  data() {
    return{
    test1: false,
    un_name: false,
    un_link: false,
    un_link2: false,
    error_name: false,
    error_link: false,
    que: false,
    name: '',
    adress: '',
    visible: false,
    }
  },
  methods:{
    help() {
      this.visible=true
      this.que=true
      setTimeout(()=>this.dishelp(), 4000)
    },
    
    dishelp() {
      this.visible=false
      this.que=false
    },
    add(){
      if (this.name.length<1) {
        this.un_name=true;
         this.error_name=true;

      }
      else if (this.adress.length<=7) {
         this.un_link=true;
         this.error_link=true
      }
      else { this.GreateAdd() }
      },
      
      async GreateAdd() {

        const url = new URL(
    "https://api.wiki.itl.systems/team/add"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": this.name,
    "code": this.adress
};

const du = await useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})

if (du.error.value===null) {
  var fg = du.data._value.data.team_id
  this.teams.active_company(fg, this.adress)
  setTimeout(()=>{navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/new_user')}, 300)
  
}else {
  this.error_name=true
  this.error_link=true
}
      },
    
    testLink() {
      if (this.adress.length<7) {
        this.un_link=false;
        this.error_link= true;
        this.un_link2=true;
        
      }
      if (this.adress.length>=7) {
        this.un_link2=false;
        this.un_link=false;
        this.error_link= false;
        this.test1 = true
        setTimeout(() => this.test1=false, 150);
      }
     },
  }}

</script>

<style scoped lang="scss">
 @import "@/assets/scss/style.scss";
 @import "@/assets/scss/input.scss";
 @import "@/assets/scss/button.scss";
 @import "@/assets/scss/font_family.scss";

.analysis{
  top:310px;
  left: 420px;
}
 .button{
  left: 129px;
  top: 480px;
 }
 .un{
  position: absolute;
  left: 300px;
  width: 200px;
}
.name .error, .adress .error{
  border-bottom: 1px solid red;
}
.un p{
  color: rgb(221, 0, 0);
  font-family: 'Roboto_regular';
  font-size: 13px;
}
 .dis {
    opacity: 0;
    transition: 0.5s;
  }
 .activE{
  opacity: 1;
}
 .miss{
  position: absolute;
  left: 350px;
  top: 500px;
  text-decoration: none;
  font-size: 14px;
  color: rgb(63, 63, 63);
  font-family: 'Roboto_regular';
  transition: 0.2s;
  &:hover{
    color: blue;
  }
 }
 .by{
  position: absolute;
  width: 380px;
  height: 54px;
  font-family: "Roboto_regular";
  font-size: 11px;
  color: #999999;
  top: 380px;
  line-height: 1.5;
  left: 129px;
}
.by a{
  color: #999999;
}
 .itl{
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: absolute;
    width: 69px;
    height: 168px;
    left: 460px;
    top: 285px;
  
    img{
        position: absolute;
        top:18px;
        opacity: 0.5;
        transition: 0.09s;
    }
    img:hover{
        opacity: 1;
        cursor: pointer;}
    .que{
  opacity:1
 }
    p{
        font-size: 19px;
        color: rgb(54, 54, 54);
        font-family: 'NS_Medium'
    }
 }
 .name{
 left: 129px;
 top: 140px;
 } 
 .adress{
 left: 129px;
 top: 240px;
 width: 310px;
 }
 .in{
    input{
  font-size: 20px;
}
 }
</style>