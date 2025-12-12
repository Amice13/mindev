<template>
  <text-data
    v-model="model"
    :schema="apartmentInternalSystems"
  />
</template>

<script setup lang="ts">
import { apartmentInternalSystems } from '@/schemas/apartment-internal-systems.schema'
import type { Act } from '@/types'
type ApartmentInternalSystems = Act['apartmentInternalSystems']

interface Props {
  modelValue: NonNullable<ApartmentInternalSystems>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<ApartmentInternalSystems>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<ApartmentInternalSystems>) => emit('update:modelValue', value)
})
</script>