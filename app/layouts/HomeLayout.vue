<script setup lang="ts">
import KHeader from '@/shared/components/header/KHeader.vue';
import { useBreadcrumbs } from '@/home/composables/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();
</script>

<script lang="ts">
export default {
  name: 'HomeLayout',
};
</script>

<template>
  <div class="home-layout">
    <KMain class="min-h-screen">
      <KHeader
        :ui="{ wrapper: 'bg-transparent static', container: 'justify-center', left: '', right: '' }"
        title="Kingsbase"
      />
      <UContainer
        :ui="{ constrained: 'max-w-5xl' }"
        class="flex flex-col justify-center"
      >
        <UBreadcrumb
          :links="breadcrumbs"
          divider="/"
          class="my-10"
        />
        <slot />
      </UContainer>
    </KMain>
  </div>
</template>

<style scoped lang="postcss">
.home-layout {
  background: url("@/assets/theming/kings-theme-1.png") no-repeat center center fixed;
  background-size: cover;
}
</style>
