<template>
  <div class="container">
    <h1>Create a new Duty</h1>

    <form>
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

      <div class="form__actions">
        <Button text="Submit" :loader="creating" @click="onSubmit"/>
        <Button text="Cancel" color="secondary" :to="{ name: 'my-team-view', params: { id: route.params.id } }"/>
      </div>

    </form>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_inputs.scss';

.input-group {
  @include input-group();
}

.form__actions {
  display: flex;
  gap: 1rem;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Services
import DutiesService from '@/coexistance/services/duties-api.service'
// Entities
import Duty from '@/coexistance/domain/duty.entity'
// Components
import Button from '@/shared/ui/components/button.component.vue'

const router = useRouter()
const route = useRoute()

const duty = ref(new Duty({
  dateline: new Date().toISOString().split('T')[0]
}))

const creating = ref(false)

const onSubmit = (event) => {
  event.preventDefault()
  creating.value = true

  // Validations

  const dutiesService = new DutiesService()
  dutiesService.create(route.params.teamId, duty.value)
    .then(() => {
      creating.value = false
      router.push({ name: 'my-team-view', params: { id: route.params.id } })
    })
}
</script>
