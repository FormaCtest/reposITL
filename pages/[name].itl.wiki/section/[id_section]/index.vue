<template>
    <div >
      <div> 
        <SectionWindow/>
      <div v-if="mass_sec.section">
        <div v-if="teams.role!=='user'||mass_sec.canShare" @click="chain=chain?false:true" class="chain"><img src="@/assets/resourses/icons/chain.png"></div>
      <div v-if="teams.role!=='user'||mass_sec.canEdit" @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/'+sect.current_section+'/edit')" class="iopn"><img src="@/assets/resourses/icons/pencil.png"></div>
      <ChangingAccess v-if="teams.role!=='user'||mass_sec.section.created_by==user.userId" :type_entity="2" :id_entity="sect.current_section" @click="chain=false" @For_whom="edit_section" :left="1200" :top="42"/>
      </div>
      <SHaRM v-if="chain" :left="1300" :top="90" :left_arrw="385" :type_entity="2" :id_entity="this.sect.current_section"/>
        <div class="hhtii">{{ link_sect }}</div>
        <div class="tyurie3">{{ sect.current_name }}</div>
        <div class="decf5">
          <div class="ert83">
            Автор:&nbsp;<div class="yu89">{{ fullname }}</div>&nbsp;
          </div>
          <div class="ert83">
            &nbsp;Обновлено:&nbsp; <div class="yu89">{{ dateXXX }}</div>
          </div> 
        </div>
        <div v-if="content_section&&content_section!=='.'" class="sect_cov" >
         <p>{{ content_section }}</p>   
         <!-- <div id="editorjs"></div> -->
        </div>      
        <div class="ioko0">  
          <div class="block_it" v-for="list of list_section">
            <img class="fold" src="@/assets/resourses/icons/folder-max.png">    <!--Раздел-->
            <div class="no">  <!--блок названия и описания-->
              <div @click="tp(list.id, list.name)" class="nm">
              {{ list.name }}
            </div>
            <div class="ob">
              Обновлено:&nbsp;<span >{{ import_date(list.updated_at) }}</span>
            </div>
            </div>
          </div>
          <div @click="article.use_article(list.name, list.id); navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/section/'+this.sect.current_section+'/items/'+list.id)" class="block_it" v-for="list of list_items">      <!--Статья-->
            <img class="file" src="@/assets/resourses/icons/fold_full.png">
            <div class="no">  <!--блок названия и описания-->
              <div class="nm">
              {{ list.name }}
            </div>
            <div class="ob">
              Обновлено:&nbsp;<span>{{ import_date(list.updated_at) }}</span>
            </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { useSectionStore } from '~~/stores/SectionStore';
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
import { useArticleStore } from '~~/stores/ArticleStore';
import { useDataUserStore } from '~~/stores/UserData';
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
    const user = useDataUserStore()
    var block_2 = ''
    async function give_data () {
      const url = new URL(
    "https://api.wiki.itl.systems/team/section/edit"
);
    const url2 = new URL(
      "https://api.wiki.itl.systems/team/section"
    );

const params = {
    "team_id": teams.session_TeamID,
    "section_id": sect.current_section,
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));
    Object.keys(params)
    .forEach(key => url2.searchParams.append(key, params[key]));

const headers = {
    "Authorization": "Bearer "+priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};
var w = 0
if (this.teams.role!=='user'){
  w = await useFetch(url, {
    method: "GET",
    headers,
})
}
 

const z = await useFetch(url2, {
    method: "GET",
    headers,
})

return ([w, z])    //w не доступна, доступ ограничивает предрегистрационные данные
}
  
    return{sect, priv, teams, block_2, give_data, article, user}
  },
  mounted(){
    setTimeout(()=>{this.info_items()}, 100);
    setTimeout(()=>{this.give_data().then(r=>{
      this.analyse_the_path(r[1])
      if (this.teams.role!=='user') {
      this.content_section=r[0].data._rawValue.data.section.content
    //   var blockI = []
    //   if (this.content_section.length>80) {
    //    var count = Math.round(this.content_section.length/80)
    //    for (let c = 0; c<=count; c++){
    //     blockI.push({"id": "save"+c, "type": "paragraph", "data": {"text": this.content_section.substring(c<=0?0:((c-1)*160), (c*160)) } })
    //    }
    //    const options = {
    //     id: 'editorjs',
    //      view: true,
    //      data: {"time" : 1550476186479,
    // "blocks" : blockI,
    // "version" : "2.8.1"
    //   },
      
    // }
    // this.editor=this.$editor(options)
    //   }else{
    //     const options = {
    //     id: 'editorjs',
    //      view: true,
    //      data: {"time" : 1550476186479,
    // "blocks" : [{"id": "save", "type": "paragraph", "data": {"text": this.content_section } }],
    // "version" : "2.8.1"
    //   },
      
    // }
    // this.editor=this.$editor(options)
      // }
      
    // var re = /&nbsp;/gi;
      // if (this.content_section.indexOf('&nbsp;')!==-1) {
      //   var newstr = this.content_section.replace(re, ' ');
      //   this.content_section = newstr
      // }
    }})}, 200)
    this.info_pr()
    this.add_p() 
  },
  data(){  
    return{
     mass_sec: {},
     fullname: '',
     dateXXX: '',
     list_items: [],
     list_section: [] ,
     content_section: '',
     link_sect: '',
     chain: false,
     done: false,
     editor: false

    }
  },
  methods:{
    async add_p(){
      const url = new URL(
    "https://api.wiki.itl.systems/team/abilities"
);

const params = {
    "team_id": this.teams.session_TeamID,
    "entity_id": this.sect.current_section,
    "entity_type": "section",
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

})
    },
    async info_pr(){
      const url = new URL(
    "https://api.wiki.itl.systems/team/employees/get"
);
let params = {
    "team_id": this.teams.session_TeamID,
    "employee_id": this.user.userId,
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
 
})
    },
    analyse_the_path(w){
      if(w.data._rawValue.data.section.level===1) {
        this.link_sect=this.sect.current_name
      }
      else {
      for (let a = 0; a<=w.data._rawValue.data.section.breadcrumbs.length-1; a++){
        if (a===0) this.link_sect+=w.data._rawValue.data.section.breadcrumbs[0].name 
        else  this.link_sect+="/"+w.data._rawValue.data.section.breadcrumbs[a].name
      }
      
      }
     
    },
    edit_section(type_action, userID){
    this.sect.Edit_score(type_action, userID, 'section')
    },
    tp(id, name){
            this.sect.close_sect()
         this.sect.vie_sect(id, name)
         navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/section/'+id) 
        },
    import_date(date){
      var month = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
      let dateXXX= new Date(date)
      dateXXX= dateXXX.getDay()+' '+month[dateXXX.getMonth()]+" "+
      dateXXX.getHours()+":"+dateXXX.getMinutes()
      return dateXXX
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

const w = await useFetch(url, {
    method: "GET",
    headers,
})
this.mass_sec=w.data._rawValue.data
for (var p = 0; p<=this.mass_sec.section.items.length-1; p++){
    if (this.mass_sec.section.items[p].status_id===3){
        this.list_items.push(this.mass_sec.section.items[p])
    }
}
this.list_section = this.mass_sec.section.child
this.sect.vie_sect(this.mass_sec.section.id, this.mass_sec.section.name)
this.fullname=this.mass_sec.section.creator.fullname
var month = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
this.dateXXX= new Date(this.mass_sec.section.updated_at)
this.dateXXX= this.dateXXX.getDate()+' '+month[this.dateXXX.getMonth()]+" "+
this.dateXXX.getHours()+":"+this.dateXXX.getMinutes() 

        },
     
  }
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/font_family.scss";
.hhtii{
  position: absolute;
  left: 420px;
  top: 60px;
  font-size: 13px;
  color: gray;
  font-family: 'Roboto_regular';
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
}
.ioko0{
  position: relative;
  display: flex;
  flex-direction: column;
  left: 410px;
  top: 160px;
  margin: 0px;
  padding: 0px;
  width: 880px;
  font-family: 'Roboto_regular';
  .block_it{
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
.yu89{
  color:rgb(65, 65, 65);
}
.tyurie3{
  position: relative;
  left: 410px;
  top: 100px;
  max-width: 800px;
  font-size: 23px;
  font-family: 'Roboto_regular';
}
.ert83{
  display: flex;
}
.decf5{
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  left: 420px;
  top: 160px;
  font-size: 13px;
  color: gray;
  font-family: 'Roboto_regular';
}
.chain{
  &:hover{
    background-color: aliceblue;
  }
  cursor: pointer;
  border-radius: 2px;
  position: absolute;
  left: 1285px;
  top: 42px;
  width: 35px;
  height: 35px;
  img{
    margin-left: 8px;
    margin-top: 8px;
  }
}
.iopn{
  &:hover{
    background-color: aliceblue;
  }
  cursor: pointer;
  border-radius: 2px;
  position: absolute;
  width: 35px;
  height: 35px;
  left: 1180px;
  top: 43px;
  img{
    width: 20px;
  height: 20px;
  margin-left: 8px;
    margin-top: 8px;
  }
}
.sect_cov{
  position: relative;
  width: 500px;
  top: 160px;
  left: 413px;
  font-family: 'Roboto_regular';
  pointer-events: none;
  p{
    word-break: break-all;
  }
  #editorjs{
    position: absolute;
    top: 0px;
    left: -30px;
    width: 800px;
    border: 1px solid black;
    max-height: 400px;
    
    .cdx-block{
      position: relative;
      left: -49px;
    }
  }
}

</style>