<template>
  <text-data
    v-model="model"
    :schema="internalSystems"
  />
</template>

<script setup lang="ts">
import { internalSystems } from '@/schemas/internal-systems.schema'
import type { Act } from '@/types'
type InternalSystems = Act['internalSystems']

interface Props {
  modelValue: NonNullable<InternalSystems>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<InternalSystems>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<InternalSystems>) => emit('update:modelValue', value)
})
</script>