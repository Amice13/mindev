<template>
  <v-select
    v-model="model"
    aria-lable="Уточнення висновку"
    clearable
    :item-title="getTitle"
    item-value="value"
    :items="items"
    placeholder="Натисніть, щоб обрати"
    variant="solo-inverted"
  />
</template>

<script setup lang="ts">
  import type { SelectItemKey } from 'vuetify/lib/util/helpers.mjs'
  import conclusionDetails from '@/dicts/conclusion-details'

  interface Props {
    modelValue?: string
    filter?: {
      estateType: string
      conclusionType: string
    }
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | object | undefined): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  })

  const items = computed(() => {
    if (props.filter === undefined) return conclusionDetails
    const details = conclusionDetails.filter(detail => {
      for (const key of Object.keys(detail.filter)) {
        if (detail.filter[key as keyof typeof detail.filter] !== props?.filter![key as keyof typeof detail.filter]) return false
      }
      return true
    })
    if (details.length === 1) model.value = details[0]?.value
    return details
  })

  const getTitle: SelectItemKey<string | object> = (value: string | object) => {
    if (typeof value === 'string') return value
    const title = (value as unknown as Record<string, string>).title
    if (title === undefined) return 'N/A'
    return title
  }

</script>
