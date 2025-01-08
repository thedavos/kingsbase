<script setup lang="ts">
import { z } from 'zod';
import { templateRef, useObjectUrl } from '@vueuse/core';
import { useDebounceFn } from '@vueuse/shared';
import type { BlobObject } from '@nuxthub/core';
import type { FormSubmitEvent } from '#ui/types';
import { useFileSelection } from '@/shared/composables/useFileSelection';
import { createSlug } from '@/shared/utils/slug';
import { useLeagueStore } from '@/services/useLeagueStore';
import { useImageStore } from '@/services/useImageStore';

definePageMeta({
  layout: 'admin-layout',
});

const leagueStore = useLeagueStore();
const imageStore = useImageStore();
const router = useRouter();

const file = ref<File | null>(null);
const imageSource = ref<string>('');
const autoCreateSlug = ref(true);
const isSlugManuallyEdited = ref(false);
const isLogoModalOpen = ref(false);
const isGalleryModalOpen = ref(false);

const dropzoneRef = templateRef('dropzoneRef');

async function onFilesHandler(files: FileList | File[] | null): Promise<void> {
  if (!files || !files[0]) {
    return;
  }

  file.value = files[0];
  imageSource.value = useObjectUrl(files[0] as File).value as string;
}

const { chooseFiles, isOverDropZone } = useFileSelection({
  dropzone: dropzoneRef,
  onFiles: onFilesHandler,
  allowedDataTypes: ['image/jpeg', 'image/png'],
  multiple: false,
});

const createLeagueSchema = z.object({
  name: z.string().min(1, 'Name is required'), // name must be a non-empty string
  slug: z.string().min(1, 'Slug is required'), // slug must be a non-empty string
  abbr: z.string(),
  logo: z.string(),
  twitterHandle: z.string(),
  instagramHandle: z.string(),
  website: z.string().url('Website must be an url'),
  country: z.string(),
  city: z.string(),
  foundationYear: z.string().transform(Number),
  numberOfTeams: z.number().nonnegative().min(2, 'Teams must be greater than 2'),
  description: z.string(),
  rules: z.string(),
  isActive: z.boolean(),
});

const state = reactive({
  name: '',
  slug: '',
  abbr: '',
  logo: '',
  twitterHandle: '',
  instagramHandle: '',
  website: '',
  country: '',
  city: '',
  foundationYear: '2023',
  numberOfTeams: 12,
  description: '',
  rules: '',
  isActive: true,
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

type CreateLeagueSchema = z.output<typeof createLeagueSchema>;
async function onSubmit(event: FormSubmitEvent<CreateLeagueSchema>) {
  event.preventDefault();

  if (file.value) {
    const image = await imageStore.uploadImage(file.value, 'leagues/shared/');
    const pathname = image?.pathname || '';
    state.logo = pathname;
    event.data.logo = pathname;
  }

  const newLeagueData = event.data;

  await leagueStore.createLeague(newLeagueData);
  await router.push({ name: 'admin-leagues' });
}

const uploadFile = () => {
  isLogoModalOpen.value = false;
  chooseFiles({ multiple: false });
};

const openGallery = () => {
  isLogoModalOpen.value = false;
  isGalleryModalOpen.value = true;
};

const onSelectImage = async (image: BlobObject) => {
  isGalleryModalOpen.value = false;
  state.logo = image.pathname;

  imageSource.value = `${window.location.origin}/images/${image.pathname}`;
};
</script>

<script lang="ts">
export default {
  name: 'AdminCreateLeague',
};
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardNavbar
        title="Crea una liga"
      >
        <template #right />
      </DashboardNavbar>

      <DashboardPanelContent>
        <DashboardModal
          v-model="isLogoModalOpen"
          title="Imágenes"
          description="Escoge tu imagen desde la galería en la nube o sube tu imagen desde tu computadora"
          icon="i-heroicons-photo"
        >
          <template #footer>
            <div class="grid grid-cols-2 gap-2 p-4">
              <UButton
                label="Sube"
                size="lg"
                icon="i-heroicons-arrow-up-tray"
                color="white"
                variant="solid"
                @click="uploadFile"
              />
              <UButton
                label="Galería"
                size="lg"
                color="white"
                variant="ghost"
                @click="openGallery"
              />
            </div>
          </template>
        </DashboardModal>

        <UModal v-model="isGalleryModalOpen">
          <UCard>
            <ImageGallery @select="onSelectImage" />
          </UCard>
        </UModal>

        <UForm
          :schema="createLeagueSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="grid md:grid-cols-2 gap-4 mt-4">
            <DashboardCard
              ref="dropzoneRef"
              :class="['flex items-center justify-center text-center h-full cursor-pointer border-2 border-transparent transition-all hover:border-primary-500', {
                'border-primary-500': isOverDropZone,
              }]"
              @click="isLogoModalOpen = true"
            >
              <UAvatar
                :src="imageSource"
                icon="i-heroicons-photo"
                alt="League Avatar"
                size="3xl"
              />

              <p v-if="!imageSource">
                Arrastra aquí la imagen de la liga, escoge o sube una foto
              </p>

              <p v-if="file">
                {{ file.name }}
              </p>
            </DashboardCard>

            <DashboardCard title="Nombre de la liga">
              <UFormGroup
                label="Nombre"
                name="name"
              >
                <UInput v-model="state.name" />
              </UFormGroup>

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
                name="abbr"
              >
                <UInput v-model="state.abbr" />
              </UFormGroup>
            </DashboardCard>
          </div>

          <div class="grid md:grid-cols-2 gap-4 mt-4">
            <DashboardCard title="Redes Sociales">
              <UFormGroup
                label="Página web"
                name="website"
              >
                <UInput v-model="state.website" />
              </UFormGroup>

              <UFormGroup
                label="Twitter"
                name="twitterHandle"
              >
                <UInput v-model="state.twitterHandle" />
              </UFormGroup>

              <UFormGroup
                label="Instagram"
                name="instagramHandle"
              >
                <UInput v-model="state.instagramHandle" />
              </UFormGroup>
            </DashboardCard>

            <DashboardCard title="Información extra">
              <UFormGroup
                label="País"
                name="country"
              >
                <UInput v-model="state.country" />
              </UFormGroup>

              <UFormGroup
                label="Ciudad"
                name="city"
              >
                <UInput v-model="state.city" />
              </UFormGroup>

              <UFormGroup
                name="numberOfTeams"
                :label="`Equipos registrados en la liga: ${state.numberOfTeams}`"
              >
                <URange
                  v-model="state.numberOfTeams"
                  :placeholder="state.numberOfTeams"
                  :min="0"
                  :max="12"
                />
              </UFormGroup>

              <UFormGroup
                label="Año de fundación"
                name="foundationYear"
              >
                <UInput v-model="state.foundationYear" />
              </UFormGroup>

              <UFormGroup
                label="Está activo?"
                name="isActive"
              >
                <UToggle v-model="state.isActive" />
              </UFormGroup>
            </DashboardCard>
          </div>

          <div class="grid gap-4 mt-4">
            <DashboardCard title="Descripción y reglas">
              <div class="grid md:grid-cols-2 gap-4">
                <UFormGroup
                  name="description"
                  label="Descripción"
                >
                  <UTextarea v-model="state.description" />
                </UFormGroup>

                <UFormGroup
                  name="rules"
                  label="Reglas"
                >
                  <UTextarea v-model="state.rules" />
                </UFormGroup>
              </div>
            </DashboardCard>
          </div>

          <UButton
            type="submit"
            block
          >
            Guardar
          </UButton>
        </UForm>
      </DashboardPanelContent>
    </DashboardPanel>
  </DashboardPage>
</template>

<style scoped lang="postcss">

</style>
