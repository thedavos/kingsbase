<script setup lang="ts">
import { useDashboard } from '@/admin/composables/useDashboard';
import { sidebarLinks } from '@/admin/settings/sidebarLinks';
import type { Group } from '#ui/types';

import { useLeagueStore } from '@/services/useLeagueStore';

const route = useRoute();
const { isHelpSlideoverOpen } = useDashboard();
const leagueStore = useLeagueStore();
const { leagues } = storeToRefs(leagueStore);

await useLazyAsyncData(() => leagueStore.getLeagues().then(() => true));

const footerLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
  to: '/settings/members',
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
  click: () => isHelpSlideoverOpen.value = true,
}];

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: sidebarLinks.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank');
    },
  }],
}] as Group[];

const sidebarLeagues = computed(() => leagues.value.map(league => ({ label: league.name, to: { name: 'leagues-teams', params: { uuid: league.uuid } } })));
</script>

<script lang="ts">
export default {
  name: 'AdminLayout',
};
</script>

<template>
  <DashboardLayout>
    <DashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <DashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <h1 class="my-auto">
            Kingsbase Admin
          </h1>
        </template>
      </DashboardNavbar>

      <DashboardSidebar>
        <template #header>
          <DashboardSearchButton />
        </template>

        <DashboardSidebarLinks :links="sidebarLinks" />

        <UDivider />

        <DashboardSidebarLinks
          :links="[{ label: 'Ligas', draggable: true, children: sidebarLeagues }]"
        />

        <div class="flex-1" />

        <DashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <!--                    <UserDropdown /> -->
        </template>
      </DashboardSidebar>
    </DashboardPanel>

    <slot />

    <!--    &lt;!&ndash; ~/components/HelpSlideover.vue &ndash;&gt; -->
    <!--    <HelpSlideover /> -->
    <!--    &lt;!&ndash; ~/components/NotificationsSlideover.vue &ndash;&gt; -->
    <!--    <NotificationsSlideover /> -->

    <ClientOnly>
      <LazyDashboardSearch :groups="groups" />
    </ClientOnly>
  </DashboardLayout>
</template>
