import { useThePrivateStore } from "~~/stores/private"
import { useDataUserStore } from "~~/stores/UserData"
import { useTeamsStore } from "~~/stores/Teams"
import { useSectionStore } from "~~/stores/SectionStore"
export default defineNuxtRouteMiddleware((to, from) => {
    const priv = useThePrivateStore()
    const user = useDataUserStore()
    const teams = useTeamsStore()
    const sect = useSectionStore()
  if (!(priv.token)) {
    user.DeleteData()
    teams.exit_company()
    sect.close_sect()
     return navigateTo('/login') 
  }
})


