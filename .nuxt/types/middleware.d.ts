import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "team"
declare module "C:/NUXT/itlWiki_3/ITLWIKI/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}