<template>
  <div class="team__preview">
    <div class="team__image">
      <img src="@/roommate/ui/assets/team.png" alt="team">
    </div>
    <div class="team__name">
      <p>Team {{ team.id}}</p>
    </div>

    <Button
      text="see team"
      :to="{name: 'show-team-view', params: {id: team.id}}"
    />
  </div>
</template>

<style lang="scss">
.team__preview {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1rem 0;
  .team__image {
    max-width: 20rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .team__name {
    text-align: center;
    font-size: 2rem;
  }

}

</style>

<script setup>
import Button from '@/shared/ui/components/button.component.vue'

defineProps({
  team: {
    type: Object,
    required: true
  }
})
</script>
