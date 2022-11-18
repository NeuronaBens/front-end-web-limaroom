<template>
  <div class="container">
    <div class="offer">
      <PropertyComponent :property="property"/>

      <div class="offer__footer">
        <OfferComponent :offer="offer" />

        <!-- TODO: Change Offer Request to Component -->
        <div class="offer__request">
          <div class="offer__extra">
            <p class="offer__price">
              <span>{{ offer.amount.price }}</span>
              {{
                offer.amount.currency
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
        <!-- Offer Request Component -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.offer {
  padding: 2rem 0;

  .offer__footer {
    @include grid(2, 4rem);
    grid-template-columns: calc(60% - 4rem) 40%;
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
import { useRoute } from 'vue-router'
import RequestForm from '@/rental/ui/components/request-form.component.vue'
import PropertyComponent from '@/rental/ui/components/student/property-component.vue'
import OfferComponent from '@/rental/ui/components/student/offer-component.vue'
import OffersService from '@/rental/services/offers-api.service'

import Property from '@/rental/domain/property.entity'
import Offer from '@/rental/domain/offer.entity'

const route = useRoute()
const offer = ref(new Offer({}))
const property = ref(new Property({}))
const id = route.params.id

onMounted(() => {
  const offersService = new OffersService()

  offersService.getOffer(route.params.id).then((response) => {
    offer.value = response.data.resource
    property.value = response.data.resource.property
  })
})
</script>
