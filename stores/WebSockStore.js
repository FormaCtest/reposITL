import {defineStore} from 'pinia'
import { useThePrivateStore } from './private'
import { useTeamsStore } from './Teams'
import { useSectionStore } from './SectionStore'
export const useWebSockStore = defineStore('websocket', ()=>{

    //необходимые куки с других магазинов
const priv = useThePrivateStore()
const teams = useTeamsStore()
const sect = useSectionStore()
//
//доступные API
var editprofile = false  //отправка данный для редактирования профиля
var newpassword = false // отправка данных для редактирование пароля
//
//функция определяющая маршрут и выдающая соответсвующий набор веб сокетов
function webS(name_router) {
switch (name_router) {
case "/Account/EdProf":
console.log('это окно редактирования пользователя')
// this.editprofile = new WebSocket("wss://api.wiki.itl.systems/account/common/edit");
// this.newpassword = new WebSocket("wss://api.wiki.itl.systems/account/common/edit");

break;
}
}
//
//действия с веб сокетами
return {webS}
})
//
//список API для подключения
//есть 2 варианта
//либо создать огромный список и после разбираться с ним
//либо с помощью плагина определять текущий маршрут и по условию выбирать группы необходимых API для этой страницы

//есть общая функция, которая принимает в аргумент текущий маршрут и уже по switch
//определеят набор текущих подключаемых websocket