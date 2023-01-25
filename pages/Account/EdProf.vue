<template>
    <div>
      <div class="container">
        <User_window />
        <div class="bY"><a href="#">Профиль</a> / <a href="#"> Редактирование</a></div> 
        <div class="my_data">Личные данные </div>
        <div>
        <div :class="[{'in': true}, {'name_input': true}]"><input @input="this.error=false" :class="[{'error': error}, {'update': update}]" :style="[{width: '475px'},{top: '100'}]" v-model="name" type="text" placeholder="Имя" ></div>
        <div :class="[{'in': true}, {'subname_input': true}]"><input @input="this.error=false" :class="[{'error': error}, {'update': update}]" :style="[{width: '475px'},{top: '176'}]" v-model="subname" placeholder="Фамилия" ></div>
        <link_input :update="update" :error="error" @create="savEm" :top="250" :left="410" :width= "475" :placeholder="'email'"/>
        <button class="button" :style="{width: '200px'}"><span class="create_text" @click="save_name()" >Сохранить настройки</span></button>
        </div>
        <div class="my_data" :style="{top: '535px'}">Безопасность</div>
        <div class="in " :style="{top: '540px'}"><input @input="Reload()" :class="[{'error': un_ps}, {'update': update}]" v-model="old_password" :style="{width: '475px'}" type="password" placeholder="Текущий пароль"></div>
        <div class="in " :style="{top: '616px'}"><input @input="Reload()" :class="[{'error': un_ps}, {'update': update}]" v-model="new_password" :style="{width: '475px'}" type="password" placeholder="Новый пароль"></div>
        <div class="in " :style="{top: '692px'}"><input @input="Reload()" :class="[{'error': un_ps}, {'update': update}]" v-model="double_password" :style="{width: '475px'}" type="password" placeholder="Повторите пароль">
          <span  class="double_text" v-if="error_double">Пароли не совпадают</span>
          <span  class="double_text" v-if="error_length">Минимальная длина 6 символов</span>
          <span  class="double_text" v-if="server_error">{{alert_error}}</span>
        </div>
        <button class="button" :style="[{width: '200px'},{top: '860px'}]"><span class="create_text"  @click="save_password()">Сохранить настройки</span></button>
        <!--Загрузка фото-->
        <div class="img_loading">
         
          <img :src="url_img">
          <p>Используйте изображение размером не менее 256 на 256 пикселей в формате .jpg или .png</p>
        </div>
      
      </div>
        <label class="rows" for="row" :style="{cursor: 'pointer'}">Загрузить фото</label>
      <!-- <input @change="DOW()" v-show="false" type="file" id="row" ref="file" accept=".png, .jpeg, .jpg"> -->
      <form id="addPhoto">
      <input @change="save_img($event)" v-show="false" type="file" id="row" ref="file" accept=".png, .jpeg, .jpg">
      </form>
    </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
import { useDataUserStore } from '~~/stores/UserData';
definePageMeta({
  layout: 'user',
  middleware: ['auth']
})
export default {
  setup() {
 const priv = useThePrivateStore()
 const user = useDataUserStore()
    return {priv, user}
}, 
created(){
this.user.TakingData()
this.info_user()
},
  data() {
    return{
      name: this.user.userName,
      subname: this.user.userSubname,
      email: '',
      password: '',
      old_password: '',
      double_password: '',
      new_password: '',
      error: false,
      un_ps: false,
      error_double: false,
      error_length: false,
      alert_error: '',
      server_error: false,
      UserData: '',
      update: false,
      url_img: false
    }
  },
  methods:{
    async info_user(){
      const url = new URL(
    "https://api.wiki.itl.systems/account"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

await useFetch(url, {
    method: "GET",
    headers,
}).then((r)=>{
  const url = new URL(
    "https://api.wiki.itl.systems/editor/fetch/url"
);
var params ={
  "url": "https://api.wiki.itl.systems/assets/img/user.jpg"
}
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));
const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Accept": "application/json",
};


useFetch(url, {
    method: "GET",
    headers,
})
})


    },
    save_name() {
     if (this.name===''||this.subname===''||this.email==='') {
      this.error=true
     }else if(((this.email).search(/[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}/igm))===-1) {
       this.error=true
     }else{
      const url = new URL(
    "https://api.wiki.itl.systems/account/common/edit"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "first_name": this.name,
    "last_name": this.subname,
    "email": this.email
};

useFetch(url, {
    method: "POST",
    headers,
    body: JSON
    .stringify(body),
})

this.update=true
setTimeout(()=>{this.update=false}, 500)
     }
    },
    async save_img(event) {
      const IMG = new FormData()
      IMG.append('image', event.target.files[0])
      const url = new URL(
    "https://api.wiki.itl.systems/account/picture/change"
);
const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Accept": "application/json",
};
useFetch(url, {
    method: "POST",
    headers,
    body: IMG
})

    },
    Reload(){
     this.un_ps=false
     this.error_double=false
     this.error_length=false
     this.server_error=false
    },
    async EditPassword() {
    const url = new URL(
      "https://api.wiki.itl.systems/account/password/change"
  );
  
  const headers = {
      "Authorization": "Bearer "+this.priv.token,
      "Content-Type": "application/json",
      "Accept": "application/json",
  };
  
  let body = {
      "password": this.old_password,
      "new_password": this.new_password
  };
  
  const df =  await useFetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
  })
   if(df.error.value!==null){   
    const err = (df.error._rawValue.message).substring(0, 3)
    switch(err) {
      case '400' :
        this.un_ps=true;
        this.server_error=true;
        this.alert_error='введен неверный пароль';
        this.old_password='';
        this.double_password='';
        this.new_password='';
        break;
      case '401' :
      this.un_ps=true;
        this.server_error=true;
        this.alert_error='сессия завершена, перезайдите';
        this.old_password='';
        this.double_password='';
        this.new_password='';
        break;  
    }
   }else {
    this.old_password='';
    this.double_password='';
    this.new_password='';
    this.update=true
    setTimeout(()=>{this.update=false}, 500)
  }
  },
    savEm(link){
     this.email=link
     this.error=false
    },
    async save_password(){
       if(this.new_password!==this.double_password) {
        this.un_ps=true
        this.error_double=true
        this.old_password=''
        this.double_password=''
        this.new_password=''
       }else if(this.new_password.length<=5||this.double_password.length<=5){
        this.un_ps=true
        this.error_length=true
        this.old_password=''
        this.double_password=''
        this.new_password=''
       }
       else {
       this.EditPassword()
       }
       },
    
  }}

</script>
<style scored lang="scss">
@import "@/assets/scss/font_family.scss";
.double_text{
  position: absolute;
  font-family: 'Roboto_regular';
  font-size: 13px,;
  color: red;
}
.container{
  height: 1000px;
}
.rows{
  position: absolute;
   color: rgb(0, 0, 202);
   font-size: 15px;
   font-family: 'Roboto_regular';
   top: 220px;
   left: 1100px;
   cursor: pointer;
   &:hover{
    color: rgb(0, 0, 168);
   }
}
.img_loading{
  position: absolute;
  display: flex;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  border: 0px;
  width:300px;
  height: 230px;
  left: 1000px;
  top: 90px;
  img{
    width:100px;
    height: 100px;
  }
  span{
    position: absolute;
   color: rgb(0, 0, 202);
   font-size: 15px;
   font-family: 'Roboto_regular';
   top: 130px;
   cursor: pointer;
   &:hover{
    color: rgb(0, 0, 168);
   }
  }
  p{
    position: absolute;
    text-align: center;
    top: 155px;
    font-family: 'Roboto_regular';
    color:#969696;
    font-size: 11px;
    padding: 0px 50px 0px 50px;

  }
}
.button{
  left: 410px;
  top: 420px;
}
.in{
  left: 410px;
  
  
  input{
    font-size: 16px;
  }
}
.name_input{
position: absolute;
top: 100px;
}
.subname_input{
  position: absolute;
  top: 176px;
}
.email_input{
  position: absolute;
  top: 255px;
}
@import "@/assets/scss/font_family.scss";
@import "@/assets/scss/input.scss";
@import "@/assets/scss/button.scss";
.my_data{
    position: absolute;
  font-size: 20px;
  font-family: 'Roboto_regular';
  left: 410px;
  top: 95px;
  width: 200px;
  color: rgb(49, 49, 49);
}
.bY{
  position: absolute;
  width: 200px;
  font-family: "Roboto_regular";
  font-size: 13px;
  color: #999999;
  top: 50px;
  left: 410px;
}
.bY a{
  color: #999999;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>