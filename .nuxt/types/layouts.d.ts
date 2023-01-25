import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "company" | "default" | "navbar" | "user"
declare module "C:/NUXT/itlWiki_3/ITLWIKI/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}