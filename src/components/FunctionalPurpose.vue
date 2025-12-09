<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.class1.title }}</div>
    <v-select
      v-model="model.code1"
      :items="classList1"
      name="streetType"
      placeholder="Житлові будинки"
      item-title="title"
      item-value="code"
      variant="solo-inverted"
      clearable
    />

    <div v-show="model.code1" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.class.title }}</div>
    <v-select
      v-show="model.code1"
      v-model="model.code"
      :items="classList2"
      name="streetType"
      :placeholder="classList2[0]?.title ?? ''"
      item-title="title"
      item-value="code"
      variant="solo-inverted"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Act } from '@/types'
import { functionalPurpose as schema } from '@/schemas/functional-purpose.schema'
import functionalPurposes from '@/dicts/functional-purposes'

const classList1 = functionalPurposes.filter(el => el.code.length === 1)
const classList2 = computed(() => {
  if (!model.value.code1) return []
  return functionalPurposes.filter(el => el.code.length > 1 && el.code.startsWith(model.value.code1 ?? 'NA'))
})

type FunctionalPurpose = Act['functionalPurpose']

interface Props {
  modelValue: NonNullable<FunctionalPurpose>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<FunctionalPurpose>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<FunctionalPurpose>) => emit('update:modelValue', value)
})

watch(() => model.value.code1, () => {
  if (!model.value.code1) {
    delete model.value.class1
  } else {
    const title = functionalPurposes.find(fp => fp.code === model.value.code1)?.title
    model.value.class1 = title ?? ''
  }
  delete model.value.class
  delete model.value.code
})

watch(() => model.value.code, () => {
  if (!model.value.code) {
    delete model.value.class
    return
  }
  const title = functionalPurposes.find(fp => fp.code === model.value.code)?.title
  model.value.class = title ?? ''
})
</script>