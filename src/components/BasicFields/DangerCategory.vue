<template>
  <div>
    <p class="font-weight-bold mb-1 text-subtitle-2">{{ title }}</p>
    <v-select
      v-model="model"
      :items="dangerCategories"
      item-title="title"
      item-value="value"
      placeholder="Натисніть, щоб обрати"
      variant="solo-inverted"
      clearable
    />
    <div>{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import dangerCategories from '@/dicts/danger-categories'

interface Props {
  modelValue?: string
  title?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | object | undefined): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const description = computed(() => {
  const category = dangerCategories.find(el => el.title === model.value)
  if (category === undefined) return ''
  return category.description
})
</script>