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
  <Button text="send request" :loader="submiting" :block="true" @click="onSubmit" />

  <Toast />
</template>

<style lang="scss">
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
import { userStore } from '@/shared/infraestructure/store'
// Services
import RequestsService from '@/rental/services/requests-api.service.js'
// Component
import Button from '@/shared/ui/components/button.component.vue'

const currentUser = userStore()
const router = useRouter()
const route = useRoute()
const form = ref(null)
const errors = ref([])
const toast = useToast()
const submiting = ref(false)

const request = ref({
  message: '',
  rentalOfferId: route.params.id,
  userId: currentUser.state.user.id
})

const onSubmit = () => {
  if (request.value.message.trim().length === 0) {
    errors.value.push({ message: 'Message is required' })
    form.value.reset()
    return
  }

  submiting.value = true
  const requestService = new RequestsService()
  requestService.getByOfferIdAndUserId(request.value.rentalOfferId, request.value.userId)
    .then(() => {
      submiting.value = false
      toast.add({ severity: 'error', summary: 'Error when sending request', detail: 'You already send request to this offer', life: 3000 })
    })
    .catch(() => {
      requestService.create(request.value)
        .then((response) => {
          form.value.reset()
          submiting.value = false
          request.value.message = ''
          toast.add({ severity: 'success', summary: 'Request sended correctly', life: 3000 })
          setTimeout(() => {
            router.push({ name: 'offers-view' })
          }, 2000)
        })
        .catch((err) => {
          submiting.value = false
          console.log(err)
          toast.add({ severity: 'error', summary: 'Error when sending request', detail: err.message, life: 3000 })
        })
    })
}

onMounted(() => {
  form.value.reset()
  request.value.message = ''
})
</script>
