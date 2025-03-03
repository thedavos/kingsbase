<script setup lang="ts">
import type { PropType } from 'vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import DashboardPanelHandle from './DashboardPanelHandle.vue';
import type { DeepPartial } from '#ui/types';
import { useUIState } from '@/shared/composables/useUIState';
import { useResizable } from '@/shared/composables/useResizable';

const config = {
  wrapper: 'flex-col items-stretch relative w-full',
  border: 'border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0',
  grow: 'flex-1',
  collapsible: 'hidden lg:flex',
  slideover: 'lg:hidden',
};

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  grow: {
    type: Boolean,
    default: false,
  },
  resizable: {
    type: [Boolean, Object],
    default: false,
  },
  width: {
    type: Number,
    default: undefined,
  },
  breakpoint: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | '2xl'>,
    default: 'lg',
  },
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined,
  },
  ui: {
    type: Object as PropType<DeepPartial<typeof config>>,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue']);

const id = props.id ? `dashboard:panel:${props.id}` : useId();
const { ui, attrs } = useUI('dashboard.panel', toRef(props, 'ui'), config, toRef(props, 'class'), true);
const { el, width, onDrag, isDragging } = props.resizable ? useResizable(id || 'dashboard:panel', { ...(typeof props.resizable === 'object' ? props.resizable : {}), value: props.width }) : { el: ref(undefined), width: toRef(props.width), onDrag: undefined, isDragging: undefined };
const breakpoints = useBreakpoints(breakpointsTailwind);

const { isDashboardSidebarSlideoverOpen } = useUIState();

const smallerThanLg = breakpoints.smaller(props.breakpoint);

const isOpen = computed({
  get() {
    return props.modelValue !== undefined ? props.modelValue : isDashboardSidebarSlideoverOpen.value;
  },
  set(value) {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value);
    }
    else {
      isDashboardSidebarSlideoverOpen.value = value;
    }
  },
});

defineExpose({
  width,
  isDragging,
});

provide('isOpen', isOpen);
</script>

<script lang="ts">
export default {
  name: 'DashboardPanel',
};
</script>

<template>
  <div
    ref="el"
    v-bind="{ ...attrs, ...$attrs }"
    :class="[ui.wrapper, grow ? ui.grow : ui.border, collapsible ? ui.collapsible : 'flex']"
    :style="{ '--width': width && !grow ? `${width}px` : undefined }"
  >
    <slot />

    <slot
      name="handle"
      :on-drag="onDrag"
    >
      <DashboardPanelHandle
        v-if="resizable && !grow"
        @mousedown="onDrag"
      />
    </slot>
  </div>

  <ClientOnly>
    <USlideover
      v-if="collapsible && smallerThanLg"
      v-model="isOpen"
      :side="side"
      v-bind="{ ...attrs, ...$attrs }"
      appear
      :class="ui.slideover"
    >
      <slot />
    </USlideover>
  </ClientOnly>
</template>
