export const defaultTeamColumns = [{
  key: 'uuid',
  label: '#',
}, {
  key: 'logo',
  label: 'Logo',
  sortable: true,
}, {
  key: 'name',
  label: 'Nombre',
  sortable: true,
}, {
  key: 'abbreviation',
  label: 'Abreviación',
}, {
  key: 'foundationYear',
  label: 'Año de fundación',
  sortable: true,
}, {
  key: 'league',
  label: 'Liga',
  sortable: true,
}, {
  key: 'actions',
}];

export const teamTableRowActions = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id),
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
  }], [{
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid',
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
  }],
];
