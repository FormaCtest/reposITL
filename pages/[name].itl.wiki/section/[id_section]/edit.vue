<template>
    <div>
        
        <ErrorAdd v-show="error" :top="0" :alert="alert"/>
        <div :class="[{'heads': true},{'eRror':error}]">
            <ListSection @list="info" @click="vis_select=false;" v-show="vis_select" @selected="get_parent" :left="230" :left_arrw="20" :top="130"/>
            <div @click="vis_ch=vis_ch?false:true" class="chg"><img src="@/assets/resourses/icons/chain.png"><span>Поделиться</span></div>
            <SHaRM :type_entity="2" :id_entity="sect.current_section" v-show="vis_ch" :top="60" :left="500" :left_arrw="60"/>
            <div class="RR liz" @click="vis_select=vis_select?false:true;"><input type="text" :value="link_section" readonly></div>
            <ChangingAccess :del="true" @click="vis_ch=false" :type_entity="2" :id_entity="sect.current_section" :text="'Доступ'" :width_input="80" :width_img="14" :height_img="15" @For_whom="get_per" :left="5" :left_window="430" :left_arrw="5" :top= "18"/>
            <input class="HH" v-model="h_sec" type="text" placeholder="Заголовок раздела">
            <button @click="test_save" class="OP">Сохранить раздел</button>
            <button @click=" navigateTo('/'+teams.session_TeamCode+'.itl.wiki/')" class="OT">Отменить</button>
            <div @click="additional=additional?false:true" class="TTTR"><img  src="@/assets/resourses/icons/EL.png"></div>
            <div id="editorjs"></div>
            <div v-if="additional">
                <div class="era"></div>
            <div class="additionalOO"><div class="lik" @click="delet()" ><span>Удалить</span></div></div>
        </div>
        </div>
       
    </div>
</template>
<script>
import { useSectionStore } from '~~/stores/SectionStore';
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
import { useDataUserStore } from '~~/stores/UserData';
 definePageMeta ({
  middleware: ['auth', 'team'],
})
export default {
async mounted(){
    setTimeout(() => {
        this.import_data().then((t)=>{
   const options= {
    id: 'editorjs',
    data: {"time" : 1550476186479,
    "blocks" : [{"id": "save", "type": "paragraph", "data": {"text": t.value.data.section.content } }],
    "version" : "2.8.1"},
    tools: {},
}
this.editor = this.$editor(options)
})  
    }, 100);
},
setup(){
    const priv = useThePrivateStore()
    const teams = useTeamsStore()
    const user = useDataUserStore()
    const sect = useSectionStore()

return {priv, teams, user, sect}
},
data(){
    return{
    h_sec: this.sect.current_name,
    uSer: false,
    permission: false,
    parent: '',
    vis_select: false,
    link_section: 'Выберите раздел',
    error: false,
    block: false,
    alert: '',
    vis_ch: false,
    editor: null,
    additional: false,
    }
},


methods:{
    async import_data(){
        const url = new URL(
    "https://api.wiki.itl.systems/team/section/edit"
);

const params = {
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
return data
    },

    async delet(){
        const url = new URL(
    "https://api.wiki.itl.systems/team/section/delete"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "section_id": this.sect.current_section,
    "team_id": this.teams.session_TeamID
};
   const {data, error} = await useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
if(!data.value){
    switch (error.value.statusCode) {
    case 401: throw createError({ statusCode: 401, statusMessage: 'the session is over', fatal: true })
    break;
    case 500: throw createError({ statusCode: 500, statusMessage: 'invalid request', fatal: true })
    break;
    case 400: throw createError({ statusCode: 400, statusMessage: 'Запросу не хватает данных'})
    break;
    case 429: this.priv.Delete_token;
              throw createError({ statusCode: 400, statusMessage: 'Слишком много запросов', fatal: true})
              break;
}
}else{
    this.sect.close_sect()
    navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki') 
}
},
    get_per(act, id){
    this.uSer=id;
    this.permission=act
    },
    info(list){ 
     this.link_section=list
    },
    get_parent(id, name, block){
        if (block){
            this.block=true
        }
    this.parent=id
    if(typeof name ==='object'){
    for (let a = 0; a<=name.length; a++){
        if (a===0) {this.link_section=''; this.link_section+=name[a]}
        else {
            if(name[a]!==undefined) this.link_section+="/"+name[a];
        }
    }
    }else{this.link_section=name}
    },
     test_save(){
        if(this.h_sec!='') {
            if (!this.block) {
                this.editor.save().then((outputData) => {
   this.sect.Edit_section(this.permission, this.uSer, outputData, this.h_sec, this.parent)
}).catch((error) => {
 console.log('Ошибка сохранения EditorJS: ', error)
});
            }else{
                this.error=true;
            this.alert="Выбранный раздел не доступен";
            }
           
        }else {
            this.error=true;
            this.alert="Вы не ввели название!";
        }

}
}}


</script>
<style lang="scss" score>
@import "@/assets/scss/font_family.scss";
.ce-inline-tool--active{
    color: rgb(51, 51, 216);
}
#editorjs{
    position: relative;
    left: 0%;
    top: 200px;
    padding: 0px;
    width: 1120px;
    color: #383838;
    font-family: 'Roboto_regular';
    font-size: 14px;
}

.heads{
    position: relative;
    width: 80%;
    height: 180px;
    padding: 0px;
    margin: 0px;
    left: 0%;
    top: 0%;
}
.liz{
    position: relative;
    width: 120px;
    height: 20px;
    top: 100px;
    left: 230px;
}
.chg{
    cursor: pointer;
    width: 120px;
    font-family: 'Roboto_regular';
    color: rgb(75, 75, 75);
    font-size: 14px;;
    position: absolute;
    left: 140px;
    top: 23px; 
    img{
        position: relative;
        top: 4px;
        width: 18px;
        height: 18px;;
    }
    span{
        position: relative;
        left: 10px;
    }
}
.HH{
    position: absolute;
    left: 230px;
    top: 140px;
    padding: 0px;
    margin: 0px;
    outline:none;
    font-size: 24px;
    font-family: "Roboto_regular";
    border: 0px;
    background-color: white;
    color: black;
}
.RR{
    input{
        position: absolute;
    padding: 0px;
    width: 100%;
    margin: 0px;
    outline:none;
    font-size: 14px;
    font-family: "Roboto_regular";
    border: 0px;
    color: #6d6d6d;
    transition: 0.2s;
    background-color: white;
    cursor: pointer;
    &:hover{
        color: rgb(51, 51, 216);
    }
    }
   
}
.aces{
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 80px;
    left: 77px;
    top: 27px;
    transition: 0.3s;
    cursor: pointer;
        &:hover{
            span{
                transition: 0.3s;
            color: rgb(51, 51, 216);
            }
        }
    span{
        color:#383838;
        font-family: 'Roboto_regular';
        font-size: 14px;
        
    }
}
.tag{
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 60px;
    left: 150px;
    top: 25px;
    transition: 0.3s;
        &:hover{
            span{
                transition: 0.3s;
            color: rgb(51, 51, 216);
            }
        }
    span{
        cursor: pointer;
        color:#383838;
        font-family: 'Roboto_regular';
        font-size: 14px;
        
    }
    img{
        height: 15px;
    }
}
.OP{
    position: absolute;
    top: 17px;
    left: 1050px;
    border-radius: 2px;
    background-color: #0e65dd;
    color: white;
    font-size: 14px;
    font-family: 'Roboto_regular';
    cursor: pointer;
    width: 140px;
    height: 35px;
    border: 0px;
    margin: 0px;
    transition: 0.3s;
    padding: 0px;
    &:hover{
        background-color: #0d55b9;
    }
}
.OT{
    position: absolute;
    top: 17px;
    left: 1200px;
    border-radius: 2px;
    background-color: rgba(14,101,221,.04);
    color: #0b55bb;
    font-size: 14px;
    font-family: 'Roboto_regular';
    cursor: pointer;
    width: 90px;
    height: 35px;
    border: 0px;
    margin: 0px;
    transition: 0.3s;
    padding: 0px;
    &:hover{
        background-color: rgba(21, 94, 197, 0.11);
    }
}
.T{
    position: absolute;
    top: 25px;
    left: 1300px;
    cursor: pointer;
}
.eRror{
    position: absolute;
    top: 70px;
}
.TTTR{
    position: relative;
    top: 3px;
    left: 1305px;
    cursor: pointer;
    width: 50px;
}
.additionalOO{
    font-family: 'Roboto_regular';
    font-size: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 200px;
    top: -330px;
    left: 1150px;
    box-shadow: -2px 4px 7px 1px rgb(243, 243, 243);
    .lik{
        cursor: pointer;
        position: relative;
        background-color: rgb(255, 255, 255);
        height: 50px;
        text-align: center;
        line-height: 3.5;
        &:hover{
            background-color: aliceblue;
            color: blue;
        }
    }
}
.era{
    position: relative;
    top: -330px;
    left: 1305px;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-bottom: 10px solid rgb(255, 255, 255);
    z-index: 2;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
}
</style>