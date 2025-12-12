<template>
  <text-data
    v-model="model"
    :schema="constructionElements"
  />
</template>

<script setup lang="ts">
import { constructionElements } from '@/schemas/construction-elements.schema'
import type { Act } from '@/types'
type ConstructionElements = Act['constructionElements']

interface Props {
  modelValue: NonNullable<ConstructionElements>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<ConstructionElements>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<ConstructionElements>) => emit('update:modelValue', value)
})
</script>