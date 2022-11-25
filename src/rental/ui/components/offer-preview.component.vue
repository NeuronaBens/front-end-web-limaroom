<template>
  <div class="offer offer-preview" @click="goToOfferDetail">
    <div class="offer__image">
      <img loading="lazy" :src="image" alt="offer image" />
    </div>
    <div class="offer__information">
      <p class="offer__title">{{ offer.property.title }}</p>
      <div class="offer__extra">
        <p class="offer__location">{{ offer.property.location }}</p>
        <div class="offer__stars">
          <i class="pi pi-star-fill"></i>
          <p>5.00</p>
        </div>
      </div>
      <p class="offer__price"><span>{{ offer.amount.price }}</span> {{ offer.amount.currency }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.offer {
  width: 100%;
  &.offer-preview {
    cursor: pointer;

    .offer__location {
      margin-left: 0;
    }
  }

  .offer__information {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .offer__image {
    width: 100%;
    height: 25rem;
    overflow: hidden;
    border-radius: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

}

.offer__information {
  .offer__title {
    font-size: 1.9rem;
    font-weight: 600;
    margin-bottom: .5rem;
  }
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
import { onMounted, ref } from 'vue'
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
  image.value = props.offer.property.assets[0] ? props.offer.property.assets[0].urlImage : 'https://a0.muscache.com/im/pictures/ec915ac0-c8b3-49e6-bea3-fbc659f95e4d.jpg?im_w=1200'
})
</script>
