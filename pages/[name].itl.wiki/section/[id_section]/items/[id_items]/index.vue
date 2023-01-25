<template>
  <div>
    <div v-if="article_data.info_public">
      <SectionWindow/>
    <div @click="otchai=otchai?false:true" class="otchai"><img src="@/assets/resourses/icons/chain.png"></div>
    <div @click="navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/section/'+this.sect.current_section+'/items/'+this.article.article_id+'/edit')" class="pencil"><img src="@/assets/resourses/icons/pencil.png"></div>
    <ChangingAccess @For_whom="edit_role" :type_entity="2" :id_entity="article.article_id" @click="otchai=false" :left="1200" :top="42"/>
    <!-- <button class="ctbut" @click="delete_perm">Удалить</button> -->
    <SHaRM v-if="otchai" :left="1300" :top="90" :left_arrw="385" :type_entity="1" :id_entity="this.article.article_id"/>
      <div class="hhiLLu">{{article_data.info_public.article.section.name+'/'+article_data.info_public.article.name}}</div>  
      <div class="huyt">{{ article_data.info_public.article.name }}</div>
      <div class="description">
        <div class="postDes">
          Автор:&nbsp;<div class="meaning">{{ article_data.info_public.article.creator.fullname }}</div>&nbsp;
        </div>
        <div class="postDes">
          &nbsp;Обновлено:&nbsp; <div class="meaning">{{ import_data(article_data.info_public.article.updated_at)  }}</div>
        </div> 
      </div>
    </div>
    <div id="editorjss" v-show="article_data.info_public">
      <div v-if="editor_obj.blocks">
        <span>{{ editor_obj }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useSectionStore } from '~~/stores/SectionStore';
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
import { useArticleStore } from '~~/stores/ArticleStore';
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
layout: "company",
middleware: ['auth', 'team'],
})
export default{
setup(){
  const sect = useSectionStore()
  const priv = useThePrivateStore()
  const teams = useTeamsStore()
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
    readOnly: true,
    holder: 'editorjss', 
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
  return{sect, priv, teams, article, editor}
},
created(){
  setTimeout(()=>{this.info_article()}, 500);

},
data(){
  return{
  article_data: [],
  editor_obj: {},
  otchai: false
  }
},
methods:{
 
  async delete_perm(){
    const url = new URL(
    "https://api.wiki.itl.systems/team/abilities/delete"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "entity_type": "article",
    "entity_id": this.article.article_id,
    "user_id": 147
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
  },
  async edit_role(type, userID){
    const url = new URL(
    "https://api.wiki.itl.systems/team/abilities/edit"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "entity_type": 'article',
    "entity_id": this.article.article_id,
    "permission": type
};
if (typeof(userID)==='object'){
  for (let a =0; a<=userID.length-1; a++){
    body.user_id=userID[a].id
    useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
  }
}else{
  body.user_id=userID
useFetch(url, {
    method: "POST",
   headers,
   body: JSON.stringify(body),
 })
}

  },
  save(){
  this.editor.save().then((data)=>{
   this.editor_obj.blocks=data.blocks
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
  import_data(date){
      var month = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
      let dateXXX= new Date(date)
       var dateXXX_text= dateXXX.getDate()+' '+month[dateXXX.getMonth()]+" "+
      dateXXX.toTimeString().slice(0, 5)
                                 
      return (dateXXX_text)

  }
}
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/font_family.scss";
.ctbut{
  position: absolute;
  top: 70px;
  left: 800px;
}
#editorjss{
  font-family: 'Roboto_regular';
  font-size: 14px;
  position: relative;
  width: 900px;
  left: 400px;
  top: 100px;
  .cdx-block{
  position: relative;
  left: -90px;
}
}

.hhiLLu{
position: relative;
left: 420px;
top: -20px;
font-size: 13px;
max-width: 500px;
color: gray;
font-family: 'Roboto_regular';
cursor: pointer;
&:hover{
  text-decoration: underline;
}
}
.inside{
position: relative;
display: flex;
flex-direction: column;
left: 410px;
top: 230px;
margin: 0px;
padding: 0px;
width: 880px;
font-family: 'Roboto_regular';
.items_block{
  display: flex;
  margin: 0px;
  padding: 7px;
  padding-bottom: 10px;
  padding-top: 5px; 
  padding-left: 10px;
  width: 100%;
  height: 37px;
  &:hover{
    background-color: rgb(241, 246, 250);
  }
  img.file{
    margin-top: 4px;
    margin-left: 4px;
    margin-right: 30px;
  }
  img.fold{
    margin-right: 20px;
    width: 38px;
    height: 38px;
  }
  .no{
    padding-top: 7px;
    .nm{
      font-size: 15px;
      color: blue;
      cursor: pointer;
    }
    .ob{
      display: flex;
      flex-wrap: nowrap;
      font-size: 13px;
      color: gray;

      span{
        color: rgb(77, 77, 77);
      }
    }
  }
}
}
.meaning{
color:rgb(65, 65, 65);
}
.huyt{
position: relative;
left: 420px;
top: 20px;
font-size: 23px;
max-width: 800px;
font-family: 'Roboto_regular';
}
.postDes{
display: flex;
}
.description{
display: flex;
flex-wrap: nowrap;
position: relative;
left: 420px;
top: 30px;
font-size: 13px;
color: gray;
font-family: 'Roboto_regular';
}
.otchai{
&:hover{
  background-color: aliceblue;
}
cursor: pointer;
border-radius: 2px;
position: relative;
left: 1270px;
top: 35px;
width: 35px;
height: 35px;
img{
  margin-left: 8px;
  margin-top: 8px;
}
}
.pencil{
&:hover{
  background-color: aliceblue;
}
cursor: pointer;
border-radius: 2px;
position: relative;
width: 35px;
height: 35px;
left: 1180px;
top: 0px;
img{
  width: 20px;
height: 20px;
margin-left: 8px;
  margin-top: 8px;
}
}
.section_content{
position: relative;
width: 900px;
top: 200px;
left: 413px;
font-family: 'Roboto_regular';
pointer-events: none;
p{
  word-break: break-all;
}
}
</style>