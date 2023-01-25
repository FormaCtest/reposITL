import { defineStore } from 'pinia'
import { useThePrivateStore } from './private';
export const useDataUserStore = defineStore('UserData', ()=>{
    const team = useTeamUserStore()
    const priv = useThePrivateStore()
    const userName = useCookie('name', {maxAge: priv.Age})  //имя
    const userSubname = useCookie('subname', {maxAge: priv.Age})  //фамилия
    const userEmail = useCookie('email', {maxAge: priv.Age})  //почта
    const userId = useCookie('id', {maxAge: priv.Age})  //id активного в настоящим момент пользователя
    function FillData(data) { //заполняет данные
        userName.value =data.first_name;
        userSubname.value= data.last_name;
        userEmail.value = data.email;
        userId.value = data.id;
    }
    async function TakingData() {  //получает данные 
        const url = new URL(
            "https://api.wiki.itl.systems/account"
        );
        const headers = {
            "Authorization": "Bearer "+priv.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        
        const {data, error} = await useFetch(url, {
            method: "GET",
            headers,
        })
         if (data.value){
         FillData(data.value.data.user)
         team.yourTeam=data.value.data.teams
         }else{
            switch (error.value.statusCode) {
                case 401: throw createError({ statusCode: 401, statusMessage: 'the session is over', fatal: true })
                break;
                case 500: throw createError({ statusCode: 500, statusMessage: 'invalid request', fatal: true })
                break;
                case 400: throw createError({ statusCode: 400, statusMessage: 'Запросу не хватает данных'})
                break;
                case 429: this.priv.Delete_token;
                          throw createError({ statusCode: 400, statusMessage: 'Слишком много запросов', fatal: true})
                          break;
            }
         }
    }
      function DeleteData() {
        userName.value=null
        userSubname.value=null
        userEmail.value=null
        userId.value=null
      }
    return {userName, userSubname, userEmail, userId, TakingData, DeleteData}
})

//информация о компаниях польхователя
export const useTeamUserStore = defineStore('teams', ()=>{
    const priv = useThePrivateStore()
    const yourTeam = []
    async function ImportTeam() {  //получает данные 
        const url = new URL(
            "https://api.wiki.itl.systems/account"
        );
        const headers = {
            "Authorization": "Bearer "+priv.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        
        const {data, error} = await useFetch(url, {
            method: "GET",
            headers,
        })
         if (data.value){
         this.yourTeam=data.value.data.teams
         }else{
            switch (error.value.statusCode) {
                case 401: throw createError({ statusCode: 401, statusMessage: 'the session is over', fatal: true })
                break;
                case 500: throw createError({ statusCode: 500, statusMessage: 'invalid request', fatal: true })
                break;
                case 400: throw createError({ statusCode: 400, statusMessage: 'Запросу не хватает данных'})
                break;
                case 429: this.priv.Delete_token;
                          throw createError({ statusCode: 400, statusMessage: 'Слишком много запросов', fatal: true})
                          break;
            }
         }
    }
    return {yourTeam, ImportTeam}
})