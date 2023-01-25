<template>
    <div>
        <div @click="CL()" class="div_s"><button class="bt_s">{{ text }}</button></div>
    </div>
</template>
<script>
export default{
    props:{
        text:{
            type: String
        }
    },
    data(){
        return{
        click: false
        }
    },
    methods:{
        CL() {
          this.click=true
          this.$emit('click_button', this.click)
          setTimeout(()=>{this.click=false}, 100)
        }
    }
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/font_family.scss";
.div_s{
position: absolute;
left: 430px;
top: 200px;
};
.bt_s{
    width: 250px;
    height: 50px;
    background-color: rgb(1, 1, 1, 0);
    border: 1px solid #6199e7;
    border-radius: 1px;
    color: #0b55bb;
    font-family: 'Roboto_regular';
    font-size: 15px;
    cursor: pointer;
    &:hover{
    background-color: blue;
    color: white;
    transition: 0.5s;
    }
} 
</style>