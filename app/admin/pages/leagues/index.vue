<script setup lang="ts">
import { useLeagueStore } from '@/services/useLeagueStore';
import DashboardLeagueCard from '~/admin/components/DashboardLeagueCard.vue';
import type { League } from '@/types/league';

definePageMeta({
  layout: 'admin-layout',
});

const router = useRouter();
const leagueStore = useLeagueStore();
const { leagues, size } = storeToRefs(leagueStore);

const q = ref('');
const input = ref<{ input: HTMLInputElement }>();

defineShortcuts({
  '/': () => {
    input.value?.input?.focus();
  },
});

const onLeagueCard = (league: League) => {
  router.push({ name: 'leagues-teams', params: { uuid: league.uuid } });
};
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
        <DashboardLeagueCard
          v-for="league in leagues"
          :key="league.uuid"
          :league="league"
          @click="onLeagueCard(league)"
        />
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
