<template>
    <div>
        <ErrorAdd v-show="error" :top="0" :alert="alert"/>
        <div :class="[{'heads': true},{'eRror':error}]">
            <ListSection v-if="vis_select" @selected="get_parent" :left="230" :left_arrw="20" :top="130"/>
            <input class="RR" type="text" :value="link_section" @click="vis_select=vis_select?false:true" readonly>
            <ChangingAccess :type_entity="2" :id_entity="sect.current_section" :text="'Доступ'" :width_input="80" :width_img="14" :height_img="15" @For_whom="get_per" :left="5" :left_window="430" :left_arrw="5" :top= "18"/>
           <div><input class="HH" v-model="h_sec" type="text" placeholder="Заголовок статьи"></div>
            <button @click="test_save" class="OP">Создать раздел</button>
            <button @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/'+sect.current_section)" class="OT">Отменить</button>
            <button :style="{top: '100px'}" @click="delet()" class="OT">Удалить</button>
            <div id="editorjs"></div>
        </div>
       
    </div>
</template>
<script>
import { useSectionStore } from '~~/stores/SectionStore';
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
import { useDataUserStore } from '~~/stores/UserData';
 import EditorJs from '@editorjs/editorjs'
//  import Header from '@editorjs/header'; 
//  import List from '@editorjs/list';
//  import ImageTool from '@editorjs/image';
//  import Table from '@editorjs/table';
//  import Quote from '@editorjs/quote';
//  import CodeTool from '@editorjs/code';
//  import Delimiter from '@editorjs/delimiter';
//  import RawTool from '@editorjs/raw';
//  import Warning from '@editorjs/warning';
//  import Checklist from '@editorjs/checklist';
 definePageMeta ({
  middleware: ['auth', 'team'],
})
export default {

setup(){
    const priv = useThePrivateStore()
    const teams = useTeamsStore()
    const user = useDataUserStore()
    const sect = useSectionStore()
const  editor = new EditorJs({
    tools: { 
    // header: {
    //   class: Header, 
    //   inlineToolbar: ['link'],
    // }, 
    // list: { 
    //   class: List, 
    //   inlineToolbar: true 
    // },
    // image: {
    //     class: ImageTool
    // },
    // quote: {
    //     class: Quote
    // },
    // code: {
    //     class: CodeTool
    // },
    // delimiter: {
    //     class: Delimiter
    // },
    // raw: {
    //     class: RawTool
    // },
    // table: {
    //      class: Table
    // },
    // warning: {
    //     class: Warning
    // },
    // checklist: {
    //     class: Checklist
    // },
},
    holder: 'editorjs', 
})

return {editor, priv, teams, user, sect}
},
data(){
    return{
    h_sec: '',
    uSer: '',
    permission: '',
    parent: '',
    vis_select: false,
    link_section: 'Выберите раздел',
    error: false,
    block: false,
    alert: ''
    }
},
methods:{
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
    "section_id": this.parent,
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
}
},
    get_per(act, id){
    this.uSer=id;
    this.permission=act
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

   this.sect.Add_section(this.permission, this.uSer, outputData, this.h_sec, this.parent)
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
    position: absolute;
    left: 230px;
    top: 100px;
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
    left: 1065px;
    border-radius: 2px;
    background-color: #0e65dd;
    color: white;
    font-size: 14px;
    font-family: 'Roboto_regular';
    cursor: pointer;
    width: 125px;
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
</style>