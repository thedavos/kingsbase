import { defineStore } from 'pinia';
import type { League } from '@/types/league';
import type { Nullable } from '@/types/utils';

export const useLeagueStore = defineStore('useLeagueStore', () => {
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
    }
    catch (e) {
      error.value = e as Error;
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
  };
});
