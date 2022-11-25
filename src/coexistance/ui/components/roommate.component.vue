<template>
  <div class="roommate" @click="goToProfile">
    <div class="roommate__image">
      <img :src="roommate.profile.photoUrl ? roommate.profile.photoUrl : defaultProfileImage" alt="">
    </div>
    <div class="roommate__name">
      <p>{{ roommate.profile.name }}</p>
      <p>{{ roommate.profile.surname }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.roommate {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .roommate__image {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .roommate__name {
    text-align: center;
  }
}
</style>

<script setup>
const emit = defineEmits(['go-to-profile'])

const props = defineProps({
  roommate: {
    type: Object,
    required: true
  }
})

const defaultProfileImage = 'https://firebasestorage.googleapis.com/v0/b/meet-your-roommate-c7ed7.appspot.com/o/common%2Fuser.png?alt=media&token=f39a2c1d-8321-4b2d-87fc-d3b64c4b2618'

const goToProfile = () => {
  const profileId = props.roommate.profile.id
  emit('go-to-profile', profileId)
}
</script>
