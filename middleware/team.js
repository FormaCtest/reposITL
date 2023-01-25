import { useTeamsStore } from "~~/stores/Teams"
export default defineNuxtRouteMiddleware((to, from) => {
    const teams = useTeamsStore()
  if (!(teams.session_TeamID)) {
     return navigateTo('/Account/your_company')
  }
})


