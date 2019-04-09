<template>
  <section class="blog">
    <nav>
      <profile-card/>
      <nav-links/>
    </nav>
    <div v-if="posts.length > 0" class="posts-list">
      <nuxt-link v-for="(post) in sortedPosts" :key="post.link" :to="`/blog/${post.link}`" class="post-link">
        <h1 class="title">{{ post.title }}</h1>
        <h2 class="subtitle">{{ post.date }}</h2>
      </nuxt-link>
    </div>
    <h1 v-else>No posts found :(</h1>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
const NavLinks = () => import('~/components/Links')
const ProfileCard = () => import('~/components/ProfileCard.vue')
const posts = require('../../static/index.json').posts
export default {
  components: {
    ProfileCard,
    NavLinks
  },
  layout: 'blog',
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

.site-grid .blog {
  position: relative;
  display: grid;
  background-position: center;
  background-size: cover;
  /* padding-top: 1em; */
  width: 100vw;
  height: 100vh;
  overflow: auto;
  grid-template-columns: [side] 25vw [body] 75vw;
  grid-template-rows: 1fr;
}
.posts-list {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: inset 5px 0px 5px #5d5d5d;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
.post-link {
  margin: 1em;
  text-decoration: none;
  /* color: #3b3b33; */
  width: 37.5vw;
  color: #3b3b33;
  padding: .5em .85em;
  border: solid 1px #3b3b33;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 6px #3b3b33;
  transition: all 200ms ease-in-out;
}
.post-link:hover {
  color: #1d1d18;
  box-shadow: 0px 0px 8px #1d1d18;
}
.post-link .title {
  font-size: 2em;
}
.post-link .subtitle {
  font-size: 1em;
  /*  */
}

@media (max-width: 780px) {
  .site-grid .blog {
    grid-template-columns: [body] 100vw;
    grid-template-rows: [top] [body] 1fr;
  }
  .site-grid .blog .description {
    font-size: 75%;
    margin-bottom: 1em;
  }
  .cover {
    margin: 0;
    padding: 0 .5em;
    /* display: none; */
  }
  .posts-list {
    background-color: rgba(255, 255, 255, 0.80);
    margin-top: 1em;
    box-shadow: inset 0px 5px 5px #5d5d5d;
  }
  .post-link {
    width: 90vw;
  }
}
</style>
