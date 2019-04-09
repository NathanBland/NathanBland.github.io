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
    'highlight.js/styles/default.css',
    'highlight.js/styles/solarized-dark.css'
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
    host: process.env.NODE_ENV === 'dev' ?  '127.0.0.1' : 'nathanbland.dev' ,
    port: process.env.NODE_ENV === 'dev' ? 3000 : 443,
    // baseURL: process.env.NODE_ENV === 'dev' ? 'localhost:3000' : 'nathanbland.github.io',
    https: process.env.NODE_ENV === 'dev' ? false : true

  },

  generate: {
    routes: function () {
      const marked = require('marked')
      const fs = require('fs')
      const posts = require('./static/index.json').posts
      return posts.map((postMeta) => {
        const post = fs.readFileSync(`./static/${postMeta.link}.md`, 'utf8').toString()
        const markedPost = marked(post)
        return {
          route: '/blog/' + postMeta.link,
          payload: {post: markedPost, meta: postMeta }
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

    publicPath: '/framework/',
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
