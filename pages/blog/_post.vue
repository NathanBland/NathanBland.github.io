<template>
  <div>
    {{ $route.params.post }}
  </div>
</template>

<script>
export default {
  asyncData({ $axios, params, store, payload }) {
    if (payload) {
      return { post: payload }
    } else {
      return {
        post: $axios.get(`/${params.post}.md`)
          .then((res) => {
            // console.log('res', res)
            return res.data
          })
      }
    }
  }
}
</script>

<style>

</style>
