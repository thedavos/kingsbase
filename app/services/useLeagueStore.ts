import { defineStore } from 'pinia';
import type { League } from '@/types/league';
import type { Nullable } from '@/types/utils';

interface LeagueState {
  // one
  league: Nullable<League>;

  // many
  leagues: League[];
  size: number;
  hasEntries: boolean;

  // common
  loading: boolean;
  error: Nullable<Error | string>;
  notification: Nullable<string>;
}

export const useLeagueStore = defineStore('useLeagueStore', () => {
  const state = reactive<LeagueState>({
    // one

    league: null,
    // many
    leagues: [],
    size: 0,
    hasEntries: false,

    // common
    loading: false,
    error: null,
    notification: '',
  });

  const leaguesMap = computed<Map<string, League>>(() => {
    const map = new Map<string, League>();
    state.leagues.forEach((league: League) => map.set(league.uuid, league));
    return map;
  });

  const getLeagues = async () => {
    try {
      state.loading = true;
      state.error = null;
      const response = await useFetch<League[]>('/api/leagues');
      state.leagues = response.data.value as League[];
      state.size = state.leagues.length;
      state.hasEntries = state.size > 0;
    }
    catch (e) {
      state.error = e as Error;
    }
    finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    leaguesMap,
    getLeagues,
  };
});
