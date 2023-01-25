<template>
  <div>
    <warning_window :class="[{'Ww': true},{'wW': None}]" v-bind:style="[{top:'230px'},{left:'130px'}]"/>
    <warning_window :class="[{'Ww': true},{'wW': None1}]" v-bind:style="[{top:'230px'},{left:'320px'}]"/>
    <warning_window :class="[{'Ww': true},{'wW': None2}]" v-bind:style="[{top:'435px'},{left:'230px'}]"/>
    <warning_window :class="[{'Ww': true},{'wW': None3}]" v-bind:style="[{top:'535px'},{left:'230px'}]"/>
    <div class="registration_window in">
      <form v-on:submit.prevent="onSubmit">
        <div class="initials">
          <div class="jic"><input @click="error_name=false; None=false" :class="{'error': error_name}" v-model="user_data.name" placeholder="Имя" type="text" @input="nameEd"></div>
          <div class="jic"><input @click="error_subname=false; None1=false" :class="{'error': error_subname}" v-model="user_data.subname" type="text" placeholder="Фамилия" @input="nameEd"></div>
          </div>
        <div class="verifi">
            <div class="jic"><input :class="{'un_em': un_em||en_mail}" @input="testMail" v-model="user_data.email" type="text" placeholder="Email"><img v-if="test1" class = "analysis" src="@/assets/resourses/icons/analysis.png"></div>
            <div class="jic"><input @input="sav_password" @click="error_password=false; None2=false" :class="{'error': error_password}" v-model="user_data.password" v-bind:type="Password" placeholder="Пароль"><img @click="visi" class="eye" src="@/assets/resourses/icons/eye.png" ></div>
            <div class="jic"><input  @input="" @click="error_double=false; None3=false" :class="{'error': error_double}" v-model="double" v-bind:type="Password2" placeholder="Повторите пароль"><img @click="visi2" class="eye eye2" src="@/assets/resourses/icons/eye.png" ></div>
        </div>
        <div><button type="submit" class="create button" @click.prevent="register"><p class="create_text">Зарегистрироваться</p></button></div>
       </form>
      <div :style="[{top: '196px'},{left: '8px'}]" v-if="un_em" class="un"><p>The email field is required.</p></div>
      <div :style="[{top: '196px'},{left: '8px'}]" v-if="en_mail" class="un"><p>The email must be a valid email address.</p></div>
      <div :style="[{top: '296px'},{left: '8px'}]" v-if="un_ps" class="un"><p>The password must be at least 6 characters.</p></div>
      <div :style="[{top: '296px'},{left: '8px'}]" v-if="mismatch" class="un"><p>The password confirmation does not match.</p></div>
      <div :style="[{top: '96px'},{left: '8px'}]" v-if="numbOfname" class="un"><p>Имя и Фамилия не может содержать цифры</p></div>
      <div class="by">
      <p>Нажимая кнопку «Зарегистрироваться» вы принимаете <a href="#">Условия обслуживания</a> в отношении продуктов ITL и соглашаетесь с <a href="#">Политикой конфиденциальности.</a></p>
      </div>
    </div>

  </div>

</template>
<script >
import { useThePrivateStore} from "@/stores/private"
export default {
  setup(){
  const priv = useThePrivateStore()
  
   return { priv}
  },
  data(){
    return {
      test1: false,
      Password: 'password',
      Password2: 'password',
      double: '',
      error_name: false,
      error_double: false,
      error_subname: false,
      error_password: false,
      error_password2: false,
      None: false,
      None1: false,
      None2: false,
      None3: false,
      en_mail: false,
      un_em: false,
      un_ps: false,
      numbOfname: false,
      mismatch: false,
      user_data: {
        name: '',
        subname: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    nameEd() {
this.numbOfname=false
    },
     testMail(event) {
      this.user_data.email=event.target.value;
        this.en_mail=false;
        this.un_em= false;
      if (this.user_data.email.length>=7) {
        this.test1 = true
        setTimeout(() => this.test1=false, 150);
      }
     },
     visi() {
      this.Password = 'text'
      setTimeout(() => this.Password = 'password', 2000);
     },
     visi2() {
      this.Password2 = 'text'
      setTimeout(() => this.Password2 = 'password', 2000);
     },
     sav_password(event) {
      this.un_ps=false;
      this.mismatch=false;

     },
      register() {       //Отправка данных
                      
       if (this.user_data.name.length<1) {
      this.error_name=true
      this.None=true
      }
      else if (this.user_data.subname.length<1) {
        this.error_subname=true
        this.None1=true
      }
      else if (this.user_data.name.search(/[^0-9]/)===-1) {
          this.numbOfname=true
          this.error_subname=true
          this.error_name=true
        } 
        else if (this.user_data.subname.search(/[^0-9]/)===-1) {
          this.numbOfname=true
          this.error_subname=true
          this.error_name=true
        } 
      
      else if (this.user_data.password.length<1) {
        this.error_password=true
        this.None2=true
      }
      else if (this.double.length<1) {
        this.error_double=true
        this.None3=true
      }
      //второй этап проверки на корректность
      else if (this.user_data.email.length<1) {
        this.un_em = true
        if (this.user_data.password.length<6) {this.un_ps=true}
        if (this.user_data.password!==this.double) {this.mismatch=true}
        this.user_data.password = ''
        this.double = ''
      }
      else if (((this.user_data.email).search(/[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}/igm))===-1) {
        this.en_mail = true
        if (this.user_data.password.length<6) {this.un_ps=true}
        if (this.user_data.password!==this.double) {this.mismatch=true}
        this.user_data.password = ''
        this.double = ''
      }
        else if (this.user_data.password.length<6) {this.un_ps=true
        this.user_data.password = ''
        this.double = ''
      }
        else if (this.user_data.password!==this.double) {this.mismatch=true
        this.user_data.password = ''
        this.double = ''
        }
        else {        //если данные корректные, можно отправлять данные на регистрацию
          this.priv.BuildUser(this.user_data.name, this.user_data.subname, this.user_data.email, this.user_data.password)
          this.user_data.name=''
          this.user_data.subname=''
          this.user_data.email=''
          this.user_data.password=''
        }



      }

  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/style.scss";
@import "@/assets/scss/button.scss";
@import "@/assets/scss/input.scss";
@import "@/assets/scss/font_family.scss";

.un{
  position: absolute;
}
.un p{
  color: rgb(221, 0, 0);
  font-family: 'Roboto_regular';
  font-size: 13px;
}
.create{
  position: absolute;
  top: 540px;
  height: 52px;
  width: 195px;
  left: 0px;
}

.registration_window{
  position: absolute;
  margin: 0px;
  padding: 0px;
  width: 370px;
  height: 380px;
  left: 130px;
  top: 140px;
  /*background: blue;*/
}

.initials{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.initials input{
  width: 170px;
}
.verifi input{
  width: 100%;
}
.by{
  position: absolute;
  width: 380px;
  height: 54px;
  font-family: "Roboto_regular";
  font-size: 11px;
  color: #999999;
  top: 440px;
  line-height: 1.5;
  left: 0px;
}
.by a{
  color: #999999;
}
.registration_window .error {
  border-bottom: solid 1px blue;
  transition: 1;
}
.Ww{
  opacity: 0;
}
.wW{
  transition: 1s;
  opacity: 1;
}
.jic .un_em, .un_ps, .en_mail, .mismatch{
  border-bottom: solid 1px red;
}
input{
  font-size: 20px;
}

</style>
