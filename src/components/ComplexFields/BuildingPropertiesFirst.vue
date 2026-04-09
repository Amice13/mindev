<template>
  <tabular-data
    v-model="model"
    :allowed-values="allowedValues"
    :schema="buildingProperty"
    value-type="number"
  />
</template>

<script setup lang="ts">
  import type { Act } from '@/types'
  import { buildingProperty } from '@/schemas/building-property.schema'
  type BuildingProperty = Act['buildingProperty']

  interface Props {
    modelValue: NonNullable<BuildingProperty>
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<BuildingProperty>): void
  }>()

  const model = computed({
    get: () => props.modelValue as Record<string, number | undefined>,
    set: (value: Partial<BuildingProperty>) => emit('update:modelValue', value),
  })

  const allowedValues = [
    'numberOfFloors',
    'areaGeneral',
    'apartmentArea',
    'commonSpaceArea',
    'nonLivingArea',
    'notUsedArea',
    'idpLivingArea',
    'idpProjectedArea',
    'numberOfHabitants',
    'numberOfFreePlaces',
  ]
</script>
