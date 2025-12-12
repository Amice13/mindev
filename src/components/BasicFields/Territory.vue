<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.admin1.title }}</div>
    <v-select
      v-model="model.code1"
      :items="admin1List"
      item-title="title"
      item-value="code"
      placeholder="Київська"
      variant="solo-inverted"
      clearable
    />

    <div v-show="admin2List.length" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.admin2.title }}</div>
    <v-select
      v-show="admin2List.length"
      v-model="model.code2"
      :items="admin2List"
      :placeholder="admin2List[0]?.title ?? 'Білоцерківський'"
      no-data-text="Немає даних"
      item-title="title"
      item-value="code"
      variant="solo-inverted"
      clearable
    />

    <div v-show="admin3List.length" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.admin3.title }}</div>
    <v-select
      v-show="admin3List.length"
      v-model="model.code3"
      :items="admin3List"
      :placeholder="admin3List[0]?.title ?? 'Білоцерківська'"
      no-data-text="Немає даних"
      item-title="title"
      item-value="code"
      variant="solo-inverted"
      clearable
    ></v-select>

    <div v-show="admin4List.length" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.admin4.title }}</div>
    <v-select
      v-show="admin4List.length"
      v-model="model.code4"
      :items="admin4List"
      :placeholder="admin4List[0]?.title ?? 'Біла церква'"
      no-data-text="Немає даних"
      item-title="title"
      item-value="code"
      variant="solo-inverted"
      clearable
    ></v-select>

    <div v-show="admin5List.length" class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.admin5.title }}</div>
    <v-select
      v-show="admin5List.length"
      v-model="model.code5"
      :items="admin5List"
      :placeholder="admin5List[0]?.title"
      no-data-text="Немає даних"
      item-title="title"
      item-value="code"
      variant="solo-inverted"
      clearable
    ></v-select>

  </div>
</template>

<script lang="ts" setup>
import type { Act } from '@/types'
import territories from '@/dicts/territories'
import { address as schema } from '@/schemas/address.schema'

type Address = Act['address']

type Territory = {
  code: string,
  title: string
}

const admin1Pattern = /^UA([1-9]\d|\d[1-9])0000000000/
const admin2Pattern = /^UA\d\d([1-9]\d|\d[1-9])00000000/
const admin3Pattern = /^UA\d\d\d\d([1-9]\d\d|\d[1-9]\d|\d\d[1-9])00000/
const admin4Pattern = /^UA\d\d\d\d\d\d\d([1-9]\d\d|\d[1-9]\d|\d\d[1-9])00/
const admin5Pattern = /^UA\d\d\d\d\d\d\d\d\d\d([1-9]\d|\d[1-9])/

const admin1List: Territory[] = []
const admin2Lists: Record<string, Territory[]> = {}
const admin3Lists: Record<string, Territory[]> = {}
const admin4Lists: Record<string, Territory[]> = {}
const admin5Lists: Record<string, Territory[]> = {}

for (const territory of territories) {
  if (admin1Pattern.test(territory.code)) {
    admin1List.push(territory)
    continue
  }
  if (admin2Pattern.test(territory.code)) {
    const shortCode = territory.code.slice(0, 4)
    if (admin2Lists[shortCode] === undefined) admin2Lists[shortCode] = []
    admin2Lists[shortCode].push(territory)
  }
  if (admin3Pattern.test(territory.code)) {
    const shortCode = territory.code.slice(0, 6)
    if (admin3Lists[shortCode] === undefined) admin3Lists[shortCode] = []
    admin3Lists[shortCode].push(territory)
  }
  if (admin4Pattern.test(territory.code)) {
    const shortCode = territory.code.slice(0, 9)
    if (admin4Lists[shortCode] === undefined) admin4Lists[shortCode] = []
    admin4Lists[shortCode].push(territory)
  }
  if (admin5Pattern.test(territory.code)) {
    const shortCode = territory.code.slice(0, 12)
    if (admin5Lists[shortCode] === undefined) admin5Lists[shortCode] = []
    admin5Lists[shortCode].push(territory)
  }
}

const admin2List = computed((): Territory[] => {
  if (!model.value.code1) return []
  const code = model.value.code1.slice(0, 4)
  const territories = admin2Lists[code]
  return territories ?? []
})

const admin3List = computed((): Territory[] => {
  if (!model.value.code2) return []
  const code = model.value.code2.slice(0, 6)
  const territories = admin3Lists[code]
  return territories ?? []
})

const admin4List = computed((): Territory[] => {
  if (!model.value.code3) return []
  const code = model.value.code3.slice(0, 9)
  const territories = admin4Lists[code]
  return territories ?? []
})

const admin5List = computed((): Territory[] => {
  if (model.value.code4 !== undefined) {
    const code = model.value.code4.slice(0, 12)
    const territories = admin5Lists[code]
    return territories ?? []
  }
  if (!model.value.code1) return []
  const codeForBigCities = model.value.code1.slice(0, 12)
  const territoriesForBigCities = admin5Lists[codeForBigCities]
  return territoriesForBigCities ?? []
})

interface Props {
  modelValue: NonNullable<Address>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Address>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Address>) => emit('update:modelValue', value)
})

watch(() => model.value.code5, () => {
  if (model.value.code5 === undefined) {
    delete model.value.admin5
    return
  }
  const title = admin5List.value.find(territory => territory.code === model.value.code5)?.title
  model.value.admin5 = title ?? ''
})

watch(() => model.value.code4, () => {
  if (model.value.code4 === undefined) {
    delete model.value.admin4
  } else {
    const title = admin4List.value.find(territory => territory.code === model.value.code4)?.title
    model.value.admin4 = title ?? ''
  }
  delete model.value.code5
  delete model.value.admin5
})

watch(() => model.value.code3, () => {
  if (model.value.code3 === undefined) {
    delete model.value.admin3
  } else {
    const title = admin3List.value.find(territory => territory.code === model.value.code3)?.title
    model.value.admin3 = title ?? ''
  }
  delete model.value.code4
  delete model.value.admin4
  delete model.value.code5
  delete model.value.admin5
})

watch(() => model.value.code2, () => {
  if (model.value.code2 === undefined) {
    delete model.value.admin2
  } else {
    const title = admin2List.value.find(territory => territory.code === model.value.code2)?.title
    model.value.admin2 = title ?? ''
  }
  delete model.value.code3
  delete model.value.admin3
  delete model.value.code4
  delete model.value.admin4
  delete model.value.code5
  delete model.value.admin5
})

watch(() => model.value.code1, () => {
  if (model.value.code1 === undefined) {
    delete model.value.admin1
  } else {
    const title = admin1List.find(territory => territory.code === model.value.code1)?.title
    model.value.admin1 = title ?? ''
  }
  delete model.value.code2
  delete model.value.admin2
  delete model.value.code3
  delete model.value.admin3
  delete model.value.code4
  delete model.value.admin4
  delete model.value.code5
  delete model.value.admin5
})
</script>