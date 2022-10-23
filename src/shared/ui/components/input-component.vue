<template>
  <input :type="type" :placeholder="placeholder" :value="modelValue" @input="onInput" required="">
  <span>{{type}}</span>
</template>

<style lang="scss">
</style>

<script setup>

defineProps({
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

</script>
