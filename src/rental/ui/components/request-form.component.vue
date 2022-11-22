<template>
  <form ref="form">
    <div class="input-group">
      <InputText class="input" type="text" v-model="request.message" required />
      <label>Message</label>
    </div>
    <p v-for="error in errors" v-bind:key="error.message" class="error">
    {{ error.message }}
    </p>
  </form>
  <button @click="save" class="button-primary-block">Send Request</button>

  <Toast />
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";
@import "@/shared/ui/assets/scss/_inputs.scss";

.input-group {
  width: 95%;
  @include input-group();
  .input {
    margin-bottom: 1rem;
  }
}

.button-primary-block {
  width: 100%;
}

.error {
  color: $primary;
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { userStore } from '@/shared/config/store'

import RequestsService from '@/rental/services/requests-api.service.js'

const currentUser = userStore()
const router = useRouter()
const route = useRoute()
const form = ref(null)
const errors = ref([])
const toast = useToast()

const request = ref({
  message: '',
  rentalOfferId: route.params.id,
  userId: currentUser.state.user.id
})

const save = () => {
  if (request.value.message.trim().length === 0) {
    errors.value.push({ message: 'Message is required' })
    form.value.reset()
    return
  }

  const requestService = new RequestsService()
  requestService.create(request.value)
    .then((response) => {
      form.value.reset()
      request.value.message = ''
      toast.add({ severity: 'success', summary: 'Request sended correctly', life: 3000 })
      setTimeout(() => {
        router.push({ name: 'offers-view' })
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
      toast.add({ severity: 'error', summary: 'Error when sending request', detail: err.message, life: 3000 })
    })
}

onMounted(() => {
  form.value.reset()
  request.value.message = ''
})
</script>
