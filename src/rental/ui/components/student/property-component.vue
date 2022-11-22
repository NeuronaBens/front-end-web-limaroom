<template>
  <div class="property">
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

    <div class="property__description">
      <h2>Descripción</h2>
      <p><span class="fw-bold">Category:</span> {{ property.propertyType }}</p>
      <p>{{ property.description }}</p>
    </div>
    <div class="property__features" v-if="haveFeatures">
      <h2>Features</h2>
      <FeatureListComponent :handleSelected="false" :features="formatFeatures" />
    </div>
    <div class="divider"></div>
  </div>

</template>

<style lang="scss">
.property {

  .divider {
    width: 100%;
    margin: 2rem 0;
    background-color: lighten($black, 80);
  }

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
}
</style>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// Components
import FeatureListComponent from '@/rental/ui/components/feature-list.component.vue'
// Entities
import FEATURES from '@/rental/domain/enum/features.enum'

const router = useRouter()

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const haveFeatures = computed(() => props.property.propertyFeatureList.length > 0)

const formatFeatures = computed(() => {
  return props.property.propertyFeatureList.map(({ id, feature }) => {
    return {
      name: feature.name,
      icon: Object.entries(FEATURES).filter(([key, value]) => value.name === feature.name)[0][1].icon
    }
  })
})

const goBackToOffers = () => {
  router.push({ name: 'offers-view' })
}

</script>
