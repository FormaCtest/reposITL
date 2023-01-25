<template>
    <div>
        <div class="contayner_select" :style="[{top: top+'px'},{left: left+'px'}]">
            <div @click="statu"  class="select"><span for="checkbox">{{ts}}</span><input type="checkbox" class="checkbox" id="checkbox" v-model="st"><img src="@/assets/resourses/icons/ic.png"></div>
        <div v-if="st" class="select_POW">
            <div @click.prevent="gif" :class="[{'jk':fig}, {'p': true}]"><span>Администратор</span></div>         
            <div @click.prevent="gif1" :class="[{'jk':fig2}, {'p': true}]"><span>Пользователь</span></div>   
            <div @click.prevent="gif2" :class="[{'jk':fig3}, {'p': true}]"><span>Модератор</span></div>   
        </div>
        </div>
      
     
    </div>
</template>
<script>
export default {
    props:{
     top:{
        type: String
     },
     left:{
        type: String
     }
    },
    data() {
        return{
            fig: false,
            fig2: false,
            fig3: false,
            vis: false,
            st: false,
            ts: 'Администратор',
           
        }
    },
    methods:{
        sc(){
         
        },
         gif() {
        this.fig=true
        this.fig2=false
        this.fig3=false
        this.ts= 'Администратор'
        this.$emit('add_role', 'admin')
         },
         gif1() {
        this.fig=false
        this.fig2=true
        this.fig3=false
        this.ts= 'Пользователь'
        this.$emit('add_role', 'user')
         },
         gif2() {
        this.fig=false
        this.fig2=false
        this.fig3=true
        this.ts= 'Модератор'
        this.$emit('add_role', 'moderator')
         },
         statu() {
           this.vis=true;
         }
    }
}
</script>
<style scored lang="scss">
.contayner_select{
    position: absolute;
}
 .checkbox{
        position: absolute;
        left: 0%;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 3;
    }
div.jk {
    span{
        color:#1402b6;
    }
}
.p{
   
  width: 398px;
  height: 29px;
  margin: 0px;        //стили одной ячейки
  padding-left: 13px;
  padding-top: 0px;
  padding-bottom: 13px;
  transition: 0.2s;
  border-radius: 0px;
  cursor: pointer;
  &:hover{
    background-color: rgb(244, 248, 253);
  }
  span{
    position: absolute;
    line-height: 0px;         
    vertical-align: middle;
    line-height: 30px;
    left: 13px;
    font-family: "Roboto_regular";
    font-size: 20px;
    color: black;
    &:hover{
        color:#1402b6;
    }
  }
}
.select_POW{
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 0;
  padding: 0px;       //стили под блока для ячеек
  height: 100px;
  width: 410px;
//   left:470px;
  top: 40px;
  z-index: 2;
  background-color: white;
  box-shadow: 1px 1px 15px 4px rgb(241, 241, 241);
}
.select{
    font: inherit;
    position: absolute;
    margin: 0px;
    padding: 0px;
    // left: 470px;
    // top: 350px;
    padding-left:10px;
    width: 400px;
    height: 40px;
    border: none;
    border-bottom: solid 1px #D8D8D8;
    background-color: white;
    outline:none;
    cursor: pointer;
    span {
    font-family: "Roboto_regular";
    font-size: 20px;
    color: black;
    line-height: 40px;
}
    img{
        position: absolute;
        left: 380px;
        top: 15px;
    }
    &:hover{
        img {
            filter:brightness(0.8);
        }
    }
   
}



</style>