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
import type { Act } from '@/types'
import { internalSystems } from '@/schemas/internal-systems.schema'
type InternalSystems = Act['internalSystems']

interface Props {
  modelValue: NonNullable<InternalSystems>
}

const blocks: (keyof InternalSystems)[][] = [
  ['coldWaterType', 'coldWaterDefects', 'coldWater'],
  ['hotWaterType', 'hotWaterDefects', 'hotWater'],
  ['drainageType', 'drainageDefects', 'drainage'],
  ['heatingType', 'heatingDefects', 'heating'],
  ['powerSupplyType', 'powerSupplyDefects', 'powerSupply'],
  ['gasType', 'gasDefects', 'gas'],
  ['ventilationType', 'ventilationDefects', 'ventilation'],
  ['fireProtectionType', 'fireProtectionCondition',  'fireProtectionDefects', 'fireProtection'],
  ['firefightingWaterSupplyType', 'firefightingWaterSupplyCondition', 'firefightingWaterSupplyDefects', 'firefightingWaterSupply']
]



const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<InternalSystems>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<InternalSystems>) => emit('update:modelValue', value)
})

const naValues = ['відсутні', 'відомості відсутні', undefined, null]

const getElements = (blocks: (keyof InternalSystems)[]): (keyof InternalSystems)[] => {
  if (blocks.length === 0) return []
  const value = props.modelValue[blocks[0] as keyof InternalSystems]
  if (naValues.includes(value)) return blocks.slice(0, 1)
  return blocks
}

const getElement = (element: keyof InternalSystems) => {
  return internalSystems.properties[element]
}
const getDict = (element: keyof InternalSystems): string[] | undefined => {
  const property = internalSystems.properties[element] as unknown as Record<string, string[]>
  return property.enum
} 

const firstKeys = blocks.map(el => el[0])
watch(
  () => firstKeys.map(k => props.modelValue[k as keyof InternalSystems]),
  (newValues, oldValues) => {
    newValues.forEach((value, index) => {
      if (value === oldValues?.[index]) return
      const firstValue = props.modelValue[blocks?.[index]?.[0] as keyof InternalSystems]
      if (!naValues.includes(firstValue)) return
      for (const key of blocks?.[index]?.slice(1) ?? []) {
        delete props.modelValue[key]
      }
    })
  }
)

</script>
