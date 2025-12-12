<template>
  <tabular-data
    v-model="model"
    :schema="apartment"
  />
</template>

<script setup lang="ts">
import { apartment } from '@/schemas/apartment.schema'
import type { Act } from '@/types'
type Apartment = Act['apartment']

interface Props {
  modelValue: NonNullable<Apartment>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Apartment>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Apartment>) => emit('update:modelValue', value)
})
</script>