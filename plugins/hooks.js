import { useDataUserStore } from "~~/stores/UserData"
import { useThePrivateStore } from "~~/stores/private"
export default defineNuxtPlugin(nuxtApp => {
    const user = useDataUserStore()
    const priv = useThePrivateStore()
        
  })