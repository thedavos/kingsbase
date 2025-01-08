<script setup lang="ts">
import { z } from 'zod';
import { templateRef, useObjectUrl } from '@vueuse/core';
import { useDebounceFn } from '@vueuse/shared';
import { createSlug } from '@/shared/utils/slug';
import { useFileSelection } from '@/shared/composables/useFileSelection';
import { useLeagueStore } from '@/services/useLeagueStore';
import { useTeamStore } from '@/services/useTeamStore';
import { useImageStore } from '@/services/useImageStore';
import type { League } from '@/types/league';
import type { FormSubmitEvent } from '#ui/types';

type CreateTeamState = {
  name: string;
  shortName: string;
  slug: string;
  abbreviation: string;
  logo: string;
  foundationYear: string;
  budget: number | undefined;
  isActive: boolean;
  leagueId: number | undefined;
};

const props = defineProps({
  league: {
    type: Object as PropType<League | null | undefined>,
  },
});

const emit = defineEmits(['close']);

const avatarDropzoneRef = templateRef('avatarDropzoneRef');
const { chooseFiles } = useFileSelection({
  dropzone: avatarDropzoneRef,
  onFiles: onFilesHandler,
  allowedDataTypes: ['image/jpeg', 'image/png', 'image/webp'],
  multiple: false,
});

const imageStore = useImageStore();
const leagueStore = useLeagueStore();
const teamStore = useTeamStore();
const { leagues } = storeToRefs(leagueStore);

const autoCreateSlug = ref(true);
const isSlugManuallyEdited = ref(false);
const file = ref<File | null>(null);
const imageSource = ref<string>('');

const state = reactive<CreateTeamState>({
  name: '',
  shortName: '',
  slug: '',
  abbreviation: '',
  logo: '',
  foundationYear: '2022',
  budget: undefined,
  isActive: true,
  leagueId: undefined,
});

const createTeamSchema = z.object({
  name: z.string().min(1, 'Name is required'), // name must be a non-empty string
  shortName: z.string().min(1, 'ShortName is required'), // name must be a non-empty string
  slug: z.string().min(1, 'Slug is required'), // slug must be a non-empty string
  abbreviation: z.string(),
  logo: z.string(),
  foundationYear: z.string().transform(Number),
  budget: z.string().transform(Number).optional(),
  isActive: z.boolean(),
});

const leagueSelectOptions = computed(() => {
  const leaguesOptions = leagues.value.map(league => ({
    id: league.uuid,
    value: league.id,
    label: league.name,
  }));

  return [
    {
      id: 'none',
      value: null,
      label: 'Ninguna',
    },
    ...leaguesOptions,
  ];
});

onMounted(() => {
  if (props.league) state.leagueId = props.league.id;
});

watch(
  () => state.name,
  useDebounceFn((newName) => {
    if (!newName) {
      state.slug = '';
      return;
    }

    if (autoCreateSlug.value && !isSlugManuallyEdited.value) {
      state.slug = createSlug(newName);
    }
  }, 300),
  {
    immediate: false,
  },
);

watch(() => state.slug, () => {
  if (!state.name) return;

  const expectedSlug = createSlug(state.name);
  isSlugManuallyEdited.value = state.slug !== expectedSlug;
});

async function onFilesHandler(files: FileList | File[] | null): Promise<void> {
  if (!files || !files[0]) {
    return;
  }

  file.value = files[0];
  imageSource.value = useObjectUrl(files[0] as File).value as string;
}

async function uploadFile() {
  chooseFiles({ multiple: false });
}

type CreateTeamSchema = z.output<typeof createTeamSchema>;
async function onSubmit(event: FormSubmitEvent<CreateTeamSchema>) {
  event.preventDefault();

  if (file.value) {
    const image = await imageStore.uploadImage(file.value, 'teams/logos/');
    const pathname = image?.pathname || '';
    state.logo = pathname;
    event.data.logo = pathname;
  }

  const newTeamData = event.data;
  await teamStore.createTeam(newTeamData);

  emit('close');
}
</script>

<script lang="ts">
export default {
  name: 'CreateTeamForm',
};
</script>

<template>
  <UForm
    class="space-y-6 md:space-y-4"
    :state="state"
    :schema="createTeamSchema"
    :validate-on="['submit']"
    @submit="onSubmit"
  >
    <div class="text-center">
      <div
        class="inline-block rounded-full cursor-pointer"
        @click="uploadFile"
      >
        <UAvatar
          ref="avatarDropzoneRef"
          size="3xl"
          :src="imageSource"
          :alt="state.name || 'CreateTeamAvatar'"
          :icon="state.name ? '' : 'i-heroicons-photo'"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <UFormGroup
        label="Nombre"
        name="name"
      >
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup
        label="Nombre acortado"
        name="shortName"
      >
        <UInput v-model="state.shortName" />
      </UFormGroup>
    </div>

    <UFormGroup
      label="Slug"
      name="slug"
    >
      <UInput
        v-model="state.slug"
        :disabled="autoCreateSlug"
      />
    </UFormGroup>

    <UFormGroup
      label="Nombre abreviado"
      name="abbreviation"
    >
      <UInput v-model="state.abbreviation" />
    </UFormGroup>

    <div class="grid grid-cols-2 gap-4">
      <UFormGroup
        label="Año de fundación"
        name="foundationYear"
      >
        <UInput v-model="state.foundationYear" />
      </UFormGroup>

      <UFormGroup
        label="Presupuesto"
        name="budget"
      >
        <UInput v-model="state.budget" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UBadge
        v-if="league"
        color="white"
        variant="solid"
      >
        {{ league.name }}
      </UBadge>
      <UFormGroup
        v-else
        label="A qué liga pertenecerá"
        name="leagueId"
      >
        <USelectMenu
          v-model="state.leagueId"
          value-attribute="value"
          :options="leagueSelectOptions"
        />
      </UFormGroup>
      <UFormGroup
        label="Está activo?"
        name="isActive"
      >
        <UToggle v-model="state.isActive" />
      </UFormGroup>
    </div>

    <div class="flex justify-center md:justify-end">
      <UButton
        label="Cancelar"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton
        type="submit"
        label="Guardar equipo"
        color="black"
      />
    </div>
  </UForm>
</template>

<style scoped lang="postcss">

</style>
