<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.name.title }}</div>
    <v-text-field
      v-model="model.name"
      name="documentName"
      placeholder="Рішення обласної ради"
      variant="solo-inverted"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.number.title }}</div>
    <v-text-field
      v-model="model.number"
      name="documentNumber"
      placeholder="112/2025"
      variant="solo-inverted"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.date.title }}</div>
    <custom-date v-model="model.date" :max="new Date()" />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.comment.title }}</div>
    <v-textarea
      v-model="model.comment"
      name="documentComment"
      placeholder="Додаткова інформація"
      variant="solo-inverted"
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
    set: (value: Partial<DocumentData>) => emit('update:modelValue', value),
  })
</script>
