<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.class1.title }}</div>
    <v-select
      v-model="model.code1"
      :aria-label="schema.properties.class1.title"
      clearable
      item-title="title"
      item-value="code"
      :items="classList1"
      name="streetType"
      placeholder="Житлові будинки"
      variant="solo-inverted"
    />

    <div v-show="model.code1" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.class2.title }}</div>
    <v-select
      v-show="model.code1"
      v-model="model.code2"
      :aria-label="schema.properties.class2.title"
      item-title="title"
      item-value="code"
      :items="classList2"
      name="streetType"
      :placeholder="classList2[0]?.title ?? ''"
      variant="solo-inverted"
    />

    <div v-show="model.code2" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.class3.title }}</div>
    <v-select
      v-show="model.code2"
      v-model="model.code3"
      :aria-label="schema.properties.class3.title"
      item-title="title"
      item-value="code"
      :items="classList3"
      name="streetType"
      :placeholder="classList3[0]?.title ?? ''"
      variant="solo-inverted"
    />

    <div v-show="model.code3" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.class.title }}</div>
    <v-select
      v-show="model.code3"
      v-model="model.code"
      :aria-label="schema.properties.class.title"
      item-title="title"
      item-value="code"
      :items="classList4"
      name="streetType"
      :placeholder="classList4[0]?.title ?? ''"
      variant="solo-inverted"
    />
  </div>
</template>

<script lang="ts" setup>
  import type { Act } from '@/types'
  import buildingClasses from '@/dicts/building-classes'
  import { buildingClass as schema } from '@/schemas/building-class.schema'

  const classList1 = buildingClasses.filter(el => el.code.length === 1)
  const classList2 = computed(() => {
    if (model.value.class1 === undefined) return []
    return buildingClasses.filter(el => el.code.length === 2 && el.code.startsWith(model.value.code1 ?? 'NA'))
  })
  const classList3 = computed(() => {
    if (model.value.class2 === undefined) return []
    return buildingClasses.filter(el => el.code.length === 3 && el.code.startsWith(model.value.code2 ?? 'NA'))
  })
  const classList4 = computed(() => {
    if (model.value.class3 === undefined) return []
    return buildingClasses.filter(el => el.code.length === 4 && el.code.startsWith(model.value.code3 ?? 'NA'))
  })

  type BuildingClass = Act['buildingClass']

  interface Props {
    modelValue: NonNullable<BuildingClass>
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<BuildingClass>): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<BuildingClass>) => emit('update:modelValue', value),
  })

  watch(() => model.value.code1, () => {
    if (model.value.code1) {
      const title = buildingClasses.find(fp => fp.code === model.value.code1)?.title
      model.value.class1 = title ?? ''
    } else {
      delete model.value.class1
    }
    delete model.value.class2
    delete model.value.code2
    delete model.value.class3
    delete model.value.code3
    delete model.value.class
    delete model.value.code
  })

  watch(() => model.value.code2, () => {
    if (model.value.code2) {
      const title = buildingClasses.find(fp => fp.code === model.value.code2)?.title
      model.value.class2 = title ?? ''
    } else {
      delete model.value.class2
    }
    delete model.value.class3
    delete model.value.code3
    delete model.value.class
    delete model.value.code
  })

  watch(() => model.value.code3, () => {
    if (model.value.code3) {
      const title = buildingClasses.find(fp => fp.code === model.value.code3)?.title
      model.value.class3 = title ?? ''
    } else {
      delete model.value.class3
    }
    delete model.value.class
    delete model.value.code
  })

  watch(() => model.value.code, () => {
    if (!model.value.code) {
      delete model.value.class
      return
    }
    const title = buildingClasses.find(fp => fp.code === model.value.code)?.title
    model.value.class = title ?? ''
  })
</script>
