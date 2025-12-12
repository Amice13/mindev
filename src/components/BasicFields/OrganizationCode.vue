<template>
  <v-text-field
    v-model="model"
    v-maska="options"
    :rules="validationRules"
    placeholder="12345678"
    class="organization-id"
    validate-on="blur"
    name="organizationCode"
    variant="solo-inverted"
    clearable
  />
</template>

<script lang="ts" setup>
import type { MaskInputOptions } from 'maska'
import { vMaska } from 'maska/vue'

const checkCode = (value: number | string | undefined): boolean => {
  if (value === undefined) throw new Error('ЄДРПОУ не зазначено')
  const edrpou = String(value).padStart(8, '0')
  const isSpecific = parseInt(edrpou) > 30000000 && parseInt(edrpou) < 60000000
  const numbers = edrpou.split('').map(x => parseInt(x))
  let coefficients = isSpecific ? [7, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7]
  let sum = coefficients.reduce((acc, val, i) => acc + val * (numbers?.[i] ?? 0), 0)
  let result = sum % 11
  if (result === 10) {
    coefficients = isSpecific ? [9, 3, 4, 5, 6, 7, 8] : [3, 4, 5, 6, 7, 8, 9]
    sum = coefficients.reduce((acc, val, i) => acc + val * (numbers?.[i] ?? 0), 0)
    result = sum % 11 % 10
  }
  return numbers[7] === result
}

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
  set: value => emit('update:modelValue', value)
})

// v-maska options
const options = reactive<MaskInputOptions>({
  mask: 'AAAAAAAA',
  tokens: {
    A: { pattern: /\d/ }
  }
})

const validateCodeSafe = (value: string): boolean | string => {
  try {
    return checkCode(value)
  } catch (err) {
    return (err instanceof Error ? err.message : 'Це невірний ЄДРПОУ')
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
  }
]
</script>
