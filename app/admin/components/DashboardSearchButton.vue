<script setup lang="ts">
import { useUIState } from '@/shared/composables/useUIState';

const appConfig = useAppConfig();
const { $ui } = useNuxtApp();
const { toggleDashboardSearch } = useUIState();
const { metaSymbol } = useShortcuts();

defineProps({
  label: {
    type: String,
    default: 'Search...',
  },
});
</script>

<script lang="ts">
export default {
  name: 'DashboardSearchButton',
};
</script>

<template>
  <UButton
    :icon="appConfig.ui.icons.search"
    :label="label"
    truncate
    v-bind="((!!label ? { color: 'gray' } : $ui?.button?.secondary) as any)"
    aria-label="Search"
    @click="toggleDashboardSearch"
  >
    <template
      v-if="!!label"
      #trailing
    >
      <div class="hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0">
        <UKbd>
          {{ metaSymbol }}
        </UKbd>
        <UKbd>
          K
        </UKbd>
      </div>
    </template>
  </UButton>
</template>
