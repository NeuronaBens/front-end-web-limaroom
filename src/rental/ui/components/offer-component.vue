<template>
  <div class="offer offer-preview" @click="goToOfferDetail">
    <div class="offer__image">
      <img :src="image" alt="offer image" />
    </div>
    <div class="offer__information">
      <h3 class="offer__title">Beautiful house at city</h3>
      <div class="offer__extra">
        <p class="offer__location">Lima, Peru</p>
        <div class="offer__stars">
          <i class="pi pi-star-fill"></i>
          <p>5.00</p>
        </div>
      </div>

      <p class="offer__condition">{{ offer.conditions }}</p>
      <p class="offer__price"><span>{{ offer.amount.price }}</span> {{ offer.amount.currency }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";

.offer {
  width: 100%;
  margin-bottom: 3rem;

  &.offer-preview {
    cursor: pointer;

    .offer__location {
      margin-left: 0;
    }
  }

  .offer__information {
    padding: 0 1rem;
  }

  .offer__image {
    width: 100%;
    overflow: hidden;

    img {
      border-radius: 1rem;
      width: 100%;
      height: 100%;
      max-height: 35rem;
      object-fit: cover;
    }
  }

}

.offer__information {
  .offer__extra{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .offer__stars {
      display: flex;
      align-items: center;
      gap: .5rem;
    }

  }

  .offer__price {
    span {
      font-size: 1.6rem;
      font-weight: $dark;
    }
  }

}
</style>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const image = ref('')

const props = defineProps({
  offer: {
    type: Object,
    required: true
  }
})

const goToOfferDetail = () => {
  router.push({ name: 'offer-detail-view', params: { id: props.offer.id } })
}

onMounted(() => {
  image.value = props.offer.property.propertyAssets[0] ? props.offer.property.propertyAssets[0].urlImage : ''
})
</script>
