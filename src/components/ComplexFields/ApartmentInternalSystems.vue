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
  import { apartmentInternalSystems } from '@/schemas/apartment-internal-systems.schema'
  type ApartmentInternalSystems = Act['apartmentInternalSystems']

  interface Props {
    modelValue: NonNullable<ApartmentInternalSystems>
  }

  const blocks: (keyof ApartmentInternalSystems)[][] = [
    ['powerSupplyType', 'powerSupplyCondition', 'powerSupplyDefects', 'powerSupply'],
    ['heatingType', 'heatingCondition', 'heatingDefects', 'heating'],
    ['waterSupplyType', 'waterSupplyCondition', 'waterSupplyDefects', 'waterSupply'],
    ['drainageType', 'drainageCondition', 'drainageDefects', 'drainage'],
    ['ventilationType', 'ventilationCondition', 'ventilationDefects', 'ventilation'],
  ]

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<ApartmentInternalSystems>): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<ApartmentInternalSystems>) => emit('update:modelValue', value),
  })

  const naValues = new Set(['відсутні', 'відомості відсутні', undefined, null])

  function getElements (blocks: (keyof ApartmentInternalSystems)[]): (keyof ApartmentInternalSystems)[] {
    if (blocks.length === 0) return []
    const value = props.modelValue[blocks[0] as keyof ApartmentInternalSystems]
    if (naValues.has(value)) return blocks.slice(0, 1)
    return blocks
  }

  function getElement (element: keyof ApartmentInternalSystems) {
    return apartmentInternalSystems.properties[element]
  }
  function getDict (element: keyof ApartmentInternalSystems): string[] | undefined {
    const property = apartmentInternalSystems.properties[element] as unknown as Record<string, string[]>
    return property.enum
  }

  const firstKeys = blocks.map(el => el[0])
  watch(
    () => firstKeys.map(k => props.modelValue[k as keyof ApartmentInternalSystems]),
    (newValues, oldValues) => {
      for (const [index, value] of newValues.entries()) {
        if (value === oldValues?.[index]) continue
        const firstValue = props.modelValue[blocks?.[index]?.[0] as keyof ApartmentInternalSystems]
        if (!naValues.has(firstValue)) continue
        for (const key of blocks?.[index]?.slice(1) ?? []) {
          delete model.value[key]
        }
      }
    },
  )
</script>
