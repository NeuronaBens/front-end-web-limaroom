<template>
  <div class="container">
    <h1>Tell us more about you</h1>

    <div class="assign-attributes">
      <div class="personalities">
        <h3>Personality types</h3>
        <div class="assign-attributes__list">
          <div @click="toggleItem(attribute.id)"
            v-for="attribute in attributes.filter(attr => attr.type === 'personality')" :key="attribute.id"
            class="assign-attributes__list__item" :data-id="attribute.id">
            <p>{{ attribute.name }}</p>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="personalities">
        <h3>Interests</h3>
        <div class="assign-attributes__list">
          <div @click="toggleItem(attribute.id)"
            v-for="attribute in attributes.filter(attr => attr.type === 'interest')" :key="attribute.id"
            class="assign-attributes__list__item" :data-id="attribute.id">
            <p>{{ attribute.name }}</p>
          </div>
        </div>
      </div>

      <div class="assign-attributes__actions">
        <a class="button-primary" @click="saveAttributes">Save</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/shared/ui/assets/scss/_buttons.scss';

.assign-attributes__list {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .assign-attributes__list__item {
    cursor: pointer;
    padding: .5rem 2rem;
    background-color: $black;
    color: $white;
    border-radius: 1rem;

    &.active {
      background-color: $primary;
    }
  }

  .divider {
    margin: 3rem auto;
    background-color: rgba($color: #000000, $alpha: 1.0);
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
import { useRouter } from 'vue-router'
// Services
import AttributesService from '@/profile/services/attributes-api.service.js'

const attributes = ref([])
const selectedAttributes = ref([])
const currentUser = userStore()
const router = useRouter()

const toggleItem = (id) => {
  const attr = document.querySelector(`[data-id="${id}"]`)
  attr.classList.toggle('active')

  const index = selectedAttributes.value.indexOf(id)
  index === -1 ? selectedAttributes.value.push(id) : selectedAttributes.value.splice(index, 1)
}

const saveAttributes = () => {
  const profileId = currentUser.state.user.profileId
  const attributesService = new AttributesService()
  attributesService.assignListToProfile(profileId, selectedAttributes.value)
    .then((response) => {
      console.log(response)
      router.push({ name: 'show-profile-view' })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  const profileId = currentUser.state.user.profileId
  const attributesService = new AttributesService()

  attributesService.getAllByProfileId(profileId).then((response) => {
    if (response.length > 0) {
      router.push({ name: 'show-profile-view' })
    }
  })

  attributesService.getAll().then((response) => {
    attributes.value = response
  })
})
</script>
