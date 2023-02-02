import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: true,
  plugins: [
    { src: '~/plugins/import_editor.js', mode: 'client' }
  ],
    css: [
        '~/assets/scss/font_family.scss'
    ],
    components: [
        '~/components/', '~/components/UI/', '~/components/navbar_components/', '~/components/navbar_window/'
    ],

    modules: [
       '@pinia/nuxt',
       
    ],
})
// useeffect