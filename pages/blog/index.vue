<template>
  <section class="container">
    <div v-if="posts.length > 0" class="posts-list">
      <nuxt-link v-for="(post, index) in sortedPosts" :key="index" :to="`/blog/${post.link}`" class="post-link">
        <h1 class="title">{{ post.title }}</h1>
        <h2 class="subtitle">{{ post.date }}</h2>
      </nuxt-link>
    </div>
    <h1 v-else>No posts found :(</h1>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// const Profile = () => import('~/components/Profile.vue')
const posts = require('../../static/index.json').posts
export default {
  components: {
    // Logo,
    // Profile
  },
  data() {
    return {
      posts: posts
    }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].reverse()
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.posts-list {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}
.post-link {
  margin: 1em;
  text-decoration: none;
}
.post-link h1 {
  transition: all 200ms linear;
}
.post-link:hover h1 {
  text-decoration: underline;
  /* text-decoration: grey solid; */
}
.post-link h2 {
  text-decoration: none;
}
</style>
