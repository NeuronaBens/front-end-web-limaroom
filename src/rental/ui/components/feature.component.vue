<template>
  <div @click="toggle" class="feature" ref="featureRef">
    <div class="feature__icon">
      <img :src="feature.icon" alt="">
    </div>
    <div class="feature__name">
      <h3>{{ feature.name }}</h3>
    </div>
  </div>
</template>

<style lang="scss">
.feature {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;

  .feature__icon {
    width: 100%;
    max-width: 6rem;

  }

  .feature__name {
    text-align: center;
  }

  &.selected {
    background-color: $primary;
    color: white;
    img {
      filter: invert(100%) sepia(0%) saturate(6216%) hue-rotate(2deg) brightness(101%) contrast(102%);
    }
  }
}
</style>

<script setup>
import { ref } from 'vue'

/* eslint-disable */
const emit = defineEmits(['toggle'])
const prop = defineProps({
  feature: {
    type: Object,
    required: true
  },
  handleSelected: {
    type: Boolean,
    required: true
  },
})

const featureRef = ref(null)

const toggle = () => {
  if(!prop.handleSelected) return
  featureRef.value.classList.toggle('selected')
  emit('toggle', prop.feature)
}
</script>
