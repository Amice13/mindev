<template>
  <v-row>
    <v-col cols="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.streetType.title }}</div>
      <v-autocomplete
        v-model="model.streetTypeCode"
        :items="streetTypes"
        name="streetType"
        placeholder="вулиця"
        item-title="title"
        item-value="code"
        variant="solo-inverted"
      />      
    </v-col>
    <v-col cols="8">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.streetName.title }}</div>
      <v-text-field
        v-model="model.streetName"
        placeholder="Тараса Шевченка"
        name="streetName"
        variant="solo-inverted"
      />
    </v-col>
    <v-col cols="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.building.title }}</div>
      <v-text-field
        v-model="model.building"
        placeholder="10"
        name="building"
        variant="solo-inverted"
      />
      
    </v-col>
    <v-col cols="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.block.title }}</div>
      <v-text-field
        v-model="model.block"
        placeholder="Б"
        name="block"
        variant="solo-inverted"
      />
      
    </v-col>
    <v-col cols="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.apartmentNumber.title }}</div>
      <v-text-field
        v-model="model.apartmentNumber"
        placeholder="155"
        name="apartmentNumber"
        variant="solo-inverted"
      />
      
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import type { Act } from '@/types'
import { address as schema } from '@/schemas/address.schema'
import streetTypes from '@/dicts/street-types'

type Address = Act['address']

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

watch(() => model.value.streetTypeCode, () => {
  if (model.value.streetTypeCode === undefined) {
    delete model.value.streetType
    return
  }
  const title = streetTypes.find(streetType => streetType.code === model.value.streetTypeCode)?.title
  model.value.streetType = title ?? ''
})

</script>