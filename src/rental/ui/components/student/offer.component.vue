<template >
  <div class="offer__description">
    <h2>Aditional Information</h2>
    <div class="owner">
      <div class="owner__image">
        <img :src="owner.photoUrl" alt="">
      </div>
      <div class="owner__name">
        <p><span class="fw-bold">Name: </span>{{ owner.name }} </p>
        <p><span class="fw-bold">Lastname: </span>{{ owner.surname }}</p>
      </div>

    </div>

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

  .owner {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 3rem;
  }

  .owner__image {
    width: 10rem;
    height: 10rem;
    margin-bottom: 1rem;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
