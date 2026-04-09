<template>
  <v-text-field
    v-bind="$attrs"
    v-model="model"
    class="mb-4"
    :rules="validationRules"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
  import { validateUkrainian } from '@/composables/ukrainian-string-validator'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    modelValue?: string
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | undefined): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  function onBlur () {
    if (typeof model.value === 'string') {
      const trimmed = model.value.trim()
      if (trimmed !== model.value) {
        model.value = trimmed
      }
    }
  }

  const validationRules = [
    (value: string) =>
      !value || !validateUkrainian(value) || 'Це поле не має містити латинські символи',
  ]
</script>
