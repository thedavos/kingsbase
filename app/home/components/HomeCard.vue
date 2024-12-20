<script setup lang="ts">
import type { HomeCardProps } from '../types';

defineEmits(['enter']);
const props = defineProps<HomeCardProps>();
const heading = props.homeCard.heading.toUpperCase();
</script>

<template>
  <UCard
    class="home-card"
    @click="$emit('enter', props.homeCard)"
  >
    <template #header>
      <h3 class="text-3xl font-semibold">
        {{ heading }}
      </h3>
    </template>
  </UCard>
</template>

<script lang="ts">
export default {
  name: 'HomeCard',
};
</script>

<style scoped lang="postcss">
.home-card {
  @apply cursor-pointer select-none bg-gray-800;
  height: 200px;
}
</style>
