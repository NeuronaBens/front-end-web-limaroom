<template>
  <div class="assign__roommate__card" @click="toggle" ref="roommateRef">
    <p>{{ roommate.profile.name }}</p>
    <p>{{ roommate.profile.surname }}</p>
  </div>
</template>

<style lang="scss">
.assign__roommate__card {
  text-align: center;
  padding: 2rem 3rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &.selected {
    background-color: $primary;
    color: $white;
  }
}
</style>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-roommate'])
const props = defineProps({
  roommate: {
    type: Object,
    required: true
  }
})

const roommateRef = ref(null)

const toggle = () => {
  roommateRef.value.classList.toggle('selected')
  emit('toggle-roommate', props.roommate.id)
}
</script>
