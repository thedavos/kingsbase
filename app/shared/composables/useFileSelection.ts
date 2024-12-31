import { useDropZone, useFileDialog } from '@vueuse/core';

export interface UseFileSelectionOptions {
  allowedDataTypes?: MaybeRef<string[]> | ((types: readonly string[]) => boolean);
  dropzone: any;
  multiple: boolean;
  onFiles: (files: File[] | FileList) => void;
}

/**
 * File selection composable
 * Copied from <https://github.com/vueuse/vueuse/issues/4085#issuecomment-2221179677>
 */
export function useFileSelection(options: UseFileSelectionOptions) {
  // Extract options
  const { dropzone, multiple, allowedDataTypes, onFiles } = options;
  const filesRef = ref<FileList | File[] | null>(null);

  // Data types computed ref
  const dataTypes = computed(() => {
    if (allowedDataTypes) {
      return unref(allowedDataTypes);
    }

    return undefined;
  });

  // Accept string computed ref
  const accept = computed(() => {
    if (Array.isArray(dataTypes.value)) {
      return dataTypes.value.join(',');
    }
    return '*';
  });

  // Handling of files drop
  const onDrop = (files: FileList | File[] | null) => {
    if (!files || files.length === 0) {
      return;
    }

    if (files instanceof FileList) {
      filesRef.value = Array.from(files);
    }

    if (files.length > 1 && !multiple) {
      filesRef.value = [files[0]!];
    }

    if (!filesRef.value && files.length > 0) {
      filesRef.value = files;
    }

    onFiles(files);
  };

  // Setup dropzone and file dialog composables
  const { isOverDropZone } = useDropZone(dropzone, { dataTypes: allowedDataTypes, onDrop: files => files && onDrop(files) });
  const { onChange, open } = useFileDialog({
    accept: accept.value,
    multiple: multiple,
  });

  // Use onChange handler
  onChange(fileList => onDrop(fileList));

  // Expose interface
  return {
    isOverDropZone,
    chooseFiles: open,
  };
}
