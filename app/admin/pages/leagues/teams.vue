<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import { useLeagueStore } from '@/services/useLeagueStore';
import { useTeamStore } from '@/services/useTeamStore';
import type { Team } from '@/types/team';
import { defaultTeamColumns, teamTableRowActions } from '@/admin/settings/teamTable';
import CreateTeamForm from '~/admin/components/CreateTeamForm.vue';

definePageMeta({
  layout: 'admin-layout',
});

defineShortcuts({
  '/': () => {
    input.value?.input?.focus();
  },
});

const teamStore = useTeamStore();
const { teams, loading, size } = storeToRefs(teamStore);

const leagueStore = useLeagueStore();
const { leaguesMap } = storeToRefs(leagueStore);
const uuid = useRouteParams('uuid', null);

const isNewTeamModalOpen = ref(false);
const q = ref('');
const input = ref<{ input: HTMLInputElement }>();
const selected = ref<Team[]>([]);
const selectedColumns = ref(defaultTeamColumns);
const sort = ref({ column: 'uuid', direction: 'asc' as const });

await useLazyAsyncData(() => teamStore.getTeams().then(() => true));

const columns = computed(() => defaultTeamColumns.filter(column => selectedColumns.value.includes(column)));
const league = computed(() => uuid.value ? leaguesMap.value.get(uuid.value) : null);
const teamRows = computed(() => teams.value.map(team => ({ ...team, league: league.value || null })));
</script>

<script lang="ts">
export default {
  name: 'AdminTeams',
};
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardNavbar
        title="Equipos"
        :badge="size"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filtra equipos..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="Nuevo Equipo"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewTeamModalOpen = true"
          />
        </template>
      </DashboardNavbar>

      <DashboardModal
        v-model="isNewTeamModalOpen"
        title="Nuevo equipo"
        :description="league ? `Agrega un nuevo equipo a la ${league.name}` : 'Agrega un nuevo equipo'"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <CreateTeamForm
          :league="league"
          @close="isNewTeamModalOpen = false"
        />
      </DashboardModal>

      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="teamRows"
        :columns="columns"
        :loading="loading"
        :empty-state="{ icon: 'i-heroicons-user-group-20-solid', label: 'No se encontraron equipos registrados.' }"
        sort-mode="manual"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800', wrapper: 'h-full' }"
      >
        <template #logo-data="{ row }">
          <div class="flex items-center gap-3">
            <NuxtImg
              v-if="row.logo"
              width="40"
              height="40"
              provider="nuxthub"
              :src="row.logo"
            />
          </div>
        </template>

        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <template #league-data="{ row }">
          <div
            v-if="row.league"
            class="flex items-center gap-3"
          >
            <span class="text-gray-900 dark:text-white font-medium">{{ row.league.abbr }}</span>
          </div>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="teamTableRowActions(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </DashboardPanel>
  </DashboardPage>
</template>

<style scoped lang="postcss">

</style>
