<template>
  <div class="roommate__profile">
    <div class="roommate__image">
      <img :src="profile.photoUrl ? profile.photoUrl : 'https://firebasestorage.googleapis.com/v0/b/meet-your-roommate-c7ed7.appspot.com/o/common%2Fuser.png?alt=media&token=f39a2c1d-8321-4b2d-87fc-d3b64c4b2618' " alt="roommate">
    </div>
    <div class="roommate__name">
      <p class="fw-bold">{{ profile.name }} {{ profile.surname }}</p>
      <p>Edad: {{ profile.age }}</p>
    </div>

    <div class="roommate__action">
      <Button
        text="see profile"
        :to="{ name: 'show-profile-view', params: { id: profile.id } }"
      />
    </div>
  </div>
</template>

<style lang="scss">

.roommate__profile {
  .roommate__image {
    display: block;
    text-align: center;
    height: 15rem;
    overflow: hidden;
    img {
      width: auto;
      height: 100%;
      object-fit: cover;
    }
  }

  .roommate__name {
    text-align: center;
    font-size: 1.8rem;
  }

  .roommate__action {
    text-align: center;
  }
}
</style>

<script setup>
import Button from '@/shared/ui/components/button.component.vue'

defineProps({
  profile: {
    type: Object,
    required: true
  }
})

</script>
