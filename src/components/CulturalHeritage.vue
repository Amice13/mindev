<template>
  <div>
    <v-checkbox
      v-model="model.isHeritage"
      :label="schema.properties.isHeritage.title"
    />

    <div v-show="model.isHeritage">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.monumentName.title }}</div>
      <v-text-field
        v-model="model.monumentName"
        placeholder="Пам'ятник Шевченку Т.Г., українському поету і художнику"
        variant="solo-inverted"
        name="monumentName"
      />

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.monumentCategory.title }}</div>
      <DictionaryValue
        v-model="model.monumentCategory"
        dictionary="heritageCategories"
      />

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.monumentType.title }}</div>
      <DictionaryValue
        v-model="model.monumentType"
        dictionary="heritageTypes"
      />

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.protectionNumber.title }}</div>
      <v-text-field
        v-model="model.protectionNumber"
        placeholder="141"
        variant="solo-inverted"
        name="monumentName"
      />

      <p class="text-subtitle-1 mb-6">Якщо у вас наявна інформація про документ, який визначає охорону цієї пам'ятки, зазначте його реквізити</p>

      <document-reference v-model="model.protectionDecision" />
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Act } from '@/types'
import { heritage as schema } from '@/schemas/heritage.schema'

type Heritage = Act['culturalHeritage']
interface Props {
  modelValue: NonNullable<Heritage>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Heritage>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Heritage>) => emit('update:modelValue', value)
})

</script>