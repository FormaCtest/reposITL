<template>
    <div>
     <div class="in" :style="[{top: top+'px'},{left: left+'px'}, {width: width+'px'}]">
        <input :class="[{'error':error},{'update': update}]" @input="test1()" v-model= "link" type="text" :placeholder="placeholder"><img v-if="test" class = "analys" src="@/assets/resourses/icons/analysis.png">
        <span v-if="error" class="un_data">Неккоректно введенные данные</span>
    </div>
     
    </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
import { useDataUserStore } from '~~/stores/UserData';
export default{
    props:{
        top:{
            type: Number
        },
        left:{
            type: Number
        },
        width:{
            type: Number
        },
        placeholder:{
            type: String
        },
        error:{
            type: Boolean
        },
        update: {
            type: Boolean
        }
      
    },
    setup() {
     const priv = useThePrivateStore()
     const user = useDataUserStore()
     return {priv, user}
    },
    data(){ 
        return{
    link: this.user.userEmail,
    test: false
        }
    },
    mounted() {
     
     setTimeout(()=>{this.$emit('create', this.link)}, 300) 
    },
    methods:{
     test1() {
        if ((this.link).length>=7) {
            this.test = true
            setTimeout(()=>{this.test=false}, 150)
            this.$emit('create', this.link)
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
.analys{
  position: absolute;
  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>