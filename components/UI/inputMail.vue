<template>
    <div>
     <div class="in" :style="[{top: top+'px'},{left: left+'px'}, {width: width+'px'}]">
        <input :class="[{'error':error},{'update': update}, {'pW': true}]" @input="test1()" v-model= "link" type="text" :placeholder="placeholder">
        <img v-show="test&&analys" class="analys" src="@/assets/resourses/icons/analysis.png">
        <span v-if="error" class="un_data">{{ message?message:'Неккоректно введенные данные' }}</span>
    </div>
     
    </div>
</template>
<script>
export default{ 
    props:{
        top:{ 
            type: Number     //обязательно
        },
        left:{
            type: Number     //обязательно
        },
        width:{
            type: Number    //обязательно
        },
        placeholder:{
            type: String          
        }, 
        error:{ 
            type: Boolean   //если модель error в родителе true инпут краснеет     
        },
        update: {
            type: Boolean     //индикатор обновления значение 
        },
        start: {
            type: String     //начальное значение инпута
        },
        analys:{
            type: Boolean    //анимация сканирования на корректность почты
        },
        message:{
            type: String
        }
    },
    setup() {
    },
    data(){ 
        return{
    link: this.start,
    test: false
        }
    },
    mounted() {
     setTimeout(()=>{this.$emit('create', this.link)}, 300) 
    },
    methods:{
     test1() {
            this.$emit('create', this.link)
            if (this.link.length>=7) {
            this.test = true;
            setTimeout(()=>{this.test=false}, 150)
            }
     },
     
    }
}
</script>
<style scored lang="scss">
@import "@/assets/scss/input.scss";
@import "@/assets/scss/style.scss";
@import "@/assets/scss/font_family.scss";
.analys{
    top: 48%;
    left: 90%
}
span.un_data{
position: absolute;
font-size: 13px;
font-family: 'Roboto_regular';
color: red;
}
.pW{
    font-size: 17px;
}
.analys{
  position: absolute;
  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>