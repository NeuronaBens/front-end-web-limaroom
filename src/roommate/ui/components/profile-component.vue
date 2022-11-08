<template>
  <div class="roommate">
    <div class="roommate__image">
      <img src="../assets/avatar.png" alt="roommate">
    </div>
    <div class="roommate__name">
      <p>{{profile.name}}</p>
      <p>{{profile.surname}}</p>
    </div>

    <router-link :to="{name: 'show-profile-view', params: {id: profile.id}}" class="button-primary-block">See profile</router-link>
  </div>
</template>

<style lang="scss">
@import "@/shared/ui/assets/scss/_buttons.scss";

.roommate__name {
  text-align: center;
  font-size: 2.2rem;
}
</style>

<script setup>

defineProps({
  profile: {
    type: Object,
    required: true
  }
})

</script>
