<script setup lang="ts">
import type { HomeCardListProps } from '../types';
import HomeCard from './HomeCard.vue';

const { homeCards } = defineProps<HomeCardListProps>();
defineEmits(['enter-card']);
</script>

<template>
  <div class="home-card-list">
    <HomeCard
      v-for="card of homeCards"
      :key="card.id"
      :home-card="card"
      @enter="$emit('enter-card', card)"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeCardList',
};
</script>

<style scoped lang="postcss">
.home-card-list {
  @apply grid gap-2 justify-center;
  grid-template-columns: repeat(auto-fit, 230px);
}
</style>
