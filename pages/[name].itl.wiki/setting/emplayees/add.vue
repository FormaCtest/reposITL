<template>
    <div>
        <div class="sot"><p href='#'>Настройки /</p><p href='#'> Сотрудники /</p><p href="#">Добавление сотрудников</p> </div> 
        <div class="add_s"><span >Добавление пользователя</span></div>
        <InputMail :message="message" @create="MailValue" :error="error" :left="430" :top="135" :width="470" :placeholder="'Введите email адресса через запятую или пробел'"/>
        <SelectStatus :top="280" :left="430" @add_role="save_role"/>
        <button @click="Add_users()" class="button create_text">Выслать приглашение</button>
    </div>
</template>
<script>
import { useTeamsStore } from '~~/stores/Teams'
import { useThePrivateStore } from '~~/stores/private'
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
            update: false,
            error: false,
            email: '',
            role: '',
            Array_email: [],
            message: ''
        }
    },

    methods:{
        async Add_users(){
        this.email = (this.email.trim()).replaceAll(' ',',')
        this.Array_email = this.email.split(',')
        for (var i = 0; i< this.Array_email.length; i++) {
            if ((this.Array_email[i].search(/[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}/igm))===-1) {
                this.error=true
                break;
            }else {if (this.Array_email.length-i===1) {   //если переданы правильно адресса, срабатывает запрос
                const url = new URL(
            "https://api.wiki.itl.systems/team/employees/add"
            );

            const headers = {
           "Authorization": "Bearer "+this.priv.token,
           "Content-Type": "application/json",
           "Accept": "application/json",
           };

           let body = {
           "team_id": this.teams.session_TeamID,
           "role": this.role,
           "emails": this.Array_email
            };

           const {error, data} = await useFetch(url, {
           method: "POST",
           headers,
           body: JSON.stringify(body),
           })
           if (data.value){
            navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/setting/emplayees')
           }else{
            this.error=true
            this.message='ошибочка'
           }
            }
            
            }
        }
        },
        save_role(role) {
         this.role = role
        },
      MailValue(link){
        this.email=link
        this.error=false
      }

    }
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/button.scss";
@import "@/assets/scss/font_family.scss";
.button{
    position: absolute;
    left: 430px;
    top: 360px;
    width: 210px;
}
.add_s{
position: absolute;
width: 300px;
left: 430px;
top: 90px;
font-family: "Roboto_regular";
font-size: 20px;
}
.sot{
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
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
</style>