import type { DashboardSidebarLink } from '@/types/ui';

export const sidebarLinks: DashboardSidebarLink[] = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/admin',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H'],
    },
  },
  {
    label: 'Ligas',
    icon: 'i-heroicons-globe-alt',
    to: '/admin/leagues',
    tooltip: {
      text: 'Ligas',
      shortcuts: ['G', 'L'],
    },
  },
  {
    label: 'Jugadores',
    icon: 'i-heroicons-user-group',
    to: '/admin/players',
    tooltip: {
      text: 'Jugadores',
      shortcuts: ['G', 'P'],
    },
  },
];
