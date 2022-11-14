<template>
  <div class="container">
    <div class="offer">
      <div class="offer__header">
        <div class="offer__title">
          <i class="pi pi-arrow-left icon" @click="goBackToOffers"></i>
          <h1>Beautiful House at City</h1>
        </div>
        <div class="offer__stars">
          <i class="pi pi-star-fill"></i>
          <p>5.00</p>
        </div>
        <p class="offer__location">Lima, Peru</p>
      </div>

      <div class="offer__assets">
        <div class="offer__asset" v-for="asset in assets" v-bind:key="asset.urlImage">
          <img :src="asset.urlImage" alt="">
        </div>
      </div>

      <div class="offer__footer">
        <div class="offer__description">
          <h2>Descripción</h2>
          <p>{{ property.description }}</p>
          <div class="divider"></div>
          <h2>Aditional Information</h2>
          <p>{{ offer.conditions }}</p>
        </div>
        <div class="offer__request">
          <div class="offer__extra">
            <p class="offer__price">
              <span>{{ amount ? amount.price : '' }}</span>
              {{
                 amount ? amount.currency : ''
              }}
            </p>
            <div class="offer__stars">
              <i class="pi pi-star-fill"></i>
              <p>5.00</p>
            </div>
          </div>
          <div class="divider"></div>
          <p>Don't miss this opportunity!</p>

          <div class="request__form">
            <RequestForm :offer-id="id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offer {
  padding: 2rem 0;

  .offer__title {
    display: flex;
    align-items: center;
    gap: 2rem;

    .icon {
      cursor: pointer;
    }
  }
  .offer__stars {
    display: inline-block;

    p {
      display: inline-block;
      margin-left: .5rem;
    }
  }

  .offer__location {
    display: inline;
    margin-left: 1.5rem;
  }

  .offer__header,
  .offer__assets {
    margin-bottom: 2rem;
  }

  .divider {
    background-color: lighten($black, 80);
  }

  .offer__footer {
    @include grid(2, 4rem);

    grid-template-columns: calc(60% - 4rem) 40%;
  }
}

.offer__assets {

  @include grid(2, 1rem);

  .offer__asset {
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

.offer__request {
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 4rem;
  text-align: center;

  .offer__extra {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    .offer__price {
      font-size: 2.3rem;
      font-weight: 700;
    }
  }

  h3 {
    font-weight: $regular;
  }

  .divider {
    width: 100%;
  }

  .request__form {
    margin-top: 2rem;
  }
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OffersService from '../../../services/offers-api.service'
import RequestForm from '../../components/request-form.component.vue'
import { userStore } from '@/shared/config/store'

const currentUser = userStore()
const route = useRoute()
const router = useRouter()
const offer = ref({})
const amount = ref({})
const property = ref({})
const assets = ref([])
const id = route.params.id

const goBackToOffers = () => {
  router.push({ name: 'offers-view' })
}

onMounted(() => {
  console.log(currentUser)
  const offersService = new OffersService()

  offersService.getOffer(route.params.id).then((response) => {
    offer.value = response.data.resource
    amount.value = response.data.resource.amount
    property.value = response.data.resource.property
    assets.value = response.data.resource.property.assets
  })
})
</script>
