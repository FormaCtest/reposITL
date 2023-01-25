<template>
    <div>
      <div class="containerZ">
      <div class="sot"><p href='#'>Настройки /</p><p href='#'> Общие</p></div> 
      <div class="add_s"><span >Профиль компании</span></div>
      <inputMail :start="teams.session_TeamName" @create="savename" :error="error" :update="update" :top="80" :left="430" :width="430" :placeholder="'Название вашей компании'"/>
      <inputMail :start="teams.session_TeamCode" :analys="true" @create="savecode" :error="error||error_code" :update="update" :top="170" :left="430" :message="message" @input="origi()" :placeholder="'адрес сайта'"/>
      <div class="itl"><p>itl.wiki</p><div ><img @click="help" :class="{'que':que}" src="@/assets/resourses/icons/support_2.png"></div></div>
      <help_window :class="[{'activE':visible},{'dis':true}]" :style="[{top:'270px'},{left:'830px'}]"/>
      <div class="pod_text">Поделитесь ссылкой <span class="pod_link">itl.wiki/{{ teams.session_TeamCode }}</span>, 
        чтобы добавить кого-либо с разрешенным доменом электронной почты
         в ваше рабочее пространство.</div>
         <div class="add_s" :style="[{top: '400px'}, {color: '#999999'}]"><span >Разрешеные почтовые домены</span><div>Скоро</div></div>
         <div class="fake_input">Введите домены через запятую или пробел</div>
         <span class="sot" :style="[{top: '550px'},{width: '460px'}]">Любой, кто имеет адрес электронной почты в этих доменах,
           может автоматически присоединиться к вашей компании.</span>
           <div class="add_s" :style="[{top: '630px'},{color: 'rgb(46, 46, 46)'}]"><span >Региональные настройки</span></div>
           <div class="lang"><span class="text_lang">Язык интерфейса</span></div>
           <div class="data"><span class="text_data">Формат даты</span></div>
           <button  @click="SaveEdit()" class="button create_text" :style="[{top: '830px'},{left: '430px'}]" :disabled="disabled">Сохранить настройки</button>
           <Selecter_univ @chosen="jjj" :width="300" :dataSelect="dataSelect1" :top="760" :left="630"/>
           <Selecter_univ @chosen="jjj" :width="300" :dataSelect="dataSelect2" :top="690" :left="630"/>
           
           
     </div>
    </div>
</template>
<script>
import Selecter_univ from '~~/components/UI/selecter_univ.vue';
import Select_status from '~~/components/UI/select_status.vue';
import { useTeamsStore } from '~~/stores/Teams';
import { useThePrivateStore } from '~~/stores/private';
definePageMeta ({
  layout: "company",
  middleware: ['auth', 'team'],
})
export default {
    setup() {
        const teams = useTeamsStore();
        const priv = useThePrivateStore()
        return { teams, priv };
    },
    mounted(){
     this.InfoTeams()
    },
    data() {
        return {
            que: false,
            visible: false,
            dataSelect1:['День месяц'],
            dataSelect2:['Русский'],
            company_data: [],
            code: '',
            name: '',
            error: false,
            update: false,
            error_code: false,
            message: 'неккоректно введенные данные',
            disabled: false
        };
    },
    methods: {
     async origi(){
        const url = new URL(
    "https://api.wiki.itl.systems/team/code/check"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "code": this.code,
    "team_id": this.teams.session_TeamID
};

const {data, error} = await useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
if (!data.value){
  this.message= error._rawValue.data.messages.code[0]
  this.error_code=true
  this.disabled=true
  
}else{
  this.error_code = false
  this.message= 'неккоректно введенные данные'
  this.disabled=false
}
      },
      savename(p){
        this.name=p
        this.error=false
      },
      savecode(p){
        this.code=p
        this.error=false
      },
      async SaveEdit() {
        const url = new URL(
    "https://api.wiki.itl.systems/team/edit"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "name": this.name,
    "code": this.code
};

const {error}  = await useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
if (error.value===null){
this.update=true
setTimeout(()=>{this.update=false}, 500)
}else{
  switch (error.value.statusCode) {
    case 401: throw createError({ statusCode: 401, statusMessage: 'the session is over', fatal: true })
    break;
    case 500: throw createError({ statusCode: 500, statusMessage: 'invalid request', fatal: true })
    break;
    case 400: throw createError({ statusCode: 400, statusMessage: 'Запросу не хватает данных'})
    break;
    case 429: this.priv.Delete_token;
              throw createError({ statusCode: 400, statusMessage: 'Слишком много запросов', fatal: true})
              break;
}
}
      },
        async InfoTeams(){
          const url = new URL(
    "https://api.wiki.itl.systems/team"
);

const params = {
    "team_id": this.teams.session_TeamID,
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};


const {data, error} = await useFetch(url, {
    method: "GET",
    headers,
})
if(data.value){
this.company_data=data.value.data.team
}else{
  switch (error.value.statusCode) {
    case 401: throw createError({ statusCode: 401, statusMessage: 'the session is over', fatal: true })
    break;
    case 500: throw createError({ statusCode: 500, statusMessage: 'invalid request', fatal: true })
    break;
    case 400: throw createError({ statusCode: 400, statusMessage: 'Запросу не хватает данных'})
    break;
    case 429: this.priv.Delete_token;
              throw createError({ statusCode: 400, statusMessage: 'Слишком много запросов', fatal: true})
              break;
}
}
        },
        jjj(p){
  
        },
        help() {
            this.visible = true;
            this.que = true;
            setTimeout(() => this.dishelp(), 4000);
        },
        dishelp() { 
            this.visible = false;
            this.que = false;
        },
    },
    components: { Select_status, Selecter_univ }
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/button.scss";
 @import "@/assets/scss/style.scss";
@import "@/assets/scss/font_family.scss";
.containerZ{
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 920px;
}
.lang{
position: absolute;
height: 60px;
width: 700px;
left: 430px;
top: 700px;
font-size: 16px;
font-family: 'Roboto_regular';
}
.data{
  position: absolute;
  left: 430px;
  top: 770px;
  font-size: 16px;
  font-family: 'Roboto_regular';
}
.fake_input{
  position: absolute;
  left: 430px;
  top: 470px;
  width: 450px;
  height: 40px;
  border-bottom: 1px solid #999999;
  font-family: 'Roboto_light';
  padding-bottom: 0px;
  color: #999999;
  font-size: 16px;

}
.pod_text{
position: absolute;
width: 470px;
height: 50px;;
left: 430px;
top: 300px;
color: rgb(85, 85, 85);
font-family: 'Roboto_regular';
font-size: 13px;
line-height: 1.5;
.pod_link{
  color: rgb(0, 0, 168);
}
}
.link{
  position: absolute;
  left: 825px;
  top:235px;
  font-family: 'Roboto_regular';
  font-size: 16px;
  color: rgb(46, 46, 46)
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
    left: 830px;
    top: 220px;
  
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
.add_s{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
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
.dis {
    opacity: 0;
    transition: 0.5s;
  }
 .activE{
  opacity: 1;
}
</style>