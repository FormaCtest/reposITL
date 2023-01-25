<template>
    <div>
        <ErrorAdd v-show="errory" :top="0" :alert="alert"/>
        <div :class="[{'hid': true},{'errory': errory}]">
            <SHaRM v-if="vis_sh" @check="pub" :top="50" :left="500" :left_arrw="40"/>
            <ListSection v-if="vis_list" @selected="get_parent" :top="140" :left="230" />
            <input @click="vis_list=vis_list?false:true; tggg=false; vis_sh=false" class="r" type="text" :value="link_section" readonly>
            <input maxlength="25" v-model="h_name" class="HJ" type="text" placeholder="Заголовок статьи">
            <ChangingAccess @click=" vis_sh=false; tggg=false; vis_list=false" :width_input="80" :width_img="15" :height_img="16" :left_arrw="15" :left_window="420" @For_whom="save_act"  :type_entity="2" :id_entity="article.article_id" :left="0" :top="8" :text="'доступ'" />
            <div @click="tggg=tggg?false:true; vis_list=false; vis_sh=false" class="tggg"><img src="@/assets/resourses/icons/tag.png"><span>Теги</span></div>
            <ListTags v-if="tggg" :top="70" :left="190" :left_arrw="105" />
            <button @click="test_save(3)" class="oppo">Опубликовать</button>
            <button @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/')" class="ot">Отменить</button>
            <div @click="additional=additional?false:true" class="TTTR"><img  src="@/assets/resourses/icons/EL.png"></div>
            <div @click="vis_sh=vis_sh?false:true; tggg=false; vis_list=false;" class="kay"><img src="@/assets/resourses/icons/chain.png"><span>Поделиться</span></div>
            <div id="editorjSj"></div>
            <div v-if="additional">
                <div class="era"></div>
            <div class="additional"><div class="lik" @click=" test_save(2)"><span>Сохранить черновик</span></div></div>
            <div class="additionalOO"><div class="lik" @click="unart()" ><span>Удалить</span></div></div>
        </div>
            </div>
    </div>
</template>
<script>
import { useSectionStore } from '~~/stores/SectionStore';
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
import { useDataUserStore } from '~~/stores/UserData';
import {useArticleStore} from '~~/stores/ArticleStore';
 import EditorJs from '@editorjs/editorjs'
 import Header from '@editorjs/header'; 
 import List from '@editorjs/list';
 import ImageTool from '@editorjs/image';
 import Table from '@editorjs/table';
 import Quote from '@editorjs/quote';
 import CodeTool from '@editorjs/code';
 import Delimiter from '@editorjs/delimiter';
 import RawTool from '@editorjs/raw';
 import Warning from '@editorjs/warning';
 import Checklist from '@editorjs/checklist';
 definePageMeta ({
  middleware: ['auth', 'team'],
})
export default {

setup(){
    const sect = useSectionStore()
    const priv = useThePrivateStore()
    const teams = useTeamsStore()
    const user = useDataUserStore()
    const article = useArticleStore()
const  editor = new EditorJs({
    tools: { 
    header: {
      class: Header, 
      inlineToolbar: ['link'],
    }, 
    list: { 
      class: List, 
      inlineToolbar: true 
    },
    image: {
        class: ImageTool
    },
    quote: {
        class: Quote
    },
    code: {
        class: CodeTool
    },
    delimiter: {
        class: Delimiter
    },
    raw: {
        class: RawTool
    },
    table: {
         class: Table
    },
    warning: {
        class: Warning
    },
    checklist: {
        class: Checklist
    },
},
    holder: 'editorjSj', 
    onReady: ()=>{
        import_edit()
   
},
onChange:() =>{
    
}
})
async function import_edit(){
        const url = new URL(
          "https://api.wiki.itl.systems/team/article/edit"
);

const params = {
    "team_id": teams.session_TeamID,
    "article_id": article.article_id
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));
 
const headers = {
    "Authorization": "Bearer "+priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};


await useFetch(url, {
    method: "GET",
    headers,
}).then(r=>decode_edit(r.data.value.data.article.tabs))
    }
    function decode_edit(data){   //декодирует для вывода
  var ready_made_content = []
  //разделитель свойств первого уровня: /&23948
    //разделитель свойств второго уровня /&22903
    //разделитель значений: /&92834
    var one_lvl = '/&23948'
    var two_lvl = '/&22903'
    var split_text = '/&92834' 
    for (let i = 0; i<=data.length-1; i++){
        switch (data[i].type) {     
        case 'paragraph' :
        ready_made_content.push( { "id": data[i].id, "type": "paragraph", "data": { "text": data[i].content } } )
        break;
        case 'header' : 
        var c=data[i].content.split(one_lvl)
        var text = c[0]
        var lvl = c[1]
        ready_made_content.push( { "id": data[i].id, "type": "header", "data": { "text": text, "level": lvl } })
        break;
        case 'list' : 
        var c1=data[i].content.split(one_lvl)
        var style = c1[0]
        var items = c1[1].split(split_text)
        ready_made_content.push( { "id": data[i].id, "type": "list", "data": { "style": style, "items": items } } )   
        break;
        case 'quote' :
        var c2=data[i].content.split(one_lvl)
        var text2 = c2[0]
        var caption = c2[1]
        var alignment = c2[2] 
        ready_made_content.push( { "id": data[i].id, "type": "quote", "data": { "text": text2, "caption": caption, "alignment": alignment } } )    
        break;
        case 'code' :
        ready_made_content.push( { "id": data[i].id, "type": "code", "data": { "code": data[i].content } } )
        break;
        case 'delimiter':
        ready_made_content.push(  { "id": data[i].id, "type": "delimiter", "data": {} })
        break;
        case 'raw':
        ready_made_content.push( { "id": data[i].id, "type": "raw", "data": { "html": data[i].content } } )
        break;
        case 'table':   
        var c3 = data[i].content.split(one_lvl) 
        var line = c3[1].split(two_lvl)
        for (let y = 0; y<=line.length-1; y++){
          line[y]=line[y].split(split_text)
        }
        ready_made_content.push( { "id": data[i].id, "type": "table", "data": { "withHeadings": c3[0], "content": line } } )
        break;
        case 'warning':
          var c4 = data[i].content.split(one_lvl)
        ready_made_content.push( { "id": data[i].id, "type": "warning", "data": { "title": c4[0], "message": c4[1] } } )
        break;
        case 'checklist':     
          var c5 = data[i].content.split(one_lvl)
          var lins = []
          for (let k = 0; k<=c5.length-1; k++){
            let c5_l = c5[k].split(split_text)
            lins.push({"text":c5_l[0], "checked": c5_l[1]})

          }
        ready_made_content.push( { "id": data[i].id, "type": "checklist", "data": { "items": lins } })
        break;
    } 
    }
    editor.blocks.render({"time" : 1550476186479,
    "blocks" : ready_made_content,
    "version" : "2.8.1"})
}
return {editor, priv, teams, user, sect, article}
},
created(){
   setTimeout(()=>{this.info_article().then(()=>{this.h_name= this.article_data.info_public.article.name;
    this.link_section=this.article_data.info_public.article.section.name;
    this.parent=this.article_data.info_public.article.section.id
    })}, 500) 
},
data(){
    return{
    tggg: false,
    errory: false,
    alert: '',
    h_name: '',
    link_section: '',
    vis_list: false,
    parent: '',
    act: [],
    check_pub: false,
    vis_sh: false,
    additional: false,
    article_data: [],
    }
},
methods:{
    async unart(){
        const url = new URL(
    "https://api.wiki.itl.systems/team/article/delete"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};
let body = {
    "article_id": this.article.article_id,
    "team_id": this.teams.session_TeamID
};

useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(()=>{
    this.article.exit_article();
    window.location.href='/'+this.teams.session_TeamCode+'.itl.wiki'
})

    },
    async info_article() {
    const url = new URL(
    "https://api.wiki.itl.systems/team/article/edit"
);
const url2 = new URL(
    "https://api.wiki.itl.systems/team/article"
);
const params = {
  "team_id" : this.teams.session_TeamID,
  "article_id": this.article.article_id
}
Object.keys(params)
    .forEach(key => {url.searchParams.append(key, params[key]); 
                     url2.searchParams.append(key, params[key])});
const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const {data: data1} = await useFetch(url, {
    method: "GET",
    headers,
})
const {data: data2} = await useFetch(url2, {
    method: "GET",
    headers,
})
this.article_data={info_edit: data1.value.data, info_public: data2.value.data}
    },
    pub(check){
    this.check_pub=check
    },
    save_act(act, userID){
    if (typeof(userID)!=='object'){
        this.act = [{'user_id':userID, 'permission': act}]
    }else {
    for (let a = 0; a<=userID.length-1; a++){
        this.act.push({'user_id':userID[a].id, 'permission': act})
    }
}
    },
    get_parent(id, name){
    this.parent=id
    if(typeof name ==='object'){
    for (let a = 0; a<=name.length-1; a++){
        if (a===0) {this.link_section=''; this.link_section+=name[a]}
        else {
            if(name[a]!==undefined) this.link_section+="/"+name[a];
        }
    } 
    }else{this.link_section=name}
    },
    //разделитель свойств первого уровня: /&23948
    //разделитель свойств второго уровня /&22903
    //разделитель значений: /&92834

    add_content_blocks(data){     //кодирует контент содержания, параметры: блок, выводит блок для запроса
    var ready_made_content = data
    for (let i = 0; i<=ready_made_content.length-1; i++){
        switch (ready_made_content[i].type) {     
            case 'paragraph' :
            ready_made_content[i].name=ready_made_content[i].type+"_"+i
            ready_made_content[i].content=ready_made_content[i].data.text
            if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        break;
        case 'header' : 
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
            ready_made_content[i].name=ready_made_content[i].type+"_"+i
            ready_made_content[i].content=ready_made_content[i].data.text+'/&23948'+ready_made_content[i].data.level 
            
        break;
        case 'list' : 
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
            ready_made_content[i].name=ready_made_content[i].type+"_"+i
            ready_made_content[i].content=ready_made_content[i].data.style+'/&23948'+ready_made_content[i].data.items.join('/&92834') 
        break;
        case 'quote' :
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
            ready_made_content[i].name=ready_made_content[i].type+"_"+i
            ready_made_content[i].content= ready_made_content[i].data.text+'/&23948'+ready_made_content[i].data.caption+'/&23948'+ready_made_content[i].data.alignment
        break;
        case 'code' :
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        ready_made_content[i].name=ready_made_content[i].type+"_"+i
        ready_made_content[i].content=ready_made_content[i].data.code
        break;
        case 'delimiter':
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        ready_made_content[i].name=ready_made_content[i].type+"_"+i  
        break;
        case 'raw':
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        ready_made_content[i].name=ready_made_content[i].type+"_"+i
        ready_made_content[i].content=ready_made_content[i].data.html
        break;
        case 'table':   
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        ready_made_content[i].name=ready_made_content[i].type+"_"+i
        var split_lines = ''
        for (let o = 0; o<=ready_made_content[i].data.content.length-1; o++){
        split_lines+=ready_made_content[i].data.content[o].join('/&92834')
        if (ready_made_content[i].data.content.length-2>=o) {
            split_lines+='/&22903'
        }
        }
        ready_made_content[i].content=ready_made_content[i].data.withHeadings+'/&23948'+split_lines
        break;
        case 'warning':
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        ready_made_content[i].name=ready_made_content[i].type+"_"+i
        ready_made_content[i].content=ready_made_content[i].data.title+'/&23948'+ready_made_content[i].data.message 
        break;
        case 'checklist':     
        if (typeof(ready_made_content[i].id)!=='number'){
            delete ready_made_content[i].id
            }
        ready_made_content[i].name=ready_made_content[i].type+"_"+i
        var split_lines = ''
        for (let p = 0; p<=ready_made_content[i].data.items.length-1; p++){
            split_lines+=ready_made_content[i].data.items[p].text+'/&92834'+ready_made_content[i].data.items[p].checked
            if (ready_made_content[i].data.items.length-2>=p) {
            split_lines+='/&23948'
        }
        }
        ready_made_content[i].content=split_lines
        break;
    } 
    }
    return (ready_made_content)
    },
    async test_save(type){
        if (this.h_name!==''&&this.parent!=''){
            this.editor.save().then((outputData) => {
    if (outputData.blocks.length===0){
        this.errory=true
        this.alert='содержание статьи обязательна'
    }
    var edit_for = this.add_content_blocks(outputData.blocks)
    const url = new URL(
    "https://api.wiki.itl.systems/team/article/edit"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};
let body = {
    "team_id": this.teams.session_TeamID,
    "article_id": this.article.article_id,
    "section_id": this.parent,
    "action": type,
    "name": this.h_name,
    "tabs": {...edit_for},     
};
if (this.act){
    body.abilities= {...this.act}
}
useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then((r)=>{ if(type===3){
    this.article.use_article(this.h_name, this.article.article_id)

if (this.check_pub){
    const url = new URL(
    "https://api.wiki.itl.systems/team/article/mode"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "article_id": this.article.article_id,
    "public": 1
};

useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
});
}  
navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/section/'+this.sect.current_section+'/items/'+this.article.article_id)  
}else{
    if (r.error.value===null)
    navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/')
}
   
})

}).catch((error) => {
 console.log('Ошибка сохранения: ', error)
});
        }else{
            this.alert='название/путь/содержание статьи обязательны'
            this.errory=true
        }

}
}
}

</script>
<style scored lang="scss" >
@import "@/assets/scss/font_family.scss";
.ce-inline-tool--active{
    color: rgb(51, 51, 216);
}
.cdx-block{
    position: relative;
    left: -10px;
}
#editorjSj{
    position: relative;
    left: 0%;
    top: 100px;
    padding: 0px;
    width: 1120px;
    height: 80%;
    color: #383838;
    font-family: 'Roboto_regular';
    font-size: 14px;
}
.kay{
    width: 120px;
    cursor: pointer;
    position: relative;
    font-family: 'Roboto_regular';
    color: rgb(56, 56, 56);
    font-size: 14px;
    top: -83px;
    left: 150px;
    img{
        width: 18px;
        height: 18px;
    }
    span{
        position: relative;
        left: 12px;
        top: -2px;
    }
}
.era{
    position: relative;
    top: -200px;
    left: 1300px;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
    border-bottom: 10px solid white;
    z-index: 2;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
}
.additional{
    font-family: 'Roboto_regular';
    font-size: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 200px;
    top: -200px;
    left: 1150px;
    box-shadow: 2px 2px 10px 2px rgb(221, 221, 221);
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
.additionalOO{
    font-family: 'Roboto_regular';
    font-size: 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 200px;
    top: -200px;
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
.hid{
    position: relative;
    width: 100%;
    height: 180px;
    padding: 0px;
    margin: 0px;
    left: 0%;
    top: 0%;
}
.HJ{
    position: relative;
    left: -120px;
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
.r{
    position: relative;
    left: 230px;
    top: 90px;
    padding: 0px;
    margin: 0px;
    width: 350px;
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

.tggg{
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 60px;
    left: 300px;
    top: -10px;
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
.oppo{
    position: relative;
    top: -30px;
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
.ot{
    position: relative;
    top: -30px;
    left: 1080px;
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
.TTTR{
    position: relative;
    top: -60px;
    left: 1300px;
    cursor: pointer;
    width: 50px;
}
.errory{
    top: 20px
}
</style>