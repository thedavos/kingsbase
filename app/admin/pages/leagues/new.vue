<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
});
</script>

<script lang="ts">
export default {
  name: 'AdminCreateLeague',
};
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardNavbar
        title="Crea una liga"
      >
        <template #right />
      </DashboardNavbar>
    </DashboardPanel>
  </DashboardPage>
</template>

<style scoped lang="postcss">

</style>
