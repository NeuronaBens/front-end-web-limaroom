<template>
  <div class="container">
    <h1>Create a new Duty</h1>

    <form @submit="onSubmit">
      <fieldset>
        <legend>Duty information</legend>
        <div class="input-group">
          <InputText class="input" type="text" v-model="duty.title" required="true" />
          <label>Title</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="text" v-model="duty.description" required="true" />
          <label>Description</label>
        </div>
        <div class="input-group">
          <InputText class="input" type="date" v-model="duty.dateline" required="true" />
          <label>Dateline</label>
        </div>
      </fieldset>

      <button type="submit" class="button-primary">Submit</button>
      <button @click="goBack" class="button-black">Back</button>
    </form>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';
@import '@/shared/ui/assets/scss/_inputs.scss';

.input-group {
  @include input-group();
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Services
import DutiesService from '@/coexistance/services/duties-api.service'
// Entities
import Duty from '@/coexistance/domain/duty.entity'

const router = useRouter()
const route = useRoute()

const duty = ref(new Duty({
  dateline: new Date().toISOString().split('T')[0]
}))

const onSubmit = (event) => {
  event.preventDefault()

  // Validations

  const dutiesService = new DutiesService()
  dutiesService.create(route.params.teamId, duty.value)
    .then(() => {
      router.push({ name: 'my-team-view', params: { id: route.params.id } })
    })
}

const goBack = () => {
  router.push({ name: 'my-team-view', params: { id: route.params.id } })
}
</script>
