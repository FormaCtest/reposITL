<template>
    <div>
      <div class="linE">
      <div >Создание компании</div>
      <div class="chevrol"><img src="@/assets/resourses/icons/chevrol.png"></div>
      <div class="soz">Добавление пользователей</div>
      </div>
      <div class="osn"><span>Основные достоинства itl.wiki раскрываются, когда вы работаете в связке с другими участниками команды и обсуждаете проекты</span></div>
     <SelectStatus :top="350" :left="470" @add_role="save_role"/>
     <div class="in im"><InputMail @create="MailValue" :left="0" :width="620" :error="error" :placeholder="'Введите email адреса через запятую или пробел'"/></div>
     <div class="by"><p>Нажимая кнопку «Пригласить пользователей» вы принимаете <a href="#">Условия обслуживания</a> в отношении продуктов ITL и соглашаетесь с <a href="#">Политикой конфиденциальности.</a></p></div>
     <button @click.prevent="test" class="button" :style="[{top:'540px'},{left: '470px'},{width: '250px'}]"><span @click="Add_users" class="create_text">Пригласить пользователей</span></button>
    </div> 
</template> 
<script>
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
export default {
  setup() {
   const priv = useThePrivateStore()
   const teams = useTeamsStore()
   return {priv, teams}
  },
  data(){
    return{
      error: false,
      email: '',
      role: '',
      Array_email: []
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

           const {error} = await useFetch(url, {
           method: "POST",
           headers,
           body: JSON.stringify(body),
           })
        
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
<style scored lang="scss">
@import "@/assets/scss/style.scss";
 @import "@/assets/scss/input.scss";
 @import "@/assets/scss/button.scss";
 @import "@/assets/scss/font_family.scss";
 .by{
  position: absolute;
  width: 380px;
  height: 54px;
  font-family: "Roboto_regular";
  font-size: 11px;
  color: #999999;
  top: 440px;
  line-height: 1.5;
  left: 470px;
}
.by a{
  color: #999999;
}
 .im{
    left: 470px;
    top: 200px;
    width: 620px;
    input{
  font-size: 20px;
}
 }
 .osn{
    position: absolute;
    width: 620px;
    height: 30px;
    left: 470px;
    top: 130px;
    span{
        font-size: 12px;
        color: rgb(26, 26, 26);
        font-family: 'Roboto_medium';
    }
 }
 .linE{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: absolute;
    left: 470px;
    top: 32px;
    width: 600px;
    height: 50px;
  }
  .chevrol{
    position: relative;
    top: 3px;
  }
  .soz{
    color: rgb(12, 12, 12);
  }
  .linE{
  font-family:'Roboto_regular';
  font-size: 24px;
  color: #CCCCCC;
  vertical-align: middle;
  line-height: 50px;
  .reg{
    color: rgb(12, 12, 12);
  }
}
</style>