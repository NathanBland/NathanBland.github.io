<template>
  <section class="container">
    <profile-card />
    <div class="cover">
      <nav-links />
    </div>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
const ProfileCard = () => import('~/components/ProfileCard.vue')
const NavLinks = () => import('~/components/Links')

export default {
  components: {
    NavLinks,
    ProfileCard
  }
}
</script>

<style>
.site-grid .container {
  position: relative;
  display: grid;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  grid-template-columns: 1fr;
  grid-template-rows: [header] 85vh [body] 1fr;
}
.cover {
  background-color: rgba(255, 255, 255, 0.80);
  box-shadow: inset 0px 5px 5px #5d5d5d;
  margin-top: 1em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 780px) {
  .site-grid .container {
    grid-template-columns: 1fr;
    grid-template-rows: [header] 1fr [body] 1fr;
  }
  .site-grid .container .description {
    font-size: 75%;
    margin-bottom: 1em;
  }
}
</style>
