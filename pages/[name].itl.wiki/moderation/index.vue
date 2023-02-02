<template>
    <div>
       <div class="ni_uat">
        <span class="hhD">Требуют модерации</span>
        <p v-if="list_items.length===0">Пусто</p>
        <div v-if="list_items.length>0" class="ib" v-for="list of list_items">  
            <img class="ffal" src="@/assets/resourses/icons/fold_full.png">
            <div class="poi"> 
              <div class="nim">
                <div @click="article.use_article(list.name, list.id); sect.vie_sect(list.section_id, list.section_name); navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/moderation/'+list.id)" class="ikor">
                  {{ list.name }}
                </div>
            </div>
            <div class="liuy">
              Автор:&nbsp;<span>ХХХ</span>&nbsp;
              Добавлено:&nbsp;<span>{{ edit_date(list.created_at)  }}</span>
            </div>
            </div>
            <div @click="sect.vie_sect(list.section_id, list.section_name); navigateTo('/'+teams.session_TeamCode+'.itl.wiki/'+'section/'+list.section_id)" class="set_modi">
              <img src="@/assets/resourses/icons/folder-max.png">
              <span>{{list.section_name}}</span>
            </div>
          </div>
       </div> 
    </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
import { useArticleStore } from '~~/stores/ArticleStore';
import { useSectionStore } from '~~/stores/SectionStore';
definePageMeta ({
  layout: "company",
  middleware: ['auth', 'team'],
})
export default{
    setup(){
        const teams = useTeamsStore();
        const sect = useSectionStore();
        const article = useArticleStore();
        const priv = useThePrivateStore()
        return {teams, sect, article, priv}
    },
    data(){
        return{
            list_items: [],
            mass_sec: false,
            article_data: [],
            good: false
        }
    },
    mounted(){
        setTimeout(()=>{this.info_items()}, 500) 
        // this.test_info()
    },
    methods:{
        async info_items(){
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

const {data} = await useFetch(url, {
    method: "GET",
    headers,
});
for (var a = 0; a<=data.value.data.length-1; a++){
  this.list_items.push(data.value.data[a].items)
}
this.list_items=this.list_items.flat()
for (var p = 0; p<=this.list_items.length-1; p++){
  this.list_items[p].section_name=(data.value.data.filter((el)=>el.items.some((pl)=>pl.id===this.list_items[p].id)))[0].name
  
}
this.list_items=this.list_items.filter((el)=>el.status_id===2)
        },
        edit_date(date){
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
@import "assets/scss/font_family.scss";
.ni_uat{
    position: absolute;
    left: 430px;
    top: 45px;
    font-family: 'Roboto_regular';
    p{
        font-size: 15px;
        line-height: 2;
    }
}
.hhD{
  font-family: 'Roboto_regular';
  font-size: 19px;
  color: rgb(37, 37, 37);
}
.set_modi{
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-wrap: nowrap;
  left: -15px;
  top: 2px;
  font-family: 'Roboto_regular';
  white-space: nowrap;
  font-size: 13px;
  color: rgb(51, 51, 51);
  img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    opacity: 0.5;
  }
  span{
    position: relative;
  }
}
.ib{
    position: relative;
    display: flex;
    margin: 0px;
    padding: 7px;
    padding-bottom: 10px;
    padding-top: 5px; 
    padding-left: 10px;
    width: 900px;
    height: 37px;
    left: -13px;
    top: 20px;
    &:hover{
      background-color: rgb(241, 246, 250);
    }
    img.ffal{
      margin-top: 4px;
      margin-left: 4px;
      margin-right: 30px;
    }
    img.fold{
      margin-right: 20px;
      width: 38px;
      height: 38px;
    }
    .ikor{
      min-width: 150px;
    }
    .poi{
      width: 800px;
      padding-top: 7px;
      &:not(:hover){
        .setur{
          opacity: 0;
        }
        .edits{
          opacity: 0;
        }
      }
      .nim{
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        font-size: 15px;
        height: 20px;;
        color: blue;
        cursor: pointer;
        max-width: 500px;
      }
      .liuy{
        display: flex;
        flex-wrap: nowrap;
        font-size: 11px;
        color: gray;

        span{
          color: rgb(77, 77, 77);
        }
      }
    }
  }
  .status{
    position: relative;
    left: 15px;
    top: 0px;
    text-align: center;
    font-family: 'Roboto_regular';
    color: rgb(48, 48, 48);
    font-size: 12px;
    padding-left: 7px;
    padding-right: 7px;
    height: 20px;
    background-color: aliceblue;
  }
  .edits{
   
    position: relative;
   display: flex;
   flex-wrap: nowrap;
   font-size: 14px;
   font-family: 'Roboto_regular';
   color: rgb(71, 71, 71);
   left: 570px;
   top: -27px;
   cursor: pointer;
   max-width: 80px;
   img{
    position: relative;
    left: -10px;
    width: 20px;
   }
  }
</style>