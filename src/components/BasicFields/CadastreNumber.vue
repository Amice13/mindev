<template>
  <v-text-field
    v-model="model"
    v-maska="cadastreMaska"
    placeholder="1234567890:12:123:1234"
    variant="solo-inverted"
  />
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'

interface Props {
  modelValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const tokens = {
  D: {
    pattern: /:/
  },
  A: {
    pattern: /\d/
  }
}

const cadastreMaska = {
  mask: 'AAAAAAAAAADAADAAADAAAA',
  tokens
}
</script>