<script setup lang="ts">
import type { League } from '@/types/league';

type DashboardLeagueNetworkCard = {
  id: string;
  icon: string;
  network: string;
  link: string;
};

const props = defineProps({
  league: {
    type: Object as PropType<League>,
    default: undefined,
  },
});

const socialNetworks = computed(() => {
  return [{
    id: 'social-network-instagram',
    icon: 'i-simple-icons-instagram',
    network: props.league?.instagramHandle,
    link: `https://www.instagram.com/${props.league?.instagramHandle || ''}`,
  }, {
    id: 'social-network-twitter',
    icon: 'i-simple-icons-twitter',
    network: props.league?.twitterHandle,
    link: `https://x.com/${props.league?.twitterHandle || ''}`,
  }, {
    id: 'social-network-website',
    icon: 'i-heroicons-globe-alt',
    network: props.league?.website,
    link: props.league?.website,
  }].filter(({ network }) => Boolean(network)) as DashboardLeagueNetworkCard[];
});
</script>

<template>
  <DashboardCard
    class="cursor-pointer"
  >
    <template #title>
      <div class="flex items-center">
        <NuxtImg
          v-if="league.logo"
          width="40"
          provider="nuxthub"
          class="rounded-xl"
          :src="league.logo"
        />

        <p class="ml-2">
          {{ league.abbr }}
        </p>
      </div>
    </template>

    <template #footer>
      <div class="text-end">
        <UChip
          v-for="(social, index) in socialNetworks"
          :key="social.id"
          :show="false"
          :class="index === 0 ? '' : 'ml-2'"
        >
          <UButton
            color="gray"
            target="_blank"
            :to="social.link"
            :icon="social.icon"
          />
        </UChip>
      </div>
    </template>
  </DashboardCard>
</template>

<style scoped lang="postcss">

</style>
