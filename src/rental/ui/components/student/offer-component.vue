<template >
  <div class="offer__description">
    <h2>Aditional Information</h2>
    <p>Owner: {{ owner.name }} {{ owner.surname }}</p>
    <p>{{ offer.conditions }}</p>
    <p>{{ new Date(offer.lifecycle.endAt) }}</p>
    <p>{{ offer.status }}</p>
  </div>
</template>

<style lang="scss">

</style>

<script setup>

defineProps({
  offer: {
    type: Object,
    required: true
  },
  owner: {
    type: Object,
    required: true
  }
})
</script>
