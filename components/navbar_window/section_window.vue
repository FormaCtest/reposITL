<template>
    <div>
        <div class="curtain">
            <div class="search2">
                <div tabindex="1" class="current_section">
                    <img src="@/assets/resourses/icons/folder.png">
                    <span class="names">{{ sect.current_name.length>=14?sect.current_name.substring(0, 17)+'...': sect.current_name}}</span>
                    <img class="angle" src="@/assets/resourses/icons/angle_down.png">  
                </div>
                
                <div class="sect">
                     <input class="click" type="text" readonly>
                     <input v-model="index_sort" @input="SEARCH" class="search_input" type="text" placeholder="Введите название раздела">
                     <div tabindex="0" v-for="list of sort_section">
                        <div :class="[{'ni': true},{'actIve': sect.current_section===list.id}]" @click="tp(list.id, list.name)">{{ list.name.length>=24?list.name.substring(0, 21)+"...":list.name }}</div>
                        <div v-if="list.children.length>=1" tabindex="0" v-for="list2 of list.children">
                        <div :class="[{'ni': true},{'actIve': sect.current_section===list2.id}]" @click="tp(list2.id, list2.name)">-{{ list2.name.length>=24?list2.name.substring(0, 21)+"...":list2.name }}</div>
                        <div v-if="list2.children.length>=1" tabindex="0" v-for="list3 of list2.children">
                        <div :class="[{'ni': true},{'actIve': sect.current_section===list3.id}]" @click="tp(list3.id, list3.name)">--{{ list3.name.length>=24?list3.name.substring(0, 21)+"...":list3.name }}</div>
                </div>
                </div> 
                </div>
            </div> 
            <div :class="[{'razd': true}]" >
                <div class="sec" v-for="list of list_child">
                        <div @click="tp(list.id, list.name)" class="sec">
                            <img src="@/assets/resourses/icons/folder.png">
                          <p>{{ list.name.length>=24?list.name.substring(0, 21)+"...":list.name }}</p>
                    </div>
                </div>
                <div class="items">
            <div class="stat">СТАТЬИ</div>
          <div class="list_items">
            <div @click="article.use_article(list.name, list.id); navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/section/'+this.sect.current_section+'/items/'+list.id)" :class="[{'ittt':true}, {'it_active': article.article_id===list.id}]" v-for="list of list_items">
                &#9679; &nbsp;{{ ' '+list.name.length>=24?list.name.substring(0, 21)+"...":list.name}} 
            </div>
          </div>
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
import { useArticleStore } from "~~/stores/ArticleStore"
export default {
setup(){
const fun = useVisFunStore()
const sect = useSectionStore()
const priv = useThePrivateStore()
const teams = useTeamsStore()
const article = useArticleStore()

return{fun, sect, priv, teams, article}
    },
    mounted(){
        setTimeout(()=>{this.info_items().then(()=>this.info_article())}, 1000) 
        
    },
    
    data(){
        return{
            list_section: [],
            list_items: [],
            sort_section: [],
            index_sort: '',
            list_child: [],   //лист подразделов текущего раздела
            list_child2: [], //лист все разделов level2
            level_section: [],
            mass_child: [] //массив, подразделов второго уровня
        }
    },
    methods:{
        
        tp(id, name){
            if (id!=this.sect.current_section) {
                this.sect.vie_sect(id, name)
         navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/section/'+id)
            }
           
        },
        SEARCH(){
         if (this.index_sort===''){
            this.sort_section=this.list_section
         }else {
            this.sort_section=this.list_section.filter(item=>item.name===this.index_sort)
         }   
         
        },
        async info_child2000(id_mass){  //получаем объект детей второго уровня, нужно сделать массив детей 3 уровня
            
        

        },
        async info_items(){
            const url = new URL(
    "https://api.wiki.itl.systems/team/section"
);
const params = {
    "team_id": this.teams.session_TeamID,
    "section_id": this.sect.current_section
}
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));
const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const {data, error} = await useFetch(url, {
    method: "GET",
    headers,
})
this.list_child=data.value.data.section.child
this.level_section=data.value.data.section.level
for (var p = 0; p<=data.value.data.section.items.length-1; p++){
    if (data.value.data.section.items[p].status_id===3){
        this.list_items.push(data.value.data.section.items[p])
    }
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


await useFetch(url, {
    method: "GET",
    headers,
}).then((outputData) => {
   
    this.list_section=outputData.data._rawValue.data
    if (this.level_section===1) {
    for (let i = 0; i<=this.list_section.length-1; i++) {
        if(this.list_section[i].id===this.sect.current_section) {
         [this.list_section[0], this.list_section[i]] = [this.list_section[i], this.list_section[0]];
         this.sort_section=this.list_section;
         break;
        }
        
    }
}else this.sort_section=this.list_section;
    for (let a =0; a <=this.list_section.length-1; a++){
        this.list_child2.push(this.list_section[a].children)
    }
    this.list_child2=this.list_child2.flat()
});
        }
    }
}
</script>
<style scored lang="scss">
@import "assets/scss/font_family.scss";
.razd{
    position: absolute;
    padding: 0%;
    cursor: auto;
    margin: 0%;
    width: 255px;
    top: 60px;
    display: flex;
    flex-direction: column;
    left: 0%;
    .text{

        position: absolute;
        top: 0%;
    }
    .sec{
        
    display: flex;
    flex-wrap: nowrap;
    font-family: 'Roboto_regular';
    color: rgb(26, 26, 26);
    font-size: 14px;
    width: 248px;
    height: 40px;
    padding-left: 10px;
    img{
        margin-top: 11px;
        position: static;
        top: 11px;
        width: 22px;
        height: 17px;
    }
    &:hover{
        background-color: rgb(221, 233, 250);
        color: rgb(59, 59, 250);
        cursor: pointer;
        img{
            filter: brightness(85%)
        }
    }
   
    p{
        padding-left: 20px;
        line-height: 16px;
    }  
    }
}
.items{
    margin-top: 40px;
    width: 300px;
    height: 50px;
    top: 175px;
    .stat{
    margin-left: 19px;
    left: 40px;
    font-size: 14px;
    font-family: 'Roboto_regular';
}
    .list_items{
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        width: 300px;
    }
    .ittt{
        width: 245px;
        height: 15px;
        font-size: 14px;
        font-family: 'Roboto_regular';
        padding-left: 20px;
        margin-left: 0px;
        padding-bottom: 12px;
        padding-top: 12px;
        color: #383838;
        cursor: pointer;
        &:hover{
            background-color: rgb(228, 242, 255);
            color: #0b55bb;
        }
       
    }
    .it_active{
            background-color: rgb(228, 242, 255);
            color: #0b55bb;
            
}
}

.child_if{
    position: relative;
    left: -7px;
    display: flex;
    flex-direction: column;
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
.ni{
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
.actIve{
    background-color: rgb(238,244,252);
    color: #0b55bb;
}
.sect{
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 0px;
    padding: 20px;
    padding-left: 15px;
    padding-top: 47px;
    width: 223px;
    height: auto;
    z-index: 2;
    background-color: white;
    box-shadow: 0px 12px 10px 5px rgb(224, 224, 224);
    top: 50px;
    transition-delay: 0.1s;
    left: 0px;
    opacity: 0;

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
    background-color: white;
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
&:not(:focus-within) {
    pointer-events: none;
}
    &:focus-within{
        opacity: 1;
        pointer-events: auto;
        .ni{
            pointer-events: auto;
        }
        .search_input{
            pointer-events: auto;
        }
    }
}
.current_section{
    width: 218px;
    height: 10px;
    position: absolute;
    margin: 0px;
    padding: 20px;
    border: 1px solid #e0dbf3;
}
.search2{
    position: absolute;
    left: 20px;
    top: 45px;
    border-radius: 2px;
    cursor: pointer;
    &:focus-within{
        .current_section{
        background-color: white;
        box-shadow: 0px 0px 10px 0px rgb(207, 207, 207); 
        }
    }
    .current_section:hover{
        background-color: white;
        box-shadow: 0px 0px 10px 0px rgb(207, 207, 207);
    }
    .click:hover{
        .current_section{
        background-color: white;
        box-shadow: 0px 0px 10px 0px rgb(207, 207, 207);
    }  
    }
    img{
        position: absolute;
        top: 14px;
    }
    .names{
        position: absolute;
        top: 30%;
        font-size: 15px;
        font-family: 'Roboto_regular';
        color: #383838;
        margin-left: 10px;
    }
    .angle{
         position: absolute;
         top: 22px;
         left: 230px;
    }
}
.curtain{
    position: fixed;
    background-color: rgb(238,244,252);
    width: 300px;
    height: 100%;
    z-index: 4;
    left:80px;
    top: 0%;
}

</style>