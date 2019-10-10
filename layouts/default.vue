<template>
  <div class="site-grid">
    <div class="empty-bg-holder">
      <img class="preload" src="~assets/small_background.jpg">
      <!-- <div v-if="isLoaded" class="full-bg"/> -->
    </div>
    <nuxt class="site" />
  </div>
</template>

<script>
// const ProfileCard = () => import('~/components/ProfileCard.vue')

export default {
  components: {
    // ProfileCard
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
  background: url('~assets/small_background.jpg');
  position: relative;
  display: grid;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}

.empty-bg-holder {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(50px);
  overflow: hidden;
}
.empty-bg-holder img {
  width: 100%;
  height: 100%;
}
.site {
  z-index: 2;
}

.page-enter-active, .page-leave-active {
  transition: opacity 500ms
}
.page-enter, .page-leave-active {
  opacity: 0
}

@media (max-width: 780px) {
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
