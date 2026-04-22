<template>
  <div class="font-weight-bold mb-1 text-subtitle-2">{{ title }}</div>
  <v-textarea
    v-model="model[property]"
    rows="2"
    variant="solo-inverted"
    :maxlength="maxLength"
    auto-grow
    counter
  />
</template>

<script setup lang="ts">
  import type { JSONSchema } from 'json-schema-to-ts'

  type Model = Record<string, string | undefined>

  interface Props {
    modelValue: Model
    schema: JSONSchema
    property: string
    maxLength?: number
  }

  const props = defineProps<Props>()

  const maxLength = computed(() => {
    return props.maxLength ?? 360    
  })
  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<Model>): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<Model>) => emit('update:modelValue', value),
  })

  const title = computed(() => {
    if (typeof props.schema !== 'object') return null
    return props.schema.title
  })
</script>
