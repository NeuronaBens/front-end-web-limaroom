<template>
  <router-link v-for="link in routes" v-bind:key="link.name" :to="{ name: link.to, params: link.params, query: link.query }"
    @click="link.callback ? link.callback() : fn()">{{ link.name }}</router-link>
</template>

<style lang="scss">

</style>

<script setup>

defineProps({
  routes: {
    type: Array,
    required: true
  },
  fn: {
    type: Function,
    required: false
  }
})
</script>
