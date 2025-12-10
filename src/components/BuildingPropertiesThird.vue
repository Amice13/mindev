<template>
  <tabular-data
    v-model="model"
    :schema="buildingProperty"
    value-type="number"
    :allowedValues="allowedValues"
  />
</template>

<script setup lang="ts">
import { buildingProperty } from '@/schemas/building-property.schema'
import type { Act } from '@/types'
type BuildingProperty = Act['buildingProperty']

interface Props {
  modelValue: NonNullable<BuildingProperty>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<BuildingProperty>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<BuildingProperty>) => emit('update:modelValue', value)
})

const allowedValues = [
  'numberOfFloors',
  'floorHeight',
  'areaGeneral',
  'productionArea',
  'warehouseArea',
  'administrativeArea',
  'householdArea',
  'additionalArea',
  'categoryOfDanger',
  'fireSafety'
]
</script>