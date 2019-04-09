<template>
  <div class="profile">
    <img src="~/assets/profile.jpg">
  </div>
</template>

<style>
.profile {
  max-width: 360px;
  position: relative;
  margin: auto;
}
.profile img {
  box-shadow: 0px 0px 5px black;
  border-radius: 50%;
  max-width: 100%;
}

@media (max-width: 780px) {
  .profile img {
    max-height: 30vh;
  }
}
</style>
