<template>
    <div>  
      <div class="contayner_Tea">
      
      <span class="heaD">Ваши компании</span>
      
      <div class="company">
      <div class="team" v-for="team of teams" :key="team">
        <div><span @click= "TeleportToTheCompany(team.id, team.code, team.name)" class="name_team">{{team.name}}</span>
        <br/><span class="user">Пользователей: </span>
        <span class="count">{{ team.employees_count }}</span>
      </div>
      </div>
      <div v-if="onch" class="new_company" @click="navigateTo('/Team/Add')"><img class="plu" src="@/assets/resourses/icons/plus_circle.png"><span>Добавить компанию</span></div>
      </div>  
      </div>
    </div>
</template>
<script>
import {useTeamsStore} from '~~/stores/Teams';
import { useTeamUserStore } from '~~/stores/UserData';
import { useDataUserStore } from '~~/stores/UserData';
definePageMeta ({
  layout: "user",
  middleware: ['auth'],
})

export default{
  setup() {
  const team = useTeamUserStore()
  const user = useDataUserStore()
  const TeamID = useTeamsStore()
  return {team, TeamID, user}
},
data(){
  return{
    teams: [],
    onch: false
  }
},
mounted(){
  this.TeamID.exit_company()
  this.team.ImportTeam().then(()=>{this.UpdateTeam(); this.onch= true})
},

methods:{
  UpdateTeam() {
    this.teams=this.team.yourTeam  
  },
  TeleportToTheCompany(TeamId, TeamCode, TeamName){
    for(var i=0; i<this.teams.length; i++) {
      if(this.teams[i].id===TeamId) {
      if(this.teams[i].owner.id===this.user.userId){
      break;
      }else{
      break;
      }
      }else {continue}
    }
    this.TeamID.active_company(TeamId, TeamCode, TeamName)
    navigateTo('/'+TeamCode+'.itl.wiki')
  },
}
}
</script>
<style scored lang="scss">
@import '@/assets/scss/font_family.scss';
.contayner_Tea{
  position: fixed;
left: 0%;
top: 0%;
width: 100%;
height: 100%;
background-color: #f1f6fd;
}
.f{
  text-decoration: none;
}
.new_company{
  display: flex;
  width: 300px;
  height: 86px;
  margin: 0px;
  margin-left: 5px;
  margin-top: 4px;
    padding: 0px;
    padding-top: 54px;
    padding-left: 80px;
    border: 1px solid rgb(191, 191, 255);
    transition: 0.2s;
    .plu{
      margin-top: 5px;
      width: 24px;
      height: 24px;;
        padding-right: 18px;
    }
    span{
        margin: 0px;
        padding: 0px;
        height: 30px;;
        border-bottom: 1px solid rgb(130, 130, 255, 0);
        font-size: 18px;
        line-height: 2;
        text-align: center;
        color: #0b55bb;
        font-family: 'Roboto_regular';
    }
    &:hover{
     cursor: pointer;
     border: 1px solid rgb(103, 103, 255);
     span{
     border-bottom: 1px solid rgb(50, 50, 218);
     transition: 0.4s;
     }
    }
}
.heaD{
  position: absolute;
  left: 129px;
  top: 30px;
  font-family:'Roboto_regular'; 
  font-size: 24px;
  color: #000000;
  vertical-align: middle;
  line-height: 50px;
}
.company{
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  position: absolute;
  padding: 0px;
  top: 100px;
  margin: 0px;
  height: 100%;
  width: 1176px;
  left: 130px;
  .team{
    margin: 5px;
    padding: 0px;
    padding-left: 45px;
    padding-top: 30px;
    width: 335px;
    height: 110px;
    background-color: white;
    transition: 0.25s;
    transition-property: border-bottom, box-shadow;
    &:hover{
    box-shadow: 1px 1px 13px 3px rgb(236, 236, 236);
    }
   .name_team{
    font-family: 'Roboto_regular';
    color: #0b55bb;
    font-size: 20px;
    &:hover{
      cursor: pointer;
      border-bottom: 1px solid #0b55bb;
    }
   }
   .user{
    font-family: 'Roboto_regular';
    font-size: 14px;
    line-height: 70px;
  
   }
   .count{
    font-family: 'Roboto_regular';
    font-size: 14px;
    line-height: 70px;
    color: #0b55bb;
   }
  }
}
</style>
