<template>
  <div class="profile">
    <div class="profile__content">
      <div class="profile__image">
        <img :src="profile.photoUrl ? profile.photoUrl : defaultProfileImage" alt="">
      </div>
      <div class="profile__information">
        <p><span class="fw-bold">Name: </span> {{ profile.name }}</p>
        <p><span class="fw-bold">Last Name: </span> {{ profile.surname }}</p>
        <div class="divider"></div>
        <div class="information__group">
          <p><span class="fw-bold">Gender: </span> {{ profile.gender }}</p>
          <p><span class="fw-bold">Age: </span> {{ profile.age }}</p>
        </div>
        <div class="information__group">
          <p><span class="fw-bold">Location: </span> {{ profile.country + ' - ' + profile.city }}</p>
          <p><span class="fw-bold">Phone: </span>{{ profile.phone.code }} {{ profile.phone.number }}</p>
        </div>
        <div class="divider"></div>
        <p v-if="isStudent"><span class="fw-bold">Status: </span> {{ teamStatus[profile.teamStatus] }}</p>
        <p><span class="fw-bold">About me: </span> {{ profile.about }}</p>

        <div v-if="self" class="profile__actions">
          <Button text="change role" color="secondary" @click="handleChangingRole = !handleChangingRole"/>
          <Button text="edit" @click="onEdit"/>
        </div>
        <div v-if="canSendRequest" class="profile__actions">
          <RequestComponent />
        </div>
      </div>
    </div>
  </div>
  <div class="modal" v-if="handleChangingRole">
    <div class="modal__content">
      <h1>Are you sure you want to change to lessor?</h1>
      <p>You can not go back to student</p>
      <div class="modal__actions">
        <Button text="cancel" color="secondary" @click="handleChangingRole = !handleChangingRole" />
        <Button text="confirm" :loader="changingRole" @click="changeRole" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.profile {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .profile__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 4rem;
    align-items: center;
    gap: 3rem;
  }

  .button {
    margin: 0;
    font-size: 1.5rem;
  }
}

.profile__content {

  .profile__image {
    width: 100%;
    overflow: hidden;

    img {
      border-radius: 1rem;
      max-height: 35rem;
      object-fit: cover;
    }
  }

  .profile__information {
    text-align: left;
    font-size: 2.2rem;
  }

  .divider {
    margin: .8rem 0;
  }
}

.profile__information {
  .profile__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 3rem;
    gap: 1rem;
  }

  .information__group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/shared/infraestructure/store'
import { useRouter } from 'vue-router'
import RequestComponent from '@/roommate/ui/components/request-form.component.vue'
import Button from '@/shared/ui/components/button.component.vue'

const emit = defineEmits(['switch'])

defineProps({
  profile: {
    type: Object,
    required: true
  },
  canSendRequest: {
    type: Boolean,
    required: true
  },
  self: {
    type: Boolean,
    required: true
  },
  isStudent: {
    type: Boolean,
    required: true
  }
})

const defaultProfileImage = 'https://firebasestorage.googleapis.com/v0/b/meet-your-roommate-c7ed7.appspot.com/o/common%2Fuser.png?alt=media&token=f39a2c1d-8321-4b2d-87fc-d3b64c4b2618'
const teamStatus = {
  WITHOUTTEAM: 'Looking for a roommate',
  ONTEAM: "I'm already in a team"
}
const currentUser = userStore()
const handleChangingRole = ref(false)
const changingRole = ref(false)
const router = useRouter()

const changeRole = () => {
  changingRole.value = true
  currentUser.changeRole(currentUser.state.user.id)
    .then(() => {
      changingRole.value = false
      handleChangingRole.value = false
      router.push({ name: 'my-offers-view', params: { id: currentUser.state.user.id } })
    })
}

const onEdit = () => {
  emit('switch')
}
</script>
