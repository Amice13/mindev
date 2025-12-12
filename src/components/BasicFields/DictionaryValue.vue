<template>
  <v-select
    v-model="model"
    :items="items"
    :item-title="getTitle"
    placeholder="Натисніть, щоб обрати"
    variant="solo-inverted"
    return-object
  />
</template>

<script setup lang="ts">
import type { SelectItemKey } from 'vuetify/lib/util/helpers.mjs'
import consequenceClasses from '@/dicts/consequence-classes'
import estateTypes from '@/dicts/estate-types'
import heritageCategories from '@/dicts/heritage-categories'
import heritageTypes from '@/dicts/heritage-types'
import landCategories from '@/dicts/land-categories'
import ownershipTypes from '@/dicts/ownership-types'
import ownerTypes from '@/dicts/owner-types'
import personalDocumentTypes from '@/dicts/personal-document-types'

interface Props {
  dictionary: string
  modelValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | object | undefined): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const availableDicts = {
  consequenceClasses,
  personalDocumentTypes,
  estateTypes,
  heritageCategories,
  heritageTypes,
  landCategories,
  ownershipTypes,
  ownerTypes
} as Record<string, string[] | object[]>

const items = computed(() => {
  if (!props.dictionary) return []
  const currentItems = availableDicts[props.dictionary]
  if (currentItems === undefined) return []
  return currentItems
})

const getTitle: SelectItemKey<string | object> = (value: string | object) => {
  if (typeof value === 'string') return value
  const title = (value as unknown as Record<string, string>).title
  if (title === undefined) return 'N/A'
  return title
}

</script>