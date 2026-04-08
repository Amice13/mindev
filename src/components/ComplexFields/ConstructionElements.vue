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
import { constructionElements } from '@/schemas/construction-elements.schema'
type ConstructionElements = Act['constructionElements']

interface Props {
  modelValue: NonNullable<ConstructionElements>
}

const blocks: (keyof ConstructionElements)[][] = [
  ['ceilingType', 'ceilingCondition', 'ceilingDefects', 'ceiling'],
  ['coatingType', 'coatingCondition', 'coating'],
  ['stairsType', 'stairs'],
  ['roofingType', 'roofingCondition', 'roofingDefects', 'roofing'],
  ['partitionsType', 'partitionsCondition', 'partitionsDefects', 'partitions'],
  ['floorType', 'floorCondition', 'floorDefects', 'floor'],
  ['windowsAndDoorsType', 'windowsAndDoorsCondition', 'windowsAndDoorsDefects', 'windowsAndDoors'],
  ['facadeType', 'facadeCondition', 'facadeDefects', 'facade'],
  ['decorationType', 'decorationCondition', 'decorationDefects', 'decoration'],
  ['disabilitiesSupportType', 'disabilitiesSupport'],
  ['defenseType', 'defense']
]

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<ConstructionElements>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<ConstructionElements>) => emit('update:modelValue', value)
})

const naValues = ['відсутні', 'відомості відсутні', undefined, null]

const getElements = (blocks: (keyof ConstructionElements)[]): (keyof ConstructionElements)[] => {
  if (blocks.length === 0) return []
  const value = props.modelValue[blocks[0] as keyof ConstructionElements]
  if (naValues.includes(value)) return blocks.slice(0, 1)
  return blocks
}

const getElement = (element: keyof ConstructionElements) => {
  return constructionElements.properties[element]
}
const getDict = (element: keyof ConstructionElements): string[] | undefined => {
  const property = constructionElements.properties[element] as unknown as Record<string, string[]>
  return property.enum
} 

const firstKeys = blocks.map(el => el[0])
watch(
  () => firstKeys.map(k => props.modelValue[k as keyof ConstructionElements]),
  (newValues, oldValues) => {
    newValues.forEach((value, index) => {
      if (value === oldValues?.[index]) return
      const firstValue = props.modelValue[blocks?.[index]?.[0] as keyof ConstructionElements]
      if (!naValues.includes(firstValue)) return
      for (const key of blocks?.[index]?.slice(1) ?? []) {
        delete props.modelValue[key]
      }
    })
  }
)

</script>