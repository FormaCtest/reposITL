<template>
    <div>
        <div :style="[{top: top+'px'},{left: left-400+'px'}]" class="acez">
        <div class="text13">Публичный доступ</div>
        <div class="aWW" :style="{left: left_arrw+'px'}"></div>
        <div @click="publication(); check=check?false:true" :class="[{'cek': true}, {'full': check}]">
            <img style="-webkit-user-select: none;" :class="[{'ball': true}, {'ful': check}]" src="@/assets/resourses/icons/Rectangle_3.png">
        </div>
        <div v-if="check" class="write"><input type="text" readonly> Читать<img src="@/assets/resourses/icons/angle_down.png">
            <div class="acez azec">
                <div>
                 <span>Комментировать</span>
                 <p>Все могут просматривать и комментировать</p>
                </div>
                <div>
                  <span>Читать</span>
                 <p>Все могут просматривать</p>
                </div>
            </div>
        </div>
       
    </div>
    </div>
</template>
<script>
import { useThePrivateStore } from '~~/stores/private';
import { useTeamsStore } from '~~/stores/Teams';
export default{
    props:{
        top:{
            type: Number
        },
        left:{
            type: Number
        },
        left_window:{
            type:Number
        },
        left_arrw:{
            type:Number
        },
        type_entity:{
            type:Number     //1-статья, 2-раздел
        },
        id_entity:{
            type: Number
        }

    },
    setup(){
    const priv = useThePrivateStore()
    const teams= useTeamsStore()
    return{priv, teams}     
    },
    data(){
        return{
            check: false
        }
    },
    methods:{
       async publication() {
        if (this.type_entity) {
            if (this.type_entity===1){
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
    "article_id": this.id_entity,
    "public": this.check?1:0
};

useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
       }else{
        const url = new URL(
    "https://api.wiki.itl.systems/team/section/mode"
);

const headers = {
    "Authorization": "Bearer "+this.priv.token,
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "team_id": this.teams.session_TeamID,
    "section_id": this.type_entity,
    "public": this.check?1:0
};

useFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
})
       }
        }else{
            this.$emit('check', !this.check)
        }
      
       }
    }
}
</script>
<style lang="scss" scored>
@import "@/assets/scss/font_family.scss";
.acez{
    position: absolute;
    background-color: white;
    width: 410px;
    height: 110px;
    z-index: 10;
    box-shadow: 2px 2px 13px 2px rgb(228, 228, 228);
    font-family: 'Roboto_regular';
    font-size: 15px;
    color: rgb(59, 59, 59);
    .text13{
        position: relative;
        left: 40px;
        top: 45px;
    }
    &:not(:focus-within){
        .azec{
            opacity: 0;
     pointer-events: none;
        }
     
    }
    .aWW{
        position: relative;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-bottom: 10px solid rgb(255, 255, 255);
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        top: -38px;
    }
    
}
.cek{
    background-color: #D8D8D8;
    width: 46px;
    height: 26px;
    left: 330px;
    top: 3px;
    position: relative;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
   .ball{
    position: relative;
    width: 21px;
    height: 21px;
    top: 2px;
    left: 3px;
    transition: all 0.2s ease-in-out;
    
   }
}
.full{
        background-color: #9DBBE4;
    }
.ful{
    transform: translate(20px,0);
}
.write{
    position: relative;
    font-family: 'Roboto_regular';
    color: rgb(68, 68, 255);
    font-size: 14px;
    left: 240px;
    top: -28px;
    width: 60px;
    height: 20px;
    padding: 10px;
    cursor: pointer;
    &:hover{
        background-color: aliceblue;
    }
    input{
        position: absolute;
        width: 60px;
        opacity: 0;
        cursor: pointer;
    }
}
.azec{
    left: -240px;
    z-index: 2;
    background-color: white;
    top: 45px;
    height: 130px;
    padding-top: 15px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div{
        padding-top: 20px;
        padding-left: 40px;
        line-height: 0.5;
        height: 55px;;
        cursor: pointer;
        &:hover{
          background-color: aliceblue;
          span{
            color: blue;
          }
        }
    }
    span{
        color: black;
    }
    p{
        color: gray;
        font-size: 13px;
    }
}
</style>