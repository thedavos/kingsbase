<script setup lang="ts">
import HomeCardList from '@/home/components/HomeCardList.vue';
import { HOME_CARDS } from '@/home/settings';
import type { HomeCard } from '@/home/types';
// const { data: leagues } = await useFetch('/api/leagues');
// console.log('leagues: ', leagues.value);
definePageMeta({
  layout: 'home-layout',
});

const router = useRouter();

const goToCard = (card: HomeCard) => {
  router.push(card.to);
};
</script>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<template>
  <div>
    <HomeCardList
      :home-cards="HOME_CARDS"
      @enter-card="goToCard"
    />
  </div>
</template>
