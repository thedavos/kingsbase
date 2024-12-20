import type { League } from '@/types/league';

export const useLeagues = () => {
  // list
  const leagues = ref<League[]>([]);
  const size = ref<number>(0);
  const hasEntries = ref<boolean>(false);

  // one
  const league = ref<League | null>(null);

  // common
  const loading = ref<boolean>(false);
  const error = ref<Error | string | null>(null);

  const getLeagues = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await useFetch<League[]>('/api/leagues');
      leagues.value = response.data.value as League[];
      console.log('leagues: ', leagues.value);
      size.value = leagues.value.length;
      hasEntries.value = leagues.value.length > 0;
    }
    catch (e) {
      error.value = e as Error;
    }
    finally {
      loading.value = false;
    }
  };

  return {
    getLeagues,
    loading,
    error,
    leagues,
    league,
    size,
    hasEntries,
  };
};
