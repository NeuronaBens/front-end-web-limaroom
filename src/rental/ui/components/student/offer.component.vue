<template >
  <div class="offer__description">
    <h2>Aditional Information</h2>
    <p><span class="fw-bold">Owner:</span> {{ owner.name }} {{ owner.surname }}</p>
    <p><span class="fw-bold">Conditions:</span> {{ offer.conditions }}</p>
    <p><span class="fw-bold">Offer Dateline:</span> {{ new Date(offer.lifecycle.endAt).toLocaleDateString() }}</p>
    <p><span class="fw-bold">Offer Status</span> {{ offer.status }}</p>
  </div>
</template>

<style lang="scss">
.offer__description {
  h2 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
}
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
