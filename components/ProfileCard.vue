<template>
  <div class="profile-card">
    <nuxt-link
      to="/">
      <profile />
    </nuxt-link>
    <h1 class="title">
      NathanBland
      <span>.dev</span>
    </h1>
    <h2 class="subtitle">
      Personal web portfolio and playground
    </h2>
    <div class="links">
      <nuxt-link
        to="/blog"
        class="button button--green"
      >Blog</nuxt-link>
      <a
        href="https://github.com/nathanbland"
        target="_blank"
        class="button button--grey"
      >GitHub &#8599;</a>
      <a
        href="https://dev.to/nathanabland"
        target="_blank"
        class="button button--grey"
      >Dev.to &#8599;</a>
      <a
        href="https://twitter/nathanabland"
        target="_blank"
        class="button button--grey"
      >Twitter &#8599;</a>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
const Profile = () => import('~/components/Profile.vue')

export default {
  components: {
    // Logo,
    Profile
  }
}
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}
.profile-card h1,h2,h3,a {
  color: white;
  text-shadow: 1px 1px 1px black;
}
.title span {
  margin-left: -.25em;
  color: #989898;
}
.nav .links .button {
  margin: .5em 0em;
}
</style>
