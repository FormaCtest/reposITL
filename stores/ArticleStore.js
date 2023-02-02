import {defineStore} from 'pinia'
import { useThePrivateStore } from './private'
import { useTeamsStore } from './Teams'
import { useSectionStore } from './SectionStore'
export const useArticleStore = defineStore('article', ()=>{
const priv = useThePrivateStore()
const teams = useTeamsStore()
const sect = useSectionStore()
const article_name = useCookie('art_name', {maxAge: priv.Age})
const article_id = useCookie('art_id', {maxAge: priv.Age})
function use_article(name, id){
article_name.value = name
article_id.value = id
}
function exit_article(){
    article_name.value = null
    article_id.value = null 
}
return {use_article, article_id, article_name, exit_article}
})