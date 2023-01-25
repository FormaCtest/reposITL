<template>
    <div>
        <div :style="[{top: top-20+'px'}, {left: left+'px'}]" class="trajectory_arw"><div  :style="[{left: left_arrw+'px'}]" class="arrw"></div></div>
        <div class="tags" :style="[{top: top+'px'}, {left: left+'px'}]">
                     <input class="click" type="text" readonly>
                     <input v-model="index_sort" class="search_input" type="text" placeholder="Введите название тега">
                     <div v-if="index_sort.trim()!=''" class="add_tags">Создать <span>{{ index_sort }}</span></div>
                     <div tabindex="0" v-for="list of sort_tags">
                        <div :class="[{'ni': true},{'actIve': false}]" @click="tp(list.id, list.name)">{{ list.name }}</div>
                        
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
    data(){
        return{
         list_tags: [],
         sort_tags: [],
         index_sort: ''
        }
    },
    methods:{
        async add_tags(){
            const url = new URL(
    "https://api.wiki.itl.systems/team/settings/tags/add"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "name": this.index_sort
};

const {data} = await useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
        },
      async import_tags(){
        const url = new URL(
    "https://api.wiki.itl.systems/team/settings/tags/find"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "query": this.index_sort
};

const {data} = await useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})

      }
    }
}
</script>
<style scored lang="scss">
@import "assets/scss/font_family.scss";
.trajectory_arw{
    position: absolute;
    width: 300px;
    height: 20px;
    z-index: 3;
}
.ni{
    width: 300px;
    
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
    .add_tags{
        font-family: 'Roboto_regular';
        cursor: pointer;
        color: rgb(24, 24, 24);
        font-size: 15px;
        span{
            font-family: 'Roboto_medium';
         color: black
        }
    }
.tags{
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 0px;
    padding: 20px;
    padding-left: 15px;
    padding-top: 47px;
    width: 300px;
    height: auto;
    z-index: 2;
    background-color: white;
    box-shadow: 0px 2px 10px 5px rgb(236, 236, 236);
    transition-delay: 0.1s;
   .search_input{
    position: absolute;
    outline:none;
    font-size: 14px;
    font-family: 'Roboto_regular';
    border: 0px;
    width: 300px;
    height: 40px;
    left: 0%;
    margin-left: 15px;
    top: 0px;
    z-index: 2;
    margin-bottom: 2px;
   
   }
    .click{
    position: fixed;
    top: 48px;;
    width: 300px;
    height: 40px;
    left: 90px;
    cursor: pointer;
    opacity: 0;
    pointer-events: auto;

}
}
</style>