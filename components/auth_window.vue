<template>
  <div>
    <warning_window :class="[{'activE':auth_data.visible},{'dis':true}]" v-bind:style="[{top:'290px'},{left:'230px'}]"/>
    <warning_window :class="[{'activE':auth_data.visible1},{'dis':true}]" v-bind:style="[{top:'390px'},{left:'230px'}]"/>
    <form @submit.prevent="onSubmit">
    <div class="in data_entry">
      <div><input @input="(auth_data.visible= false, priv.finish.a = false)" v-model="auth_data.email" type="text" placeholder="Email" ></div> 
      <div class="cij"><input @input="auth_data.visible1= false" v-model="auth_data.password" v-bind:type="auth_data.Password" placeholder="Пароль"><img @click.prevent="visi()" class="eye eye3" src="@/assets/resourses/icons/eye.png" ></div>
    </div>
      <button @click.prevent="(auth())" class="create button" type="subtim"><p class="create_text">Войти</p></button>
      <div :style="[{top: '300px'},{left: '140px'}]" v-if="priv.finish.a" class="nu"><p>Пользователь с таким логином или паролем не найден</p></div>
    </form>
    <div>
      
      </div>
  </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
export default {
  setup() {
   const priv = useThePrivateStore()
   return {priv}
  },
  data() {
    return {
     auth_data: {
      test1: false,
      password: '',
      email: '',
      Password: 'password',
      Password2: 'password',
      visible: false,
      visible1: false,
  },
    }
  },
  methods: {
    auth() {
  if (this.auth_data.email<1) {this.auth_data.visible=true;}
  else if (this.auth_data.password<1) {this.auth_data.visible1=true}
  else {
        this.priv.FetchUser (this.auth_data.email, this.auth_data.password)
}       
 },
visi() {
  this.auth_data.Password = 'text'
      setTimeout(() => this.auth_data.Password = 'password', 2000);
     },
  
  },
}
</script>
<style scoped lang="scss">
 @import "@/assets/scss/style.scss";
 @import "@/assets/scss/input.scss";
 @import "@/assets/scss/button.scss";
 @import "@/assets/scss/font_family.scss";
 
.nu{
  position: absolute;
}
.nu p{
  color: rgb(221, 0, 0);
  font-family: 'Roboto_regular';
  font-size: 13px;
}
.data_entry{
    left: 130px;
    top: 240px;
  }
  .dis {
    opacity: 0;
  }
  .data_entry{
    position: absolute;
    height: 137px;
    width: 380px;
    left: 130px;
    top: 200px;
  }
  .create{
  position: absolute;
  top: 440px;
  height: 52px;
  width: 100px;
  left: 130px;
}
input:focus{
  border-bottom: solid 1px blue;
  transition-duration: 0.7s;
}
.analysis_em{
  position: absolute;
  top: 300;
  left: 300;
}
.activE{
  transition: 1s;
  opacity: 1;
}
input{
  font-size: 20px;
}
</style>

