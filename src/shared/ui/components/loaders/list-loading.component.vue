<template>
  <div class="loading__list">
    <div class="loading__item" :class="single" v-for="n in (rows*columns)" v-bind:key="n" :style="{ height: height}">
      <div class="loading__image"></div>
      <div class="loading__content"></div>
    </div>
  </div>
</template>

<style lang="scss">
.loading__list {
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 3rem;

  .loading__item {
    width: 100%;
    height: 25rem;
    animation: parpadeo 1.5s ease infinite;
  }
}

.loading__item {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &.loading__item--single {
    display: block;
    background-color: rgba($color: #000000, $alpha: 0.2);
    border-radius: .8rem;

    .loading__image,
    .loading__content {
      display: none;
    }
  }

  .loading__image {
    height: 80%;
  }

  .loading__content {
    height: 20%;

  }

  .loading__image,
  .loading__content {
    border-radius: .8rem;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
}

</style>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rows: {
    type: Number,
    default: 2
  },
  columns: {
    type: Number,
    default: 4
  },
  single: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: '25rem'
  }
})

const single = computed(() =>
  props.single ? 'loading__item--single' : ''
)

</script>
