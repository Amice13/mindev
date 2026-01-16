<template>
  <div>
    <tabular-data
      v-model="model"
      :schema="buildingProperty"
      value-type="number"
      :allowedValues="allowedValues"
    />
    <div class="mt-6">
      <danger-category
        v-model="modelString['categoryOfDanger']"
        :title="buildingProperty.properties.categoryOfDanger.title"
      />
    </div>
    <div class="mt-6">
      <danger-category
        v-model="modelString['fireSafety']"
        :title="buildingProperty.properties.fireSafety.title"
      />
    </div>
  </div>
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
  get: () => props.modelValue as Record<string, number | undefined>,
  set: (value: Partial<BuildingProperty>) => emit('update:modelValue', value)
})

const modelString = computed({
  get: () => props.modelValue as Record<string, string>,
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
  'otherArea',
  'additionalArea'
] as (keyof BuildingProperty)[]
</script>