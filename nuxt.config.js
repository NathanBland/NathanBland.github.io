import pkg from './package'
// import axios from 'axios'
export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/avatar.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    host: process.env.DEPLOY_ENV === 'GH_PAGES' ? 'nathanbland.github.io' : '127.0.0.1',
    port: process.env.DEPLOY_ENV === 'GH_PAGES' ? 443 : 3000,
    // baseURL: process.env.NODE_ENV === 'dev' ? 'localhost:3000' : 'nathanbland.github.io'

  },

  generate: {
    routes: function () {
      const posts = require('./static/index.json').posts
      return posts.map((post) => {
        return {
          route: '/blog/' + post.link,
          payload: post
        }
      })
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

    publicPath: '/app/',
    // vendor: ['babel-polyfill'],
    // babel: {
    //   presets: [
    //     ['vue-app', {
    //       useBuiltIns: true,
    //       targets: { ie: 11, uglify: true },
    //     },
    //     ],
    //   ],
    // },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
