<template>
  <v-table class="bg-transparent">
    <thead>
      <tr>
        <th class="text-left">
          Найменування показника
        </th>
        <th class="text-left">
          Значення показника
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.key"
      >
        <td>{{ item.title }}</td>
        <td class="pt-2 pb-2">
          <numeric-field
            v-model="model[item.key]"
            density="compact"
            variant="solo-inverted"
            inputmode="decimal"
            novalidate
            hide-details
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { JSONSchema } from 'json-schema-to-ts'

interface Items {
  key: string
  title: string
}
type Model = Record<string, number | undefined>
interface Props {
  modelValue: Model
  schema: JSONSchema
  allowedValues?: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Model>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Model>) => emit('update:modelValue', value)
})

const items = computed(() => {
  if (typeof props.schema !== 'object') return []
  if (!props.schema.properties) return []
  if (props.allowedValues === undefined) {
    const currentItems = Object.entries(props.schema.properties).reduce((obj, [key, props]) => {
      const title = typeof props === 'object' && props.title !== undefined ? props.title : 'N/A'
      obj.push({ key, title })
      return obj
    }, [] as Items[])
    return currentItems
  }
  return props.allowedValues.map((key:string) => {
    const schema = props.schema
    if (typeof schema !== 'object') return { key, title: 'N/A' }
    const currentProps = schema.properties
    if (typeof currentProps !== 'object') return { key, title: 'N/A' }
    if (typeof currentProps[key] !== 'object') return { key, title: 'N/A' }
    return { key, title: currentProps[key]?.title ?? 'N/A' }
  })
})
</script>