import uk from 'vuetify/src/locale/uk'
import en from 'vuetify/src/locale/en'

export default {
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s - Hydrological_Model_of_Ukraine',
    title: 'Hydrological_Model_of_Ukraine',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  modules: ['nuxt-leaflet'],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { uk, en },
      current: 'uk',
    },
    treeShake: true,
    options: {
      customProperties: true,
    },
    theme: {
      theme: {
        options: {
          // themeCache: {
          //   get: (key) => localStorage.getItem(key),
          //   set: (key, value) => localStorage.setItem(key, value),
          // TODO }, // сохранить тему на устройстве пользователя
          variations: false, // убрать лишние цвета
        },
        themes: {
          light: {
            primary: '#d4e1e9',
            secondary: '#93b8c8',
            accent: '#425e50',
            error: '#ef3544',
            info: '#6285cc',
            success: '#32b76c',
            warning: '#ffcc00',
          },
          dark: {
            primary: '#000000',
            secondary: '#c7493a',
            accent: '#a43425',
          },
        },
      },
    },
  },
  telemetry: false,
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    extend(config) {
      config.module.rules.push({
        test: /\.geojson$/,
        loader: 'json-loader',
      })
    },
  },
}
