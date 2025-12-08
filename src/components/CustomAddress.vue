<template>
  <div>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.admin1.title }}</div>

    <v-text-field
      v-model="model.title"
      placeholder="Міністерство розвитку громад та територій України"
      variant="solo-inverted"
      name="organization.title"
    />

  </div>
</template>

<script lang="ts" setup>
import type { Act } from '@/types'
import territories from '@/dicts/territories'
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

const admin1List = []
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

console.log(admin1List)
console.log(admin2Lists)
console.log(admin3Lists)
console.log(admin4Lists)
console.log(admin5Lists)


import { address as schema } from '@/schemas/address.schema'

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

</script>