<template>
  <v-text-field
    v-model="model"
    v-maska="options"
    aria-label="Код ЄДРПОУ організації"
    class="organization-id"
    clearable
    name="organizationCode"
    placeholder="12345678"
    :rules="validationRules"
    validate-on="blur"
    variant="solo-inverted"
  />
</template>

<script lang="ts" setup>
  import type { MaskInputOptions } from 'maska'
  import { vMaska } from 'maska/vue'
  import { checkCode } from '@/composables/edrpou-validator'

  // Props and emits
  const props = defineProps<{
    modelValue?: string
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | undefined): void
  }>()

  // Two-way binding
  const model = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  // v-maska options
  const options = reactive<MaskInputOptions>({
    mask: 'AAAAAAAA',
    tokens: {
      A: { pattern: /\d/ },
    },
  })

  function validateCodeSafe (value: string): boolean | string {
    try {
      return checkCode(value)
    } catch (error) {
      return (error instanceof Error ? error.message : 'Це невірний ЄДРПОУ')
    }
  }

  // Validation rules
  const validationRules = [
    (value: string) =>
      !value || value.length === 8 || 'ЄДРПОУ має містити 8 цифр',
    (value: string) =>
      !value || /^\d+$/.test(value) || 'ЄДРПОУ має містити тільки цифри',
    (value: string) => {
      if (!value) return true
      return validateCodeSafe(value) || 'Невірний код ЄДРПОУ'
    },
  ]
</script>
