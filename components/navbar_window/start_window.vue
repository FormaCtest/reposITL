<template>
    <div>
        <div class="curtain">
           
             <span>Ваша компания</span>
              <nav class="points">
                  <div class="v" @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki')"><img src="@/assets/resourses/icons/compass.png"><p>Активность</p></div>
                  <div class="v" @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/my_works')"><img src="@/assets/resourses/icons/file-alt.png"><p>Ваши работы</p></div>
                  <div class="v" @click="navigateTo('/Account/Bookmarks')"><img src="@/assets/resourses/icons/bookmark.png"><p>Закладки</p></div>
                  <div v-if="teams.role==='moderator'||teams.role==='owner'||teams.role==='admin'" class="v" @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/moderation')"><img src="@/assets/resourses/icons/glasses.png"><p>На модерации</p></div>
                </nav>
                    <div :class="[{'h':(teams.role==='moderator'||teams.role==='owner'||teams.role==='admin')}, {'h2': !(teams.role==='moderator'||teams.role==='owner'||teams.role==='admin')}]"><span class="nurs">мои разделы</span></div>
                <div :class="[{'raz': true},{'mod':(teams.role==='moderator'||teams.role==='owner'||teams.role==='admin')}, {'no_mod':!(teams.role==='moderator'||teams.role==='owner'||teams.role==='admin') }]" >
                    <div class="section" v-for="list of list_section">
                        <div @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/'+list.id); sect.vie_sect(list.id, list.name)" class="section"><img src="@/assets/resourses/icons/folder.png"><p>{{ list.name }}</p></div>
                    </div>
    
                </div>
            
                
          </div>
    </div>
</template>
<script>
import { useSectionStore } from "~~/stores/SectionStore"
import {useVisFunStore} from "@/stores/NavbarStore"
import { useTeamsStore } from "~~/stores/Teams"
import { useThePrivateStore } from "~~/stores/private"
import { useDataUserStore } from "~~/stores/UserData"
export default {
    data(){
    return{
        list_section: []
    }    
    },
setup(){
const sect = useSectionStore()
const fun = useVisFunStore()
const teams = useTeamsStore()
const priv = useThePrivateStore()
const user = useDataUserStore()
return{fun, teams, priv, user, sect}
    },
    mounted(){  //сканирует доступ разделов и создает массив, доступный для показа пользователю с настоящей сессией 
      setTimeout(()=>{this.info_article()}, 100) 
    },
    methods:{
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
});
        }
    }
    
}
</script>
<style lang="scss" scored>
@import "assets/scss/font_family.scss";
.nurs{
        position: relative;
        top: 0%;
    }
.raz{
    position: relative;
    padding: 0%;
    margin: 0%;
    padding-left: 45px;
    width: 265px;
    height: 400px;
    display: flex;
    flex-direction: column;
    .nurs{
        position: relative;
        top: 0%;
    }
    .section{
    display: flex;
    flex-wrap: nowrap;
    font-family: 'Roboto_regular';
    color: rgb(26, 26, 26);
    font-size: 14px;
    width: 235px;

    height: 40px;
    &:hover{
        background-color: rgb(221, 233, 250);
        color: rgb(59, 59, 250);
        cursor: pointer;
        img{
            filter: brightness(85%)
        }
    }
    img{
        margin-top: 9px;
        margin-left: 10px;
        margin-right: 15px;
        width: 20px;
        height: 17px;
    }
    p{
        left: 50px;
        line-height: 12px;
    }  
    }
}
.mod{
    position: relative;
    top:  340px;
}
.no_mod{
    position: relative;
    top:300px;
    
}
.flex{
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
}
.h{
    position: relative;
    top: 250px;
    left: 0px;
    width: 250px;
    z-index: 3;
    .nurs{
        font-size: 19px;
    font-family: 'Roboto_light';
    }
    
}
.h2{
    position: relative;
    top: 210px;
    left: 0px;
    width: 250px;
    z-index: 3;
    .nurs{
        font-size: 19px;
    font-family: 'Roboto_light';
    }
    
}
.points{
    position: relative;
    display: flex;
    flex-direction: column;
    // left: 40px;
    margin: 0%;
    padding: 0%;
    
}

.curtain{
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: rgb(238,244,252);
    width: 300px;
    height: 100%;
    z-index: 4;
    left:80px;
    top: 0%;
    overflow-x: hidden;
    span{
        // position: absolute;
        left: 50px;
        top: 40px;
        font-family: 'Roboto_regular';
        color: rgb(26, 26, 26);
        font-size: 20px;
    }
    .nurs{
    font-size: 19px;
    font-family: 'Roboto_light';
}
}
.v{
    font-family: 'Roboto_regular';
    color: rgb(26, 26, 26);
    font-size: 14px;
    width: 240px;
    height: 40px;
    &:hover{
        background-color: rgb(221, 233, 250);
        color: rgb(59, 59, 250);
        cursor: pointer;
        img{
            filter: brightness(85%)
        }
    }
    img{
        margin-top: 9px;
        margin-left: 10px;
    }
    p{
        left: 50px;
        line-height: 12px;
    }
}
.my_raz{
    top: 300px;
}
.but{
    position: relative;
}
</style>