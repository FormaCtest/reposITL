<template>
    <div> 
    <div :style="[{top: top+'px'},{left: left-400+'px'}]" class="access">
        <div class="lock_icon_field">
           <img :style="[{width: width_img+'px'},{height: height_img+'px'}]" src="@/assets/resourses/icons/access_2.png">
           <div class="name" :style="[{position: 'absolute'},{top: '10px'}, {left: '40px'}]">{{ text }}</div>
        </div>
        <input :style="{width: width_input+'px'}" class="click_2" type="text" readonly>
        <div :style="{left: left_window+'px'}" tabindex="1" class="role_editing_window"> 
            
         <input  class="input_search_users" v-model="search" @input="SEARCH()" placeholder="Введите имя пользователя для добавления" type="text" >
         <div @click="un()" tabindex="1" :class="[{'X': true}, {'xshow': search===''}]" ></div>
         <div v-if="search===''" class="all_users">
             <img src="@/assets/resourses/icons/all_user.png">
             <div class="initials_2">
              <div class="name">Все</div>
              <div class="count">{{list_user.length}} &nbsp; пользователя</div>
             </div>
                <div class="ch_acc">
                    <span>Полный доступ</span>
                    <img src="@/assets/resourses/icons/angle_down.png">
                    <input @click="unvis=false" class="edit_role" type="text" readonly>
                    <div :class="[{'list_role': true}, {'unvis': unvis}, {'delete': !del}]">
                        <div tabindex="-1" @click="Edit_score(1, list_user); type='Полный доступ'; unvis=true" class="VV">
                     <div  class="role">Полный доступ</div>
                     <div class="disc">Пользователь может просматривать, редактировать и делиться</div>
                    </div>
                    <div tabindex="-1" @click="Edit_score(2, list_user); type='Чтение и редактирование'; unvis=true" class="VV">
                     <div class="role">Чтение и редактирование</div>
                     <div class="disc">Пользователь может просматривать, редактировать</div>
                    </div>
                    <div tabindex="-1" @click="Edit_score(3, list_user); type='Только чтение'; unvis=true" class="VV">
                     <div class="role">Только чтение</div>
                     <div class="disc">Пользователь может только просматривать</div>
                    </div>
                    <div tabindex="-1" @click="Edit_score(4, list_user); type='Без доступа'; unvis=true" class="VV">
                     <div class="role">Без доступа</div>
                     <div class="disc">Пользователь не имеет доступа</div>
                    </div>
                    <div v-if="del" tabindex="-1" @click="Edit_score(0, list_user)" class="VV">
                        <div class="delete">Удалить</div>
                    </div>
                    </div>
                </div>
             <div :style="{left: left_arrw+'px'}" class="arrw"></div>
         </div>
         <div class="all_users" v-for="list of sort_user">
             <img class="user" src="@/assets/resourses/icons/user_circle_2.png">
             <div class="initials_2">
              <div class="name">{{list.first_name}}&nbsp;{{list.last_name}}</div>
              <div class="count">{{list.email}}</div>
             </div>
             <div class="ch_acc">
                <!-- {{ perm[perm.indexOf(list.id)].ability }} -->
                 {{ scan(list.id)==3?'Полный доступ':
                    scan(list.id)==2?'Чтение и редактирование':
                    scan(list.id)==1?'Только чтение':
                    'без доступа'
                }}
                <img src="@/assets/resourses/icons/angle_down.png">
                <input class="edit_role" type="text" readonly>
                <div :class="[{'list_role': true}, {'delete': {'delete': !del}}]">
                    <div tabindex="-1" @click="Edit_score(1, list.id)" class="VV">
                     <div  class="role">Полный доступ</div>
                     <div class="disc">Пользователь может просматривать, редактировать и делиться</div>
                    </div>
                    <div tabindex="0" @click="Edit_score(2, list.id)" class="VV">
                     <div class="role">Чтение и редактирование</div>
                     <div class="disc">Пользователь может просматривать, редактировать</div>
                    </div>
                    <div tabindex="0" @click="Edit_score(3, list.id)" class="VV">
                     <div class="role">Только чтение</div>
                     <div class="disc">Пользователь может только просматривать</div>
                    </div>
                    <div tabindex="0" @click="Edit_score(4, list.id)" class="VV">
                     <div class="role">Без доступа</div>
                     <div class="disc">Пользователь не имеет доступа</div>
                    </div>
                    <div v-if="del" tabindex="0" @click="Edit_score(0, list.id)" class="VV">
                        <div class="delete">Удалить</div>
                    </div>
                    </div>
            </div>
             <div class="arrw"></div>
         </div>
        </div>
        
    </div>
   
    </div>
</template>
<script>
import { useSectionStore } from '~~/stores/SectionStore';
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
        width_img:{
            type: Number
        },
        height_img:{
            type: Number
        },
        width_input:{
            type: Number
        },
        text:{
            type: String
        },
        type_entity:{
            type: Number        //1 статья, 2 раздел
        },
        id_entity:{
            type: Number
        },
        del:{
            type: Boolean  //есть ли кнопка удалить права
        }

    },
    setup(){
        const priv = useThePrivateStore()
        const teams = useTeamsStore()
        const sect = useSectionStore()
        return {priv, teams, sect}
    },
    data(){
        return{
            search: '',
            list_user: [],
            sort_user: [],
            perm: [],
            type: 'Полный доступ',
            unvis: false,
            te: this.type_entity,
            ie: this.id_entity
        }
    },
    mounted(){
setTimeout(()=>{this.Get_list()}, 1000) 
    },
    methods:{
        scan(id){
        var a = 0;
        for (let i = 0; i<=this.perm.length-1; i++){
            if (this.perm[i].id==id){
                a++
            }
        }
         return (a)
        },
        Edit_score (type_action, userID){
         this.$emit('for_whom', type_action, userID, this.te, this.ie)
        },
        SEARCH(){
            this.sort_user=this.list_user.filter(item=>item.first_name===this.search||item.last_name===this.search)
        },
        un(){
            this.search= ''
            this.SEARCH()
        },
        async Get_list () {

const url = new URL(
"https://api.wiki.itl.systems/team/employees"
);

const params = {
"team_id": this.teams.session_TeamID,
"all": 0,

};
Object.keys(params)
.forEach(key => url.searchParams.append(key, params[key]));

const headers = {
"Authorization": "Bearer "+this.priv.token,
"Content-Type": "application/json",
"Accept": "application/json",
};

const a = await useFetch(url, {
method: "GET",
headers,
})

this.list_user = a.data.value.data.employees;
}
    }
}
</script>
<style scored lang="scss">
.access{
    z-index: 4;
    &:not(:focus-within){
        .role_editing_window{
            opacity: 0;
            pointer-events: none;
        }
    }
    .arrw{
        position: absolute;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-bottom: 10px solid rgb(255, 255, 255);
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        top: -20px;
        left: 430px;
    }
    width: 520px;
    &:focus-within{
       
    .role_editing_window{
            opacity: 1;
            pointer-events: auto;
        }
    }
    position: absolute;
    img{
        width: 18px;
        height: 20px
    }
    
    .click_2{
        position: absolute;
        top: 7px;
        left: 435px;
        opacity: 0;
        height: 20px;
        width: 19px;
        cursor: pointer;
    }
    
    .unvis{
        pointer-events: none;
        opacity: 0;
    }
    .lock_icon_field{
        left: 430px;
        position: absolute;
        width: 28px;
        height: 28px;
        padding-left: 9px;
        padding-top: 9px;
        cursor: pointer;
        border-radius: 2px;
    }
   
 .role_editing_window{
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: white;
    top: 50px;
    left: 5px;
    z-index: 1;
    padding-bottom: 20px;
    width: 510px;
    box-shadow: 2px 2px 14px 2px rgb(214, 214, 214);
    .all_users{
        display: flex;
        flex-direction: row;
        font-family: 'Roboto_regular';
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 30px;
        width: 450px;
        height: 50px;
        top: 100px;
        img{
        margin-right: 20px;
        margin-left: 10px;
        margin-top: 10px;
        width: 35px;
        height: 25px;
        }
        .user{
            width: 38px;
        height: 38px;
        margin-top: 3px;
        }
        .ch_acc{
            &:not(:focus-within){
                .list_role{
                    opacity: 0;
                    pointer-events: none;
                }
                
            }
          
            
            .list_role{
                position: relative;
                top: 32px;
                left: -300px;
                width: 510px;
                height: 300px;
                background-color: rgb(255, 255, 255);
                display: flex;
                flex-direction: column;
                left: -585px;
                 padding-top: 10px;
                 padding-right: 10px;
                 padding-bottom: 10px;
                 box-shadow: 2px 2px 14px 2px rgb(214, 214, 214);
                 .VV{
                    &:hover{
                        background-color: aliceblue;
                        .role{
                            color: blue;
                        }
                    }
                    cursor: pointer;
                    padding: 15px 0px 15px 40px;
                    width: 460px;
                    .role{
                        color: rgb(75, 75, 75);
                        font-size: 15px;
                    }
                    .disc{
                        color: rgb(139, 139, 139);
                        font-size: 13px;
                    }
                    .delete{
                        color: rgb(207, 0, 0);
                        font-size: 15px;

                    }
                 }
            }

            display: flex;
            margin-top: 0px;
            padding-top: 15px;
            padding-left: 15px;
            padding-right: 2px;
            cursor: pointer;
            width: 140px;
            white-space: nowrap;
            height: 30px;
            font-size: 14px;
            color: blue;
            margin-left: 100px;
            img{

                margin-top: 6px;
                width: 10px;
                height: 7px;
            }
            .edit_role{
                position: relative;
                top: -5px;
                left: -150px;
                width: 125px;
                opacity: 0;
                cursor: pointer;
                
            }
            &:hover{
                background-color: aliceblue;
            }
        }
        .initials_2{
            width: 100px;
            margin-top: 8px;
         .name{
            font-size: 15px;
            color: rgb(66, 66, 66);
         }
         .count{
            font-size: 13px;
            color: rgb(167, 167, 167);
            width: 200px;
         }
        }
    }
    .xshow{
        opacity: 0;
    }
    .X{
      position: absolute;
      z-index: 1;
      top: 23px;
      left: 460px;
      width: 12px;
      height: 12px;
      background: url("@/assets/resourses/icons/Xgr.png") no-repeat;
      cursor: pointer;
      &:hover{
        background: url("@/assets/resourses/icons/x.png") no-repeat;
      }
    }
    .input_search_users{
        font-family: 'Roboto_regular';
        font-size: 14px;
        // position: absolute;
        width: 430px;  
        height: 53px;
        margin: 0px;
        padding-left: 40px;
        background-color: white;
        margin-bottom: 20px;
        padding-right: 40px;
        top: 0px;
        left:0px;
        border: 0px;
        outline: none;
        border-bottom: 1px solid #e0dbf3;
        &::placeholder{
            color: rgb(168, 168, 168);
        }
    }
   }

}
.name{
    font-family: 'Roboto_regular';
    color: rgb(27, 27, 27);
    font-size: 14px;
    white-space: nowrap;
}
.ggh{
    border: 1px solid black;
}
.delete{
        height: 100px;
    }
</style>