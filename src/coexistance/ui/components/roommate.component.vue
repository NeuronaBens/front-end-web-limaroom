<template>
  <div class="roommate" @click="goToProfile">
    <div class="roommate__image">
      <img :src="roommate.profile.photoUrl" alt="">
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

const goToProfile = () => {
  const profileId = props.roommate.profile.id
  emit('go-to-profile', profileId)
}
</script>
