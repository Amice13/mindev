<template>
  <div
    v-for="(block, i) in blocks"
    :class="[i % 2 === 0 ? 'bg-main-darken-1' : '']"
    :key="`block-${i}`"
    class="block pa-4"
  >
    <div v-for="(element, j) in getElements(block)" :key="element">
      <schema-select-field
        v-if="getDict(element)"
        v-model="model"
        :schema="getElement(element)"
        :property="element"
      />
      <schema-text-field
        v-if="!getDict(element)"
        v-model="model"
        :schema="getElement(element)"
        :property="element"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { apartmentInternalSystems } from '@/schemas/apartment-internal-systems.schema'
import type { Act } from '@/types'
type ApartmentInternalSystems = Act['apartmentInternalSystems']

interface Props {
  modelValue: NonNullable<ApartmentInternalSystems>
}

const blocks: (keyof ApartmentInternalSystems)[][] = [
  ['powerSupplyType', 'powerSupplyCondition', 'powerSupplyDefects', 'powerSupply'],
  ['heatingType', 'heatingCondition', 'heatingDefects', 'heating'],
  ['waterSupplyType', 'waterSupplyCondition', 'waterSupplyDefects', 'waterSupply'],
  ['drainageType', 'drainageCondition', 'drainageDefects', 'drainage'],
  ['ventilationType', 'ventilationCondition', 'ventilationDefects',  'ventilation']
]

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<ApartmentInternalSystems>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<ApartmentInternalSystems>) => emit('update:modelValue', value)
})

const getElements = (blocks: (keyof ApartmentInternalSystems)[]): (keyof ApartmentInternalSystems)[] => {
  if (blocks.length === 0) return []
  const value = props.modelValue[blocks[0] as keyof ApartmentInternalSystems]
  if (value === undefined) return blocks.slice(0, 1)
  if (value === 'відсутні') return blocks.slice(0, 1)
  return blocks
}

const getElement = (element: keyof ApartmentInternalSystems) => {
  return apartmentInternalSystems.properties[element]
}
const getDict = (element: keyof ApartmentInternalSystems): string[] | undefined => {
  const property = apartmentInternalSystems.properties[element] as unknown as Record<string, string[]>
  return property.enum
} 

const firstKeys = blocks.map(el => el[0])
watch(
  () => firstKeys.map(k => props.modelValue[k as keyof ApartmentInternalSystems]),
  (newValues, oldValues) => {
    newValues.forEach((value, index) => {
      if (value === oldValues?.[index]) return
      if (!['відсутнє', 'відсутні'].includes(props.modelValue[blocks?.[index]?.[0] as keyof ApartmentInternalSystems] as string)) return
      for (const key of blocks?.[index] ?? []) {
        delete props.modelValue[key]
      }
    })
  }
)
</script>