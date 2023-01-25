<template>
    <div>
       <div v-if="good" class="no_work">
        <span >Мои работы</span>
        <p v-if="!list_items">Похоже, вы еще не создали ни одной записи</p>
        <div v-if="list_items" class="items_block" v-for="list of list_items">  
            <img class="file" src="@/assets/resourses/icons/fold_full.png">
            <div class="no"> 
              <div class="nm">
                <div @click="article.use_article(list.name, list.id); navigateTo('/'+this.teams.session_TeamCode+'.itl.wiki/my_works/'+list.id)" class="ik">
                  {{ list.name }}
                </div>
              <div v-if="list.status_id<3" class="status">
                {{ list.status_id===1?'черновик':'на модерации' }}
            </div>
            </div>
            <div class="ob">
              Добавлено:&nbsp;<span>{{ edit_date(list.created_at)  }}</span>
            </div>
            <div @click="article.use_article(list.name, list.id); navigateTo('/'+teams.session_TeamCode+'.itl.wiki/my_works/'+list.id+'/edit')" class="edits">
              <img src="@/assets/resourses/icons/pencil.png">
            Правка
            </div>
            <div class="setur">
              <ChangingAccess :type_entity="'article'" :id_entity="list.id" @For_whom="edit_pr" :left="700" :top="8" text="У всех" />
            </div>
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
import { useDataUserStore } from '~~/stores/UserData';
definePageMeta ({
  layout: "company",
  middleware: ['auth', 'team'],
})
export default{
    setup(){
        const teams = useTeamsStore();
        const sect = useSectionStore();
        const article = useArticleStore();
        const priv = useThePrivateStore();
        const users = useDataUserStore()
        return {teams, sect, article, priv, users}
    },
    data(){
        return{
            list_items: [],
            mass_sec: false,
            good: false
        }
    },
    created(){
        
        setTimeout(()=>{this.users.TakingData()}, 500) 
        setTimeout(()=>{this.info_items()}, 1000) 

    },
    methods:{

      async edit_pr(type_action, userID, type_entity, id_entity){
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
    "entity_type":  type_entity,
    "entity_id": id_entity,
    "permission": type_action
};
if (typeof(userID)==='object'){
  for (var a = 0; a<=userID.length-1; a++){
    body.user_id=userID[a].id;
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


const {data}= await useFetch(url, {
    method: "GET",
    headers,
})
var prob_mass=[]
for (var a = 0; a<=data.value.data.length-1; a++){
prob_mass.push(data.value.data[a].items)
}
prob_mass = prob_mass.flat()
for (var t = 0; t<=prob_mass.length-1; t++){
  if (prob_mass[t].created_by===this.users.userId) {
    this.list_items.push(prob_mass[t])
  }
}
this.good=true



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
.no_work{
    position: absolute;
    left: 430px;
    top: 45px;
    font-family: 'Roboto_regular';
    p{
        font-size: 15px;
        line-height: 2;
    }
}

.items_block{
    position: relative;
    display: flex;
    margin: 0px;
    padding: 7px;
    padding-bottom: 10px;
    padding-top: 5px; 
    padding-left: 10px;
    width: 100%;
    height: 37px;
    left: -13px;
    top: 20px;
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
    .ik{
      min-width: 150px;
    }
    .no{
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
      .nm{
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        font-size: 15px;
        height: 20px;;
        color: blue;
        cursor: pointer;
        max-width: 500px;
      }
      .ob{
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