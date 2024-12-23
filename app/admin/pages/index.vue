<script setup lang="ts">
import { items as dropdownItems } from '@/admin/settings/navDropdownItems';

definePageMeta({
  layout: 'admin-layout',
});
</script>

<script lang="ts">
export default {
  name: 'AdminHome',
};
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardNavbar title="Home">
        <template #right>
          <UDropdown
            :items="dropdownItems"
          >
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="rounded-full"
            />
          </UDropdown>
        </template>
      </DashboardNavbar>

    <!--      <DashboardPanelContent /> -->
    </DashboardPanel>
  </DashboardPage>
</template>

<style scoped lang="postcss">

</style>
