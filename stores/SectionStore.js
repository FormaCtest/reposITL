import {defineStore} from 'pinia'
import { useThePrivateStore } from './private'
import { useTeamsStore } from './Teams'
export const useSectionStore = defineStore('section', ()=>{
    const priv = useThePrivateStore()
    const teams = useTeamsStore()
const current_section = useCookie('secionId', {maxAge: priv.Age})  
const current_name = useCookie('sectionName', {maxAge: priv.Age})  
function vie_sect(section_id, section_name) {
    current_section.value = section_id
    current_name.value = section_name  
}
async function publick (id) {   //делает содержание раздела публичным
    const url = new URL(
        "https://api.wiki.itl.systems/team/article/mode"
    );
    
    const headers = {
        "Authorization": "Bearer "+priv.token,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let body = {
        "team_id": teams.session_TeamID,
        "article_id": id,
        "public": 1
    };
    
    const {error, data} = await useFetch(url, {
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
    }
}
async function open (id){
    const url = new URL(
        "https://api.wiki.itl.systems/team/section/mode"
    );
    
    const headers = {
        "Authorization": "Bearer "+priv.token,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let body = {
        "team_id": teams.session_TeamID,
        "section_id": id,
        "public": 1
    };
    
    const {error, data} = await useFetch(url, {
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
   }
}
async function tp_add (r, data, userID, act) {  //берет данные созданного раздела
   
    if (r.error.value===null){
        // open(r.data._rawValue.data.id)
        for (let a = 0; a<=data.blocks.length-1; a++) {
            data.blocks[a].name=data.blocks[a].type+"_"+a
            data.blocks[a].content=data.blocks[a].data.text
           }
    
        {vie_sect(r.data._rawValue.data.id, r.data._rawValue.data.name)
            navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/'+r.data._rawValue.data.id)}
    }
    
}
function close_sect(){
    current_section.value=null
    current_name.value=null
}
async function Add_section(act, userID, data, nameSection, parent){    //создание раздела
    const url = new URL(
        "https://api.wiki.itl.systems/team/section/add"
    );
    
    const headers = {
        "Authorization": "Bearer "+priv.token,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
   
    if (typeof userID!=='object') {
        let body = {
            "team_id": teams.session_TeamID,
            "name": nameSection,
            "abilities":{
                "0":{
                    "user_id": userID,
                "permission": act
                }
            },
            "section_id": parent,
            
        };//если пользователей несколько создаем массив, каждый элемент которого будет равен
        //айди пользователя, и роли, а после делаем из массива объект и передаем в боди
        if (data.blocks.length!==0){
            for (var a = 0; a<=data.blocks.length-1; a++){
                if (data.blocks[a].data.text!=undefined) body.blocks+=data.blocks[a].data.text+' '
            }
         }
        useFetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        }).then((r)=>{
           
            tp_add (r, data, userID, act)})

        
    }else{
        var list_user = userID
        var list_iduser = []
            for (let a = 0; a<=list_user.length; a++)
        {                    
            list_iduser[a] = {"user_id": list_user[0].id, "permission": act}
        }
        let body = {
            "team_id": teams.session_TeamID,
            "name": nameSection,
            "abilities": {...list_iduser},
            "section_id": parent,
            "code": "код",
        };
        
         if (data.blocks.length!==0){
            body.blocks=data.blocks[0].data.text
         }
            useFetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }).then((r)=>{
               
                tp_add (r, data, userID, act)}) 
            
        
         
        
       
    }
   
    
}
async function Edit_score(type_act, UserID, type_entity, EntityID){   //изменение доступа у раздела\статьи
    if (type_act!==0){
        const url = new URL(
            "https://api.wiki.itl.systems/team/abilities/edit"
        );
        
        const headers = {
            "Authorization": "Bearer "+priv.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        let body = {
            "team_id": teams.session_TeamID,
            "entity_type": type_entity,
            "entity_id": type_entity==='section'?current_section.value:EntityID,
            "permission": type_act
        };
        if (typeof UserID!=='object') {
            body.user_id= UserID
            
            const {data} = await useFetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });
        }else{
        
            for (let a = 0; a<=(UserID.length)-1; a++){
                let body = {
                    "team_id": teams.session_TeamID,
                    "entity_type": type_entity,
                    "entity_id": type_entity==='section'?current_section.value:EntityID,
                    "permission": type_act,
                    "user_id": UserID[a].id
                };
                const {data} = await useFetch(url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                });
            }
            
        }
    }else{
        const url = new URL(
            "https://api.wiki.itl.systems/team/abilities/delete"
        );
        
        const headers = {
            "Authorization": "Bearer "+priv.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        let body = {
            "team_id": teams.session_TeamID,
            "entity_type": type_entity,
            "entity_id": type_entity==='section'?current_section.value:EntityID,
    
        };
        if (typeof UserID!=='object') {
            body.user_id= UserID
            
            useFetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });
        }else{
            for (let a = 0; a<=(UserID.length)-1; a++){
                let body = {
                    "team_id": teams.session_TeamID,
                    "entity_type": type_entity,
                    "entity_id": type_entity==='section'?current_section.value:EntityID,

                    "user_id": UserID[a].id
                };
                useFetch(url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                });
            }
        } 
    }
   
   
}
async function Edit_section (act, userID, data, nameSection, parent){
    const url = new URL(
        "https://api.wiki.itl.systems/team/section/edit"
    );
    
    const headers = {
        "Authorization": "Bearer "+priv.token,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let body = {
        "team_id": teams.session_TeamID,
        "name": nameSection,
        "section_id": current_section.value,
    };
    if (data.blocks.length>=1){
        body.blocks=''
        for (var a = 0; a<=data.blocks.length-1; a++){
            if (data.blocks[a].data.text!=undefined) body.blocks+=data.blocks[a].data.text+' '
        } 
    }else body.blocks='.'
    if (parent!==current_section.value) body.parent_id=parent
    
    useFetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then((r)=>{
        if (!r.error.value){
            navigateTo('/'+teams.session_TeamCode+'.itl.wiki/')
            if (act&&userID) {
                Edit_score(act, userID, 'section', current_section.value)
            }
        }else{
            console.log('произошла ошибка')
        }
    })
    // if (data.value){
    //     navigateTo('/'+teams.session_TeamCode+'.itl.wiki/section/'+current_section.value)
    // }       
    
   
}
return {current_section, current_name, close_sect, vie_sect, Edit_score, Add_section, Edit_section}  
})