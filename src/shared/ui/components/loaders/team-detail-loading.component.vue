<template>
  <div class="team__detail__loading">
    <div class="team__name__loading"></div>
    <div class="team__members__loading">
      <div class="team__member__loading" v-for="n in members" v-bind:key="n">
      </div>
    </div>
    <div class="team__tasks__loading">
      <div class="team__task__loading" v-for="n in tasks" v-bind:key="n">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.team__detail__loading{
  animation: parpadeo 1.5s ease infinite;
  width: 100%;

  .team__name__loading,
  .team__member__loading,
  .team__task__loading {
    border-radius: .8rem;
    background-color: rgba($color: #000000, $alpha: 0.2);
    margin: 3rem 0;
  }

  .team__name__loading {
    height: 4rem;
    margin-bottom: 2rem;
  }

  .team__members__loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;

    .team__member__loading {
      height: 15rem;
      border-radius: 50%;
    }
  }

  .team__tasks__loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;

    .team__task__loading {
      height: 15rem;
    }
  }

}
</style>

<script setup>
defineProps({
  members: {
    type: Number,
    default: 7
  },
  tasks: {
    type: Number,
    default: 4
  }
})
</script>
