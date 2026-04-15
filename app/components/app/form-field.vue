<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  type?: "text" | "textarea";
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="type || 'input'"
      :name="props.name"
      :type="type || 'text'"
      class="input w-full"
      :class="{
        'input-error': props.error,
        'input': !type || type === 'text',
        'textarea': type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
