<script setup lang="ts">
import whiteAsset from '@/assets/logo/gurukings-white.png';
import darkAsset from '@/assets/logo/gurukings-black.svg';

const dark = useColorMode();

const isDark = ref('dark');

watch(dark, () => {
  isDark.value = dark.value;
});

onMounted(() => {
  isDark.value = dark.value;
});

const logo = computed(() => isDark.value ? whiteAsset : darkAsset);
</script>

<template>
  <img
    alt="logo"
    :src="logo"
  >
</template>
