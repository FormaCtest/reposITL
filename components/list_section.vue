<template>
    <div>
        <div :style="[{top: top-20+'px'}, {left: left+'px'}]" class="trajectory_arw"><div  :style="[{left: left_arrw+'px'}]" class="arrw"></div></div>
        <div class="secD" :style="[{top: top+'px'}, {left: left+'px'}]">
                     <input tabindex="1" class="click" type="text" readonly>
                     <input tabindex="1" v-model="index_sort" @input="SEARCH" class="search_input" type="text" placeholder="Введите название раздела">
                     <div tabindex="1" v-for="list of sort_section">
                        <div :class="[{'NU': true},{'actIve': sect.current_section===list.id}]" @click="tp(list.id, list.name)">{{ list.name.length>=24?list.name.substring(0, 21)+"...":list.name }}</div>
                        <div v-if="list.children.length>=1" tabindex="1" v-for="list2 of list.children">
                        <div :class="[{'NU': true},{'actIve': sect.current_section===list2.id}]" @click="tp(list2.id, [list.name, list2.name])">-{{ list2.name.length>=24?list2.name.substring(0, 21)+"...":list2.name }}</div>
                        <div v-if="list2.children.length>=1" tabindex="1" v-for="list3 of list2.children">
                        <div :class="[{'NU': true},{'actIve': sect.current_section===list3.id}]" @click="tp(list3.id, [list.name, list2.name, list3.name], true)">--{{ list3.name.length>=24?list3.name.substring(0, 21)+"...":list3.name }}</div>
                </div>
                </div>
                </div>
            </div> 
    </div>
</template>
<script>
import { useSectionStore } from "~~/stores/SectionStore"
import {useVisFunStore} from "@/stores/NavbarStore"
import { useThePrivateStore } from "~~/stores/private"
import { useTeamsStore } from "~~/stores/Teams"
export default {
    props:{
top:{
    type: Number//
},                         //общее окно
left:{
    type: Number        //
},
left_arrw:{
    type: Number     //декоративная стрелка?откуда ты вызвал меня?
}
    },
setup(){
const fun = useVisFunStore()
const sect = useSectionStore()
const priv = useThePrivateStore()
const teams = useTeamsStore()

return{fun, sect, priv, teams}
    },
    mounted(){
        this.info_article()
    },
    beforeUpdate(){
        
        
    },
    data(){
        return{
            list_section: [],
            list_items: [],
            sort_section: [],
            index_sort: '',
            list_child: [],
            level_section: [],
            TH: {}
        }
    },
    methods:{
        async importThe(){
            const url = new URL(
    "https://api.wiki.itl.systems/team/section"
);
let params = {
    "team_id": this.teams.session_TeamID,
    "section_id": this.sect.current_section
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};



const {data} = await useFetch(url, {
    method: "GET",
    headers,
})
this.TH=data.value.data
        },
        tp(id, name, block){
            this.$emit('selected', id, name, block)
        },
        SEARCH(){
         if (this.index_sort===''){
            this.sort_section=this.list_section
         }else {
            this.sort_section=this.list_section.filter(item=>item.name===this.index_sort)
         }   
         
        },
        async info_article() {
            const url = new URL(
    "https://api.wiki.itl.systems/team/section/sections"
);

const params = {
    "team_id": this.teams.session_TeamID,
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};


useFetch(url, {
    method: "GET",
    headers,
}).then((outputData) => {
    
    this.list_section=outputData.data._rawValue.data
    this.sort_section=this.list_section;
    
});
        }
    }
}
</script>
<style scored lang="scss">
@import "assets/scss/font_family.scss";
.trajectory_arw{
    position: absolute;
    width: 256px;
    height: 20px;
    z-index: 3;
}
.NU{
    width: 215px;
    
    margin: 0px;
    padding: 7px;
    z-index: 2;
    font-size: 14px;
    font-family: 'Roboto_regular';
    cursor: pointer;
    background-color: white;
    color: rgb(36, 36, 36);
    &:hover{
        background-color: rgb(238,244,252);
        color: #0b55bb;
    }
}
.arrw{
        position: relative;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-bottom: 10px solid rgb(255, 255, 255);
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        
        
    }
.secD{
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 0px;
    padding: 20px;
    padding-left: 15px;
    padding-top: 47px;
    width: 223px;
    height: auto;
    z-index: 5;
    background-color: white;
    box-shadow: 0px 2px 10px 5px rgb(236, 236, 236);
    transition-delay: 0.1s;
   .search_input{
    position: absolute;
    outline:none;
    font-size: 14px;
    font-family: 'Roboto_regular';
    border: 0px;
    width: 220px;
    height: 40px;
    left: 0%;
    margin-left: 15px;
    top: 0px;
    z-index: 2;
    border-bottom: 1px solid #e0dbf3;
    margin-bottom: 2px;
   
   }
    .click{
    position: fixed;
    top: 48px;;
    width: 250px;
    height: 40px;
    left: 90px;
    cursor: pointer;
    opacity: 0;
    pointer-events: auto;

}
}
</style>