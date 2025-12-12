<template>
  <v-text-field
    v-model="model"
    v-maska="options"
    :rules="rules"
    class="passport"
    placeholder="АН 000000 / 123456789"
    validate-on="blur"
    name="passport"
    variant="solo-inverted"
    clearable
  />
</template>

<script setup lang="ts">
import type { MaskInputOptions } from 'maska'
import { vMaska } from 'maska/vue'

const props = defineProps<{
  modelValue: string | undefined
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// v-model bridge
const model = computed({
  get: () => props.modelValue,
  set: (value: string): void => emit('update:modelValue', value)
})

// Mask options for v-maska
const options = reactive<MaskInputOptions>({
  mask: ['AAAAAAAAA', 'BB AAAAAA'],
  tokens: {
    A: { pattern: /\d/ },
    B: {
      pattern: /[А-Я]/i,
      transform: (chr: string) => chr.toUpperCase()
    }
  }
})

// Validation rules
const rules = [
  (value: string) =>
    !value || value.length === 9 || 'Це неповний номер паспорта',
  (value: string) =>
    !value || /^\d{9}$/.test(value) || /^[а-я]{2} \d{6}$/i.test(value) || 'Цей номер паспорта невірний'
]
</script>
