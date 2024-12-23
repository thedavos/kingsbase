import type { DropdownItem } from '#ui/types';

export const items: DropdownItem[][] = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4',
    },
  }], [{
    label: 'Nuevo jugador',
    icon: 'i-heroicons-user-plus',
    shortcuts: ['J'],
    to: 'admin/players/new',
  },
  {
    label: 'Nueva liga',
    icon: 'i-heroicons-globe-alt',
    shortcuts: ['L'],
    to: 'admin/leagues/new',
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    shortcuts: ['D'],
    disabled: true,
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid',
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid',
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['⌘', 'D'],
  }],
];
