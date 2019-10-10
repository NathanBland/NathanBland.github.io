<template>
  <div class="links">
    <nuxt-link
      to="/blog"
      class=""
    >
      Dev Blog
    </nuxt-link>
    <a
      href="https://github.com/nathanbland"
      target="_blank"
      class=""
    >GitHub &#8599;</a>
    <a
      href="https://dev.to/nathanabland"
      target="_blank"
      class=""
    >Dev.to &#8599;</a>
    <a
      href="https://twitter.com/nathanabland"
      target="_blank"
      class=""
    >Twitter &#8599;</a>
  </div>
</template>

<style scoped>
.links {
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
}
.links a {
  display: flex;
  flex-flow: row nowrap;
  margin: 1em;
  color: #3b3b33;
  text-decoration: none;
  padding: .5em .85em;
  border: solid 1px #3b3b33;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 2px #3b3b33;
  transition: all 200ms ease-in-out;
  /* border-radius: 5px; */
}
.links a:hover {
  color: #1d1d18;
  box-shadow: 0px 0px 4px #1d1d18;
}
.links a:visited {
  border: solid 1px #f8f8f8;
  box-shadow: 0px 0px 2px #f8f8f8;
}
@media (max-width: 780px) {
  .links {
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }
  .links a {
    min-width: 10vw;
    margin: .25em;
    padding: .25em;
  }
}
</style>
