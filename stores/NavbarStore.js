//pinia с использованием composition api
//const name =  ref('Danil') - передается в state
//const name = computed(()=>{}) - передается в getters
//function name() {} - передается в action

import { defineStore } from 'pinia'

const VisFunState = {    
  user: false,        //state, useVisFunStore - отвечает за то какая функция навбара отображается
  support: false,
  setting: false,
  plus: false,
  notification: false,
  magnifier: false,
  home: false,
  fon: false,
  sect: false
  //
  
}     

export const useVisFunStore = defineStore('function', {  
    state: () => VisFunState,       //отображение функций навбара
    actions: {
      reset() {
         this.user= false       //state, useVisFunStore - отвечает за то какая функция навбара отображается
         this.support= false
         this.setting= false
         this.plus= false
         this.notification= false
         this.magnifier= false
         this.home= false
         this.fon= false
         this.sect = false
        
      },
      vis_user() {
        this.reset()
       this.user = true
       this.fon = true
      },
      vis_support() {
        this.reset()
        this.support = true
        this.fon = true
       },
      vis_home(){
        this.reset()
      this.home = true
      },
      vis_setting(){
        this.reset()
        this.setting=true
      },
       vis_plus(){
        this.reset()
        this.plus=true
       },
       vis_sect(){
        this.reset()
        this.sect=true 
       }
    }
      
  })

