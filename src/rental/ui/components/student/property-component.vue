<template class="property">
  <div class="property__header">
    <div class="property__title">
      <i class="pi pi-arrow-left icon" @click="goBackToOffers"></i>
      <h1>{{ property.title }}</h1>
    </div>
    <div class="property__stars">
      <i class="pi pi-star-fill"></i>
      <p>5.00</p>
    </div>
    <p class="property__location">{{ property.location }}</p>
  </div>

  <div class="property__assets">
    <div class="property__asset" v-for="asset in property.assets" v-bind:key="asset.urlImage">
      <img :src="asset.urlImage" alt="">
    </div>
  </div>
</template>

<style lang="scss">
.property__header,
.property__assets {
  margin-bottom: 2rem;
}

.property__title {
  display: flex;
  align-items: center;
  gap: 2rem;

  .icon {
    cursor: pointer;
  }
}

.property__stars {
  display: inline-block;

  p {
    display: inline-block;
    margin-left: .5rem;
  }
}

.property__location {
  display: inline;
  margin-left: 1.5rem;
}

.property__assets {

  @include grid(2, 1rem);

  .property__asset {
    width: 100%;
    overflow: hidden;

    img {
      border-radius: 1rem;
      width: 100%;
      height: 100%;
      max-height: 40rem;
      object-fit: cover;
    }
  }
}
</style>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  property: {
    type: Object,
    required: true
  }
})

const goBackToOffers = () => {
  router.push({ name: 'propertys-view' })
}

</script>
