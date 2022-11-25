<template>
  <div class="profile__loading">
    <div class="profile__loading__content">
      <div class="profile__loading__title"></div>
      <div class="profile__loading__card">
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.profile__loading {
  animation: parpadeo 1.5s ease infinite;
  width: min(90%, 120rem);
  margin: 0 auto;

  .profile__loading__content {
    margin: 2rem 10rem;
    border-radius: 1rem;
  }

  .profile__loading__title,
  .profile__loading__card {
    width: 100%;
    border-radius: .8rem;
    background-color: rgba($color: #000000, $alpha: 0.2);
    margin: 3rem 0;
  }

  .profile__loading__title {
    height: 5rem;
  }

  .profile__loading__card {
    height: 40rem;
  }

}
</style>

<script setup>
</script>
