<template>
  <div
    v-for="(block, i) in blocks"
    :key="`block-${i}`"
    class="block pa-4"
    :class="[i % 2 === 0 ? 'bg-main-darken-1' : '']"
  >
    <div v-for="(element) in getElements(block)" :key="element">
      <schema-select-field
        v-if="getDict(element)"
        v-model="model"
        :property="element"
        :schema="getElement(element)"
      />
      <schema-text-field
        v-if="!getDict(element)"
        v-model="model"
        :property="element"
        :schema="getElement(element)"
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
    ['defenseType', 'defense'],
  ]

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<ConstructionElements>): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<ConstructionElements>) => emit('update:modelValue', value),
  })

  const naValues = new Set([
    'відсутні',
    'відсутня',
    'відсутнє',
    'відомості відсутні',
    undefined,
    null
  ])

  function getElements (blocks: (keyof ConstructionElements)[]): (keyof ConstructionElements)[] {
    if (blocks.length === 0) return []
    const value = props.modelValue[blocks[0] as keyof ConstructionElements]
    if (naValues.has(value)) return blocks.slice(0, 1)
    return blocks
  }

  function getElement (element: keyof ConstructionElements) {
    return constructionElements.properties[element]
  }
  function getDict (element: keyof ConstructionElements): string[] | undefined {
    const property = constructionElements.properties[element] as unknown as Record<string, string[]>
    return property.enum
  }

  const firstKeys = blocks.map(el => el[0])
  watch(
    () => firstKeys.map(k => props.modelValue[k as keyof ConstructionElements]),
    (newValues, oldValues) => {
      for (const [index, value] of newValues.entries()) {
        if (value === oldValues?.[index]) continue
        const firstValue = props.modelValue[blocks?.[index]?.[0] as keyof ConstructionElements]
        if (!naValues.has(firstValue)) continue
        for (const key of blocks?.[index]?.slice(1) ?? []) {
          delete model.value[key]
        }
      }
    },
  )

</script>
