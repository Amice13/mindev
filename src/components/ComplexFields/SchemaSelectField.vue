<template>
  <div class="font-weight-bold mb-1 text-subtitle-2">{{ title }}</div>
  <v-select
    v-model="model[property]"
    :items="items"
    placeholder="Натисніть, щоб обрати"
    variant="solo-inverted"
    return-object
    clearable
  />
</template>

<script setup lang="ts">
import type { JSONSchema } from 'json-schema-to-ts'

type Model = Record<string, string | undefined>

interface Props {
  modelValue: Model
  schema: JSONSchema
  property: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Model>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Model>) => emit('update:modelValue', value)
})

const title = computed(() => {
  if (typeof props.schema !== 'object') return null
  return props.schema.title
})

const items = computed(() => {
  if (typeof props.schema !== 'object') return undefined
  return props.schema.enum as string[]  
})
</script>