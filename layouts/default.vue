<template>
  <div class="site-grid" :class="[$route.name === 'index' ? 'index' : 'nav']">
    <div class="empty-bg-holder">
      <img class="preload" src="~assets/background.jpg"/>
      <div v-if="isLoaded" class="full-bg"/>
    </div>
    <profile-card />
    <!-- <span>route: {{ this.$route.name }}</span> -->
    <nuxt />
  </div>
</template>

<script>
const ProfileCard = () => import('~/components/ProfileCard.vue')

export default {
  components: {
    ProfileCard
  },
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    this.isLoaded = true
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f8f8f8;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.site-grid {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: grid;
  grid-template-columns: [left] 1fr;
  grid-template-rows: 1em [top-start] 1fr;
  /* transition: all 200ms ease-in-out; */
  /* transition: all 200ms cubic-bezier(.55,0,.1,1); */
}
/* .page-enter-active, .page-leave-active {
  transition: opacity 200ms
} */
/* .page-enter, .page-leave-active {
  opacity: 0
} */
.empty-bg-holder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('~assets/small_background.jpg');
  background-position: center;
  background-size: cover;
  animation: fadeOutBlur 5s ease-in-out forwards;
  /* filter: blur(50px); */
}

.preload {
  position: absolute;
  left: -10px;
  top: -10px;
  width: 5px;
}

.empty-bg-holder .full-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
/* .clearBlur {
  animation: fadeInBg 2s ease-in-out forwards;
} */

.full-bg {
  background: url('~assets/background.jpg');
  background-position: center;
  background-size: cover;
}

.nav.site-grid {
  grid-template-columns: [left] 1fr [middle] 2fr;
  grid-template-rows: [top-start] 5em [top-end body-start] 2fr [body-end footer-start] 1em;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.profile-card {
  /* grid-area: left; */
  position: relative;
  grid-column-start: left;
  grid-column-end: left;
  grid-row-start: top-start;
  grid-row-end: body-end;
  /* transition: all 200ms ease-in-out; */
}
.nav .profile-card {
  max-width: 25vw;
  padding: 1em;
  /* background-color: #e7e7e7; */
  /* transition: all 200ms ease-in-out; */
}
.nav .title {
  font-size: 3em;
}
.nav .subtitle {
  font-size: 1em;
  word-spacing: 1px;
}
.nav .profile {
  max-width: 250px;
}
.nav .links {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 .5em;
  /* align-items: center;  */
}

.button {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  background-color: #9b9b9b80;
}

.button--green {
  border: 1px solid #3b8070;
  color: #3b8070;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  border: 1px solid #35495e;
  color: #35495e;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
@media (max-width: 780px) {
  .site-grid {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    grid-template-columns: [main] 1fr;
    grid-template-rows: auto;
    transition: all 200ms ease-in-out;
  }
  .nav.site-grid {
    grid-template-columns: [left] 1em [main] 1fr;
    grid-template-rows: [top] 1em [body] 1fr;
  }
  .profile-card {
    /* grid-area: left; */
    position: relative;
    grid-column-start: main;
    grid-column-end: main;
    grid-row-start: unset;
    grid-row-end: unset;
    transition: all 200ms ease-in-out;
    /* max-width: 50vw; */
    margin: 1em;

  }
  .profile-card .title {
    font-size: 2.5em;
  }
  .profile-card .subtitle {
    font-size: 2em;
  }
  .links {
    width: 100%;
    display: flex;
    font-size: 1em;
    flex-flow: row nowrap;
  }
  .links .button {
    flex: 1;
    margin: .1em;
    padding: .5em 0;
    text-align: center;
  }
  .nav .profile-card {
    grid-column-start: left;
    grid-row-start: top;
    margin: 0em;
    margin-left: .5em;
    margin-top: .5em;
    padding: 0;
    width: 50px;
  }
  .nav .title,.subtitle,
  .nav .links {
    display: none;
  }
}

@keyframes fadeInBg {
  0% {
    filter: blur(50px);
  }
  90% {
    filter: blur(10px);
  }
  100% {
    filter: blur(0px);
  }
}
@keyframes fadeOutBlur {
  0% {
    filter: blur(50px);
  }
  90% {
    filter: blur(10px);
  }
  100% {
    filter: blur(0px);
  }
}
</style>
