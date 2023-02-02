
import { defineStore } from 'pinia'
import { useDataUserStore, useTeamUserStore } from './UserData'
import {useTeamsStore} from './Teams'
export const useThePrivateStore = defineStore('private', () => { 
    const user = useDataUserStore()
    const userTeam = useTeamUserStore()
    const Teams = useTeamsStore()
    const Age = 99999
    const token = useCookie('Token', {maxAge: Age})   //сохранение токена в куки
    const finish = {a: false}    //декорация уведомляющая инпут об ошибке
    async function FetchUser(e, p) {    //функция авторазации, получаем почту, пароль, в ответ дает сессию
        if (token.value!=null) {
          Delete_token()
        }
        const url = new URL(
        "https://api.wiki.itl.systems/account/auth" 
        );
    
        const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        };
    
        let body = {
        "email": e,
        "password": p
        };
        
        const user_data = await useFetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
      
      if (!user_data.error.value) {
        token.value = user_data.data._rawValue.data.token
        user.TakingData()
        userTeam.ImportTeam().then (()=>{
          if (userTeam.yourTeam.length>=1) {
            navigateTo("/Account/your_company" )
          }else navigateTo('Team/Add')})
      }else {
        this.finish.a=true
          switch (user_data.error.value.statusCode) {
          case 401: throw createError({ statusCode: 401, statusMessage: 'the session is over', fatal: true })
          break;
          case 500: throw createError({ statusCode: 500, statusMessage: 'invalid request', fatal: true })
          break;
          case 400: throw createError({ statusCode: 400, statusMessage: 'Запросу не хватает данных', fatal: true })
          break;
          case 429: this.priv.Delete_token;
                    throw createError({ statusCode: 400, statusMessage: 'Слишком много запросов', fatal: true})
                    break;
      }
      }
       }
       async function BuildUser(fn, ln, em, p) {     //Функция создания пользователя, после создания пользователя вызывает функцию авторизации для выдачи сессии
        const url = new URL(
          "https://api.wiki.itl.systems/account/register/secure"
      );
      
      const headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
      };
      
      let body = {
          "first_name": fn,
          "last_name": ln,
          "email": em,
          "password": p,
          "phone": "+77777777777"  //заглушка под телефон, после можно будет изменить на свой
      };
      
      const {data, error} = await useFetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
      })
      if (!data.value){
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
      }else{
        FetchUser(em, p)
      }
       }
       async function Delete_token(){   //удаление сессии
        const url = new URL(
          "https://api.wiki.itl.systems/account/logout"
        );
      
         const headers = {
          "Authorization": "Bearer "+token.value,
          "Content-Type": "application/json",
          "Accept": "application/json",
        };
      
         const {error} = await useFetch(url, {
          method: "POST",
          headers,
         })
         token.value= null 
         user.DeleteData()
         Teams.exit_company()
         navigateTo('/')
        }
    
   return { finish, token, FetchUser, Delete_token,  BuildUser }
})