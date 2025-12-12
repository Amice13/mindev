<template>
  <v-select
    v-model="model"
    :items="items"
    :item-title="getTitle"
    item-value="value"
    placeholder="Натисніть, щоб обрати"
    variant="solo-inverted"
  />
</template>

<script setup lang="ts">
import type { SelectItemKey } from 'vuetify/lib/util/helpers.mjs'
import conclusionTypes from '@/dicts/conclusion-types'

interface Props {
  modelValue?: string
  filter?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | object | undefined): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const items = computed(() => {
  if (!props.filter) return conclusionTypes
  return conclusionTypes.filter(t => t.filter.includes(props.filter ?? 'N/A'))
})

const getTitle: SelectItemKey<string | object> = (value: string | object) => {
  if (typeof value === 'string') return value
  const title = (value as unknown as Record<string, string>).title
  if (title === undefined) return 'N/A'
  return title
}

</script>