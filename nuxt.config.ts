import { defineNuxtConfig } from 'nuxt/config'
export default {
    css: [
        '~/assets/scss/font_family.scss'
    ],
    components: [
        '~/components/', '~/components/UI/', '~/components/navbar_components/', '~/components/navbar_window/'
    ],

    modules: [
       '@pinia/nuxt',

    ],
    ssr: false,
      loadingIndicator: {
        name: '~/custom-locading-indicator.html',
        color: '#000',
        background: '#fff'
      }
}
