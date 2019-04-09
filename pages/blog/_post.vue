<template>
  <section class="blog">
    <nav>
      <profile-card/>
      <nav-links/>
    </nav>
    <section class="post">
      <div class="post-meta">
        <h1 class="post-title">{{ postMeta.title }}</h1>
        <h3 class="post-subtitle">{{ postMeta.date }}</h3>
      </div>

      <div class="post-body" v-html="post" >
      </div>
    </section>
  </section>
</template>

<script>
const marked = require('marked')
const Highlight = require('highlight.js')

const NavLinks = () => import('~/components/Links')
const ProfileCard = () => import('~/components/ProfileCard.vue')
const posts = require('../../static/index.json').posts
export default {
  components: {
    NavLinks,
    ProfileCard
  },
  data() {
    return {
      isLoaded: false
    }
  },
  asyncData({ $axios, params, store, payload }) {
    if (payload) {
      return { post: payload.post, postMeta: payload.meta }
    } else {
      // const host = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://nathanbland.github.io' : '127.0.0.1:3000'
      const postMeta = posts.filter((post) => {
        return post.link === params.post
      })[0]
      const url = process.env.NODE_ENV === 'dev' ? `http://localhost:3000/${params.post}.md` : `/${params.post}.md`
      // console.log('posts:', postMeta) // eslint-disable-line no-console
      return $axios.get(url)
        .then((res) => {
          const markedPost = marked(res.data)
          return { post: markedPost, postMeta }
        })
    }
  },
  mounted() {
    this.isLoaded = true
  },
  updated() {
    if (this.isLoaded) {
      Highlight.initHighlightingOnLoad()
    }
  },
  methods: {
    triggerHighlight() {
      // Highlight.initHighlightingOnLoad()
    }
  }
}
</script>

<style>
.post {
  position: relative;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: inset 5px 0px 5px #5d5d5d;
  padding-left: 1em;
  padding-top: 1em;
  margin-right:  1em;
  display: flex;
  /* padding-top: 1em; */
  /* width: 75vw; */
  flex-flow: column nowrap;
}
.post > .post-meta {
  border: solid 1px #3b3b33;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 6px #3b3b33;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: .5em .85em;
}
.post .post-title {
  font-size: 3em;
  /* text-decoration: underline; */
}
pre {
  width: 100%;
  overflow-x: auto;
  margin-left: 0em;
  /* padding-left: -1em; */
}
p > code {
  background-color: #002b36;
  color: #839496;
  line-height: 2em;
  padding: 0.25em .5em;
  border-radius: 5px;
}
@media (max-width: 780px) {
  .post > .post-meta {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  .post .post-title {
    font-size: 2em;
    text-align: center;
  }
}
</style>
