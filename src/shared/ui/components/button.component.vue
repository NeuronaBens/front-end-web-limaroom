<template>
  <a @click="onClick" class="button" :class="buttonTypeStyle">{{ text }}</a>
</template>

<style lang="scss">

.button {
  color: $white;
  font-weight: $bold;
  text-decoration: none;
  padding: 1rem 5rem;
  text-align: center;
  display: inline-block;
  border-width: .05rem;
  border-style: solid;
  border-radius: .5rem;
  cursor: pointer;
  position: relative;
  margin-top: 1rem;

  &.d-block {
    width: 100%;
    display: block !important;
  }

}

.button--primary {
  background-color: $primary;
  border-color: $primary;

  &:hover {
    background-color: darken($primary, 5);
  }
  &.button--loader {
    border-color: darken($primary, 10);
    background-color: darken($primary, 10);
    color: darken($primary, 10);
  }
}

.button--secondary {
  background-color: $black;
  border-color: $black;

  &:hover {
    background-color: $black;
  }

  &.button--loader {
    color: $black;
  }
}

.button--outlined {
  background-color: $white;
  border-color: $black;
  color: $black;

  &:hover {
    border-color: $primary;
    background-color: $primary;
    color: $white;
  }
}

.button--loader::after {
  content: "";
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: $white;
  opacity: 1;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}
</style>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  loader: {
    type: Boolean,
    default: false
  },
  to: {
    type: Object
  },
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  block: {
    type: Boolean,
    default: false
  }
})

const buttonTypeStyle = computed(() => {
  return `button--${props.color} ${props.block ? 'd-block' : ''} ${props.loader ? 'button--loader' : ''}`
})

const onClick = () => {
  if (props.to) { return router.push(props.to) }
}
</script>
