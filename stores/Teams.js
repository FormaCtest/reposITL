import { defineStore } from 'pinia'
import { useThePrivateStore } from './private'
export const useTeamsStore = defineStore('Teams', ()=>{
    const priv = useThePrivateStore()
    const session_TeamID = useCookie('active_company', {maxAge: priv.Age})   //id настойщей компании
    const session_TeamCode = useCookie('disactive_company',{maxAge: priv.Age})   //домен настоящей компании
    const session_TeamName = useCookie('name_team', {maxAge: priv.Age})
    const role = useCookie('role', {maxAge: priv.Age})  //текущая роль у этого пользователя
    const owner = useCookie('owner', {maxAge: priv.Age}) //является ли пользователь владельцем компании?
    function active_company(teamID, TeamCode, TeamName) {
      session_TeamID.value=teamID
      session_TeamCode.value=TeamCode 
      session_TeamName.value = TeamName  
      info_role(teamID)
      
    }
    async function info_role(teamID) {
      const url = new URL(
        "https://api.wiki.itl.systems/team"
    );
    
    const params = {
        "team_id": teamID,
    };
    Object.keys(params)
        .forEach(key => url.searchParams.append(key, params[key]));
    
    const headers = {
        "Authorization": "Bearer "+priv.token,
        "Content-Type": "application/json",
        "Accept": "application/json",
    
    };
    
    
    const {data, error} = await useFetch(url, {
        method: "GET",
        headers,
    })
    if (data.value) {
    role.value=data.value.data.role.name
    }else {
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
    function AddOwner(){
      owner.value=1
    }
    function exit_company(){
     session_TeamID.value=null
     session_TeamCode.value=null
     owner.value=null
     role.value=null
    }
    return{session_TeamID, session_TeamCode, session_TeamName, active_company, exit_company, owner, AddOwner, role}
})