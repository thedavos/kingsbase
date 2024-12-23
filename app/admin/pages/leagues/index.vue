<script setup lang="ts">
import { useLeagueStore } from '@/services/useLeagueStore';

definePageMeta({
  layout: 'admin-layout',
});

const { leagues, size, getLeagues } = useLeagueStore();

const q = ref('');
const input = ref<{ input: HTMLInputElement }>();

// getLeagues();
await useAsyncData(() => getLeagues().then(() => true));

defineShortcuts({
  '/': () => {
    input.value?.input?.focus();
  },
});
</script>

<script lang="ts">
export default {
  name: 'AdminLeagues',
};
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardNavbar
        title="Ligas"
        :badge="size"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filtra ligas..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="Nueva Liga"
            trailing-icon="i-heroicons-plus"
            color="gray"
            :to="{ name: 'leagues-new' }"
          />
        </template>
      </DashboardNavbar>

      <div class="leagues-cards">
        <DashboardCard
          v-for="league in leagues"
          :key="league.uuid"
          :title="league.name"
          :description="league.logo || ''"
          class="cursor-pointer"
        >
          <NuxtImg
            v-if="league.logo"
            :src="league.logo"
          />
        </DashboardCard>
      </div>
    </DashboardPanel>
  </DashboardPage>
</template>

<style scoped lang="postcss">
.leagues-cards {
  display: grid;
  grid-gap: 16px;
  padding: 24px;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
