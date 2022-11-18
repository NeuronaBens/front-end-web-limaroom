<template>
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
      <RequestForm />
    </div>
  </div>
</template>

<style lang="scss">
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
import RequestForm from '@/rental/ui/components/request-form.component.vue'

defineProps({
  offer: {
    type: Object,
    required: true
  }
})
</script>
