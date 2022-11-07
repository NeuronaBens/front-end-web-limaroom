<template>
  <div>
    <p>{{profile.name}}</p>
    <p>{{profile.surname}}</p>

    <router-link :to="{name: 'show-profile-view', params: {id: profile.id}}">See details</router-link>
  </div>
</template>

<style lang="scss">
</style>

<script setup>

defineProps({
  profile: {
    type: Object,
    required: true
  }
})

</script>
