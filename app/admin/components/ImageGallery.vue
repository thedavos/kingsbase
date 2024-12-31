<script setup lang="ts">
import { z } from 'zod';
import { useFileDialog, useObjectUrl } from '@vueuse/core';
import { useImageStore } from '@/services/useImageStore';

const props = defineProps({
  prefix: {
    type: String,
    default: 'leagues/shared/',
  },
});

const emit = defineEmits(['uploaded', 'select']);

const { data: images, refresh } = await useFetch('/api/images');
const { onChange, open: chooseFile } = useFileDialog({
  accept: '*',
  multiple: false,
});
const imageStore = useImageStore();

const uploadImageSchema = z.object({
  prefix: z.string().optional(),
});

const uploadImageState = reactive({
  prefix: '',
});

const file = ref<File | null>(null);

const imageSource = computed(() => {
  if (!file.value) return undefined;

  return useObjectUrl(file.value).value;
});

onChange((fileList) => {
  if (!fileList || fileList.length === 0) {
    return;
  }

  if (fileList instanceof FileList) {
    const files = Array.from(fileList);
    file.value = files[0] as File;
  }
});

async function uploadImage(e: Event) {
  if (!imageStore.validateFile(file.value as File)) return;

  const image = await imageStore.uploadImage(file.value as File, props.prefix);

  emit('uploaded', {
    pathname: image?.pathname,
    image,
  });

  const form = e.target as HTMLFormElement;
  form.reset();
  await refresh();
}

async function deleteImage(pathname: string) {
  await $fetch(`/api/images/${pathname}`, { method: 'DELETE' });
  await refresh();
}
</script>

<template>
  <div>
    <h2 class="font-semibold text-center mb-4">
      Módulo de imágenes
    </h2>
    <UDivider
      label="Sube una imagen"
      class="mb-4"
    />
    <UCard class="mb-4">
      <UForm
        :schema="uploadImageSchema"
        :state="uploadImageState"
        @submit.prevent="uploadImage"
      >
        <div class="grid grid-cols-2 gap-4">
          <UFormGroup
            label="Prefijo de la imagen"
            name="prefix"
            class="flex flex-col justify-center"
          >
            <UButtonGroup
              size="md"
              orientation="horizontal"
            >
              <UInput
                v-model="uploadImageState.prefix"
                size="md"
                placeholder="leagues/shared/"
              />
              <UButton
                icon="i-heroicons-photo"
                color="gray"
                @click="chooseFile"
              />
            </UButtonGroup>
          </UFormGroup>
          <div
            class="w-full flex items-center justify-center"
          >
            <img
              v-if="file"
              :src="imageSource"
              :alt="file.name"
              class="w-24"
            >
          </div>
        </div>

        <div class="w-full mt-6 text-center">
          <UButton
            type="submit"
            label="Subir imagen"
            size="md"
            color="white"
            variant="solid"
          />
        </div>
      </UForm>
    </UCard>

    <UDivider
      label="Selecciona una imagen"
      class="mb-4"
    />

    <UCard>
      <UCarousel
        v-slot="{ item }"
        :items="images"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/3',
          container: 'rounded-lg',
        }"
        :prev-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-left-20-solid',
          class: '-start-12',
        }"
        :next-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-right-20-solid',
          class: '-end-12',
        }"
        arrows
        class="w-72 mx-auto"
      >
        <NuxtImg
          :src="item.pathname"
          :alt="item.pathname"
          provider="nuxthub"
          class="w-full cursor-pointer"
          draggable="false"
          @dblclick="deleteImage"
          @click="() => emit('select', item)"
        />
      </UCarousel>
    </UCard>
  </div>
</template>

<style scoped lang="postcss">

</style>
