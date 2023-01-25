<template>
    <div>
        <ButtonUnVis @click_button="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/setting/emplayees/add')" :text="'Пригласить пользователей'"/>  
       <div class="sot"><p href='#'>Настройки / Сотрудники</p></div> 
       <div class="add_s"><span >Добавление сотрудника</span></div>
       <div class="text_s"><span >За каждым успехом стоит команда!
          Пригласите свою команду и начните создавать отличные вещи вместе. </span></div>          
        <div class="list_s"><span >Список сотрудников</span></div>   
        <div class="tb_users">
            <div class="a"><span>Пользователь</span></div>
            <div class="b"><span>Последняя активность</span></div>
            <div class="c"><span>Статус</span></div>
        </div>                               
        <div class="list_user">
        <div class="user_teams" v-for="list of list_user">
        <div class="initials">
       {{ list.fullname }}
        <div class="email">{{ list.email }}</div>
        </div>
        <div class="log">{{ list.logged_in }}</div>
        <div class="state">{{ list.membership?'Выдан доступ':'' }}</div>
        <div class="role">{{ list.membership?(list.membership.role===current_team.team.roles[0].id?'Админ':
        (list.membership.role===current_team.team.roles[1].id?'Модератор':'Пользователь')):"Владелец" }}</div>
       </div>
      </div>
    </div>
</template>
<script>
import { useTeamsStore } from '~~/stores/Teams';
import { useThePrivateStore } from '~~/stores/private';
definePageMeta ({
  layout: "company",
  middleware: ['auth', 'team'],
})
export default {
   setup(){
    const teams = useTeamsStore()
    const priv = useThePrivateStore()
    return{teams, priv}
   },
   data() {
    return{
     list_user: [],
     current_team: []
    }
   },
   mounted(){
    this.Get_list()
    this.test_user()
   },
   methods:{
    async test_user () {
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
if (data.value){
this.current_team=data.value.data
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
    async Get_list () {

        const url = new URL(
    "https://api.wiki.itl.systems/team/employees"
);

const params = {
    "team_id": this.teams.session_TeamID,
    "all": 0,
    // "limit": "2",
    // "offset": "30",
    // "order_by": "created_a",
    // "order_sort": "ASC",
    
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
if  (data.value){
this.list_user = data.value.data.employees;
for (let a = 0; a<=this.list_user.length; a++) {
    if (!(this.list_user[a].membership)) {
        [this.list_user[0], this.list_user[a]] = [this.list_user[a], this.list_user[0]];
        break;
    }
}
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
    }
   }
}
</script>
<style lang="scss">
@import "assets/scss/font_family.scss";
.log{
    width: 230px;
}
.user_teams{
    font-family: 'Roboto_regular';
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row;
    color: #414141;
    font-size: 14px;
    width: 900px;
    height: 70px;
    
}
.role{
    color: blue;
}
.state{
    width: 200px;
}
.initials{
    display: flex;
    flex-direction: column;
    width: 290px;
}
    .email{
        margin-top: 5px;
        font-size: 11px;
        color: #999999;
    }

.list_user{
    display: flex;
    flex-direction: column;   
    position: absolute;
    flex-wrap: nowrap;
    width: 900px;
    height: 40%;
    left: 430px;
    top: 480px;
}
.sot{
    position: absolute;
    width: 300px;
    height: 20px;
    left: 430px;
    top: 30px;
    text-decoration: none;
    cursor: pointer;
    font-family: "Roboto_regular";
    font-size: 13px;
    color: #999999;
}
.add_s{
position: absolute;
width: 300px;
left: 430px;
top: 90px;
font-family: "Roboto_regular";
font-size: 20px;
}
.text_s{
position: absolute;
width: 480px;
left: 430px;
top: 140px;
line-height: 1.5;
font-family: "Roboto_regular";
color: rgb(87, 87, 87);
font-size: 13px;
}
.list_s{
position: absolute;
width: 300px;
left: 430px;
top: 300px;
font-family: "Roboto_regular";
font-size: 20px;
color: rgb(39, 39, 39)
}
.tb_users{
    position: absolute;
width: 900px;
height: 40px;
padding: 0px;
margin: 0px;
left: 420px;
top: 380px;
font-family: "Roboto_regular";
font-size: 13px;
color: #999999;
border-bottom: 1px  solid #cacaca;
.a{
    position: absolute;
    left: 10px;
    top: 13px;
}
.b{
    position: absolute;
    left: 300px;
    top: 13px;
}
.c{
    position: absolute;
    left: 530px;
    top: 13px;
}
}
</style>