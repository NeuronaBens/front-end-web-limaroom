<template>
  <div v-if="!roommateHaveAttributes" class="profile__attributes">
    <div class="profile__attributes__container">
      <div class="profile__attribute--type profile__personality">
        <h2>Personality</h2>
        <div class="profile__attributes__list">
          <p v-for="attribute in attributes.filter(attr => attr.type === 'personality')" :key="attribute.id" class="profile__attributes__list__item">
            {{ attribute.name }}
          </p>
        </div>
      </div>
      <div class="profile__attribute--type profile__interest">
        <h2>Interests</h2>
        <div class="profile__attributes__list">
          <div v-for="attribute in attributes.filter(attr => attr.type === 'interest')" :key="attribute.id" class="profile__attributes__list__item">
            <p>{{ attribute.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="self" class="attributes__actions">
      <Button
        :text="haveAttributes ? 'edit' : 'add'"
        :to = "{ name: 'assign-attributes-view'}"
        />
    </div>
  </div>
</template>

<style lang="scss">
.profile__attributes {
  box-shadow: 1px 1px 20px -6px rgba(0, 0, 0, 0.52);
  margin: 2rem 10rem;
  padding: 3rem;
  border-radius: 1rem;

  .profile__attributes__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .button {
    margin: 0;
    font-size: 1.5rem;
  }

  .profile__attribute--type {
    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    h2::after {
      content: "";
      display: block;
      width: 80%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.2);
      margin: 1rem 0;
    }

    .profile__attributes__list {
      display: flex;
      flex-wrap: wrap;
      column-gap: 2rem;
      row-gap: 1rem;

    }

  }

  .profile__personality .profile__attributes__list__item {
    background-color: $primary;
  }

  .profile__interest .profile__attributes__list__item {
    background-color: $black;
  }

  .attributes__actions {
    text-align: right;
  }
}

.profile__attributes__list {
  .profile__attributes__list__item {
    color: $white;
    padding: .5rem 3rem;
    border-radius: .4rem;
  }
}
</style>

<script setup>
import Button from '@/shared/ui/components/button.component.vue'
defineProps({
  roommateHaveAttributes: {
    type: Boolean,
    required: true
  },
  haveAttributes: {
    type: Boolean,
    required: true
  },
  self: {
    type: Boolean,
    required: true
  },
  attributes: {
    type: Array,
    required: true
  }
})

</script>
