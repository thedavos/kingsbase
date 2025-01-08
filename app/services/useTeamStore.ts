import { defineStore } from 'pinia';
import type { Team } from '@/types/team';
import type { Nullable } from '@/types/utils';

export const useTeamStore = defineStore('useTeamStore', () => {
  const toast = useToast();

  // one
  const team = ref<Nullable<Team>>(null);

  // many
  const teams = ref<Team[]>([]);
  const size = ref<number>(0);
  const hasEntries = ref<boolean>(false);

  // common
  const loading = ref<boolean>(false);
  const error = ref<Nullable<Error | string>>(null);
  const query = ref<Record<string, any>>({});

  const teamsMap = computed<Map<string, Team>>(() => {
    const map = new Map<string, Team>();
    teams.value.forEach((team: Team) => map.set(team.uuid, team));
    return map;
  });

  const getTeams = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await useFetch<Team[]>('/api/teams', {
        query: query.value,
      });

      teams.value = response.data.value as Team[];
      size.value = teams.value.length;
      hasEntries.value = size.value > 0;

      toast.add({
        title: 'Equipos cargados',
        description: `Se encontraron ${size.value} equipos`,
        icon: 'i-heroicons-check-circle-20-solid',
        color: 'primary',
      });
    }
    catch (e) {
      error.value = e as Error;
      throw error;
    }
    finally {
      loading.value = false;
    }
  };

  const createTeam = async (leagueData: Partial<Team>) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await $fetch<ResponseData<Team>>('/api/teams', {
        method: 'POST',
        body: leagueData,
      });

      const newTeam = response.data;
      hasEntries.value = true;
      team.value = newTeam;
      teams.value.push(newTeam);
      size.value = teams.value.length;

      toast.add({
        title: 'Equipo creado',
        description: `El equipo "${newTeam.name}" ha sido creado exitosamente`,
        icon: 'i-heroicons-check-circle-20-solid',
        color: 'primary',
      });
    }
    catch (e) {
      error.value = e as Error;
      throw error;
    }
    finally {
      loading.value = false;
    }
  };

  return {
    team,
    teams,
    size,
    query,
    hasEntries,
    error,
    loading,
    teamsMap,
    getTeams,
    createTeam,
  };
});
