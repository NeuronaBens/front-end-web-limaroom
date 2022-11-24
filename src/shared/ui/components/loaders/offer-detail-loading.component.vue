<template>
  <div class="offer__detail__loading">
    <div class="offer__title"></div>
    <div class="offer__images">
      <div class="offer__image"></div>
      <div class="offer__image"></div>
    </div>
    <div class="offer__description"></div>
  </div>
</template>

<style lang="scss">
.offer__detail__loading {
  margin: 2rem 0;
  width: 100%;
  animation: parpadeo 1.5s ease infinite;
  .offer__title,
  .offer__image,
  .offer__description {
    width: 100%;
    border-radius: .5rem;
    background-color: rgba($color: #000000, $alpha: 0.2);
    height: 20rem;
  }

  .offer__title {
    height: 5rem;
    margin-bottom: 2rem;
  }

  .offer__images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    margin-bottom: 2rem;
    .offer__image {
      height: 45rem;
    }
  }

  .offer__description {
    height: 20rem;
  }
}

</style>

<script setup>
</script>
