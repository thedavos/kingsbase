import { defineStore } from 'pinia';
import type { League } from '@/types/league';
import type { Nullable } from '@/types/utils';

export const useLeagueStore = defineStore('useLeagueStore', () => {
  const toast = useToast();

  // one
  const league = ref<Nullable<League>>(null);

  // many
  const leagues = ref<League[]>([]);
  const size = ref<number>(0);
  const hasEntries = ref<boolean>(false);

  // common
  const loading = ref<boolean>(false);
  const error = ref<Nullable<Error | string>>(null);

  const leaguesMap = computed<Map<string, League>>(() => {
    const map = new Map<string, League>();
    leagues.value.forEach((league: League) => map.set(league.uuid, league));
    return map;
  });

  const getLeagues = async () => {
    try {
      loading.value = true;
      error.value = null;

      const response = await useFetch<League[]>('/api/leagues');
      leagues.value = response.data.value as League[];
      size.value = leagues.value.length;
      hasEntries.value = size.value > 0;

      toast.add({
        title: 'Ligas cargadas',
        description: `Se encontraron ${size.value} ligas`,
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

  const createLeague = async (leagueData: Partial<League>) => {
    try {
      loading.value = true;
      error.value = null;

      const response = await $fetch<ResponseData<League>>('/api/leagues', {
        method: 'POST',
        body: leagueData,
      });

      const newLeague = response.data;
      hasEntries.value = true;
      league.value = newLeague;

      toast.add({
        title: 'Liga creada',
        description: `La liga "${newLeague.name}" ha sido creada exitosamente`,
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
    league,
    leagues,
    size,
    hasEntries,
    error,
    loading,
    leaguesMap,
    getLeagues,
    createLeague,
  };
});
