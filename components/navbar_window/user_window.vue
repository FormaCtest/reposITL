<template>
    <div>
        <div class="curtain">
          <span>Профиль</span>
        <nav class="points">
          <div class="v" @click="navigateTo('/Account/Bookmarks')"><img src="@/assets/resourses/icons/bookmark.png"><p>Закладки</p></div>
          <div class="v" @click="navigateTo('/Account/EdProf')"><img src="@/assets/resourses/icons/pencil.png"><p>Редактировать профиль</p></div>
          <div class="v" @click="navigateTo('/Account/your_company')"><img src="@/assets/resourses/icons/repeat.png"><p>Сменить компанию</p></div>
          <div class="v" @click="(priv.Delete_token(),navigateTo('/'))"><img src="@/assets/resourses/icons/sign.png"><p>Выйти</p></div>
          <div v-if="fun.fon" @click="fun.reset()" class="fixFON"></div>
        </nav>
        </div>
    </div>
</template>
<script>
import {useVisFunStore} from "@/stores/NavbarStore"
import { useThePrivateStore } from "~~/stores/private"
export default {
setup(){
const fun = useVisFunStore()
const priv = useThePrivateStore()
return{fun, priv}
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