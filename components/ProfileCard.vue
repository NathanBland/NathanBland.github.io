<template>
  <div class="profile-card">
    <nuxt-link
      to="/">
      <profile />
    </nuxt-link>
    <section class="description">
      <h1 class="title">
        NathanBland
        <span>.dev</span>
      </h1>
      <h2 class="subtitle">
        Developer, outdoor enthusiast.
      </h2>
    </section>
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
  margin-top: 1em;
}
.profile-card h1,h2,h3,a {
  color: white;
  text-shadow: 1px 1px 1px black;
}
.title {
  font-size: 3em;
}
.subtitle {
  font-size: 1.5em;
}
.title span {
  margin-left: -.25em;
  color: #989898;
}
.description {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.nav .links .button {
  margin: .5em 0em;
}
</style>
