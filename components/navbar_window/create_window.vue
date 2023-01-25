<template>
    <div>
        <div class="curtain">
          <span>Создать</span>
        <nav class="points">
        <div @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/140/items/add')" class="v"><img  src="@/assets/resourses/icons/file-alt.png"><p>Статью</p></div>
          <div @click="navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/add')" class="v"><img src="@/assets/resourses/icons/folder.png"><p>Раздел</p></div>
          <!--фон для закрытия-->
          <div v-if="fun.fon" @click="fun.reset()" class="fixFON"></div>
          <!--фон для закрытия-->
        </nav>
        </div>
    </div>
</template>
<script>
import {useVisFunStore} from "@/stores/NavbarStore"
import { useTeamsStore } from "~~/stores/Teams"
export default {
setup(){
const fun = useVisFunStore()
const teams = useTeamsStore()
return{fun, teams}
    }
}
</script>
<style scored lang="scss">
@import "assets/scss/font_family.scss";
.fixFON{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    left: 385px;
    position: fixed;
}
.points{
    position: absolute;
    top: 100px;
    display: flex;
    flex-direction: column;
    left: 40px;
    margin: 0%;
    padding: 0%;
    
}
.curtain{
    position: fixed;
    background-color: rgb(238,244,252);
    width: 300px;
    height: 100%;
    z-index: 4;
    left:80px;
    top: 0%;
    span{
        position: absolute;
        left: 50px;
        top: 40px;
        font-family: 'Roboto_regular';
        color: rgb(26, 26, 26);
        font-size: 19px;
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
        position: absolute;
        margin-top: 9px;
        margin-left: 10px;
    }
    p{
        position: absolute;
        left: 50px;
        line-height: 12px;
    }
}

</style>