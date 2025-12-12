<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.name.title }}</div>
    <v-text-field
      v-model="model.name"
      placeholder="Рішення обласної ради"
      variant="solo-inverted"
      name="documentName"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.number.title }}</div>
    <v-text-field
      v-model="model.number"
      placeholder="112/2025"
      variant="solo-inverted"
      name="documentNumber"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.date.title }}</div>
    <v-text-field
      v-model="model.date"
      placeholder="2025-02-21"
      variant="solo-inverted"
      name="documentDate"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.comment.title }}</div>
    <v-textarea
      v-model="model.comment"
      placeholder="Додаткова інформація"
      variant="solo-inverted"
      name="documentComment"
    />
  </div>
</template>

<script setup lang="ts">
import type { DocumentData } from '@/types'
import { documentData as schema } from '@/schemas/document-data.schema'

interface Props {
  modelValue: NonNullable<DocumentData>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<DocumentData>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<DocumentData>) => emit('update:modelValue', value)
})
</script>