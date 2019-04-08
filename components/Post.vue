<template>
  <section class="blog-post">
    <h1>{{ post.title }}</h1>
    <div class="post-content">
      <!-- {{ post. }} -->
      content goes here.
    </div>
  </section>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.isPreview {
  overflow: hidden;
  max-height: 5em;
}
</style>
