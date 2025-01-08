import type { BlobObject } from '@nuxthub/core';
import type { Nullable } from '@/types/utils';

export const useImageStore = defineStore('useImageStore', () => {
  const toast = useToast();

  // Estado
  const loading = ref<boolean>(false);
  const error = ref<Nullable<Error | string>>(null);
  const currentImage = ref<Nullable<BlobObject>>(null);

  // Validaciones
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

  const validateFile = (file: File): boolean => {
    // Validar que existe archivo
    if (!file) {
      toast.add({
        title: 'Error',
        description: 'No se encontró archivo para subir',
        color: 'red',
        icon: 'i-heroicons-exclamation-circle-20-solid',
      });

      return false;
    }

    // Validar tamaño
    if (file.size > MAX_FILE_SIZE) {
      toast.add({
        title: 'Error',
        description: 'El archivo excede el tamaño máximo permitido (8MB)',
        color: 'red',
        icon: 'i-heroicons-exclamation-circle-20-solid',
      });

      return false;
    }

    // Validar tipo
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.add({
        title: 'Error',
        description: 'Solo se permiten archivos PNG y JPEG',
        color: 'red',
        icon: 'i-heroicons-exclamation-circle-20-solid',
      });

      return false;
    }

    return true;
  };

  const uploadImage = async (file: File, prefix?: string): Promise<BlobObject | null> => {
    try {
      if (!validateFile(file)) {
        return null;
      }

      loading.value = true;
      error.value = null;

      const query = {};
      const formData = new FormData();
      formData.append('file', file);

      if (prefix) Object.assign(query, { prefix: prefix || '' });

      const uploader = useUpload('/api/images/upload', {
        method: 'POST',
        body: formData,
        formKey: 'files',
        query,
      });

      const response = await uploader(file);

      currentImage.value = response;

      toast.add({
        title: 'Imagen subida',
        description: 'La imagen se ha subido exitosamente',
        icon: 'i-heroicons-check-circle-20-solid',
        color: 'primary',
      });

      return response;
    }
    catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error al subir la imagen';
      error.value = errorMessage;

      toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'red',
        icon: 'i-heroicons-exclamation-circle-20-solid',
      });

      return null;
    }
    finally {
      loading.value = false;
    }
  };

  return {
    loading,
    currentImage,
    validateFile,
    uploadImage,
  };
});
