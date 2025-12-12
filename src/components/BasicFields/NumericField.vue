<template>
  <v-text-field
    v-model.number="model"
    v-maska="numericMaska"
    :density="density"
    placeholder="#.##"
    variant="solo-inverted"
    inputmode="decimal"
    novalidate
    :hide-details="hideDetails"
  />
</template>

<script lang="ts" setup>
import { vMaska } from 'maska/vue'
import type { Density } from 'vuetify/lib/composables/density.mjs'

interface Props {
  modelValue?: number
  hideDetails?: boolean
  density?: Density
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: number) => emit('update:modelValue', value)
})

const tokens = {
  D: {
    pattern: /\./,
    optional: true
  },
  A: {
    pattern: /\d/,
    multiple: true
  },
  B: {
    pattern: /\d/
  }
}

const numericMaska = {
  mask: 'ADBB',
  tokens
}
</script>