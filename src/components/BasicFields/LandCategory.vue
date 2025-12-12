<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.section.title }}</div>
    <v-select
      v-model="model.sectionCode"
      :items="classList1"
      name="streetType"
      :placeholder="classList1[0]?.section"
      item-title="section"
      item-value="sectionCode"
      variant="solo-inverted"
      clearable
    />

    <div v-show="model.sectionCode" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.subsection.title }}</div>
    <v-select
      v-show="model.sectionCode"
      v-model="model.subsectionCode"
      :items="classList2"
      name="streetType"
      :placeholder="classList2[0]?.subsection ?? ''"
      item-title="subsection"
      item-value="subsectionCode"
      variant="solo-inverted"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Act } from '@/types'
import { landCategory as schema } from '@/schemas/land-category.schema'
import landCategories from '@/dicts/land-categories'
type LandCategory = Act['landCategory']

const class1Object: Record<string, string> = {}
for (const lc of landCategories) class1Object[lc.sectionCode] = lc.section

const classList1 = Object.entries(class1Object).reduce((list, [sectionCode, section]) => {
  list.push({ sectionCode, section })
  return list
}, [] as {
  sectionCode: string
  section: string
}[])

const classList2 = computed(() => {
  if (!model.value.sectionCode) return []
  return landCategories.filter(lc => lc.sectionCode === model.value.sectionCode)
})


interface Props {
  modelValue: NonNullable<LandCategory>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<LandCategory>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<LandCategory>) => emit('update:modelValue', value)
})

watch(() => model.value.sectionCode, () => {
  if (!model.value.sectionCode) {
    delete model.value.section
  } else {
    const title = landCategories.find(lc => lc.sectionCode === model.value.sectionCode)?.section
    model.value.section = title ?? ''
  }
  delete model.value.subsection
  delete model.value.subsectionCode
})

watch(() => model.value.subsectionCode, () => {
  if (!model.value.subsectionCode) {
    delete model.value.subsection
    return
  }
  const category = landCategories.find(lc => lc.subsectionCode === model.value.subsectionCode)
  if (category) model.value = { ...category }
})
</script>