<template>
    <div>
     <!-- <div @click="show_select()" :style="[{top: top+'px'},{width: width+'px'},{left: left+'px'}]" class="title_selected">{{ dataSelect[0] }}<img src="@/assets/resourses/icons/ic.png"></div>  Видимая часть списка -->
     <div class="bg">
     <div><input type="text" :style="[{top: top+'px'},{width: width+'px'},{left: left+'px'}]" class="title_selected" v-bind:value="dataSelect[0]" readonly ></div>
     <div class="show_selected" :style="[{top: top+30+'px'},{width: width+50+'px'},{left: left+'px'}]" v-for="list of dataSelect">
        <span @click="theChosenOne(this.dataSelect.indexOf(list))" :class="{'activeT': (chosen===this.dataSelect.indexOf(list))}">{{list}}</span>
                                          
    </div>
</div>
    </div>
</template>
<script>
export default{
    props:{
        top:{
            type: Number    //позиция по вертикали
        },
        width:{ 
            type: Number    //ширина выпадающего списка
        },
        left:{
            type: Number    // позиция по горизонтали
        },
        dataSelect:{ 
            type: Array      //элементы на выбор из выпадающего списка
        },
     
    },
    data(){
        return{
            show: false,
            chosen: 0
        }
    },
    methods:{
        theChosenOne(id) {
         this.chosen=id
         this.$emit('chosen', this.chosen)
        }
    }
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/font_family.scss";
.bg:not(:hover){
.show_selected{
    pointer-events: none;  //разрешается взаимодействие пользователя с инпутом
}
}
.bg:focus-within{
.show_selected{
    opacity: 1;
    pointer-events: auto;  //разрешается взаимодействие пользователя с инпутом
}
}
.activeT{
    color: #1402b6;
}
.title_selected{
    cursor: pointer;
    font-family: 'Roboto_regular';
    font-size: 16px;
    position: absolute;
    color: rgb(53, 53, 53);
    background-color: white;
    border: 0px;
    border-bottom: 1px solid rgb(218, 218, 218);
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    outline:none;  //отсутвие линии выделения инпута
    justify-content: space-between;
    background: url("@/assets/resourses/icons/ic.png") no-repeat 95% 40%;
    &:focus{
        border-bottom: 1px solid rgb(218, 218, 218);
    }
}
    .show_selected{
        position: absolute;
        background-color:rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding-bottom: 20px;
        padding-top: 20px;
        padding-left: 10px;
        padding-right: 10px;
        font-family: 'Roboto_regular';
        box-shadow: 1px 1px 10px 1px rgb(214, 214, 214);
        color: rgb(53, 53, 53);
        opacity: 0;
       
    }
</style>