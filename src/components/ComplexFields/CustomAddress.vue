<template>
  <v-row>
    <v-col cols="12" md="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.streetType.title }}</div>
      <v-autocomplete
        v-model="model.streetTypeCode"
        hide-details
        item-title="title"
        item-value="code"
        :items="streetTypes"
        name="streetType"
        placeholder="вулиця"
        variant="solo-inverted"
      />
    </v-col>
    <v-col cols="12" md="8">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.streetName.title }}</div>
      <v-text-field
        v-model="model.streetName"
        name="streetName"
        placeholder="Тараса Шевченка"
        variant="solo-inverted"
      />
    </v-col>
    <v-col cols="12" md="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.building.title }}</div>
      <v-text-field
        v-model="model.building"
        hide-details
        name="building"
        placeholder="10"
        variant="solo-inverted"
      />

    </v-col>
    <v-col cols="12" md="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.block.title }}</div>
      <v-text-field
        v-model="model.block"
        hide-details
        name="block"
        placeholder="Б"
        variant="solo-inverted"
      />

    </v-col>
    <v-col cols="12" md="4">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.apartmentNumber.title }}</div>
      <v-text-field
        v-model="model.apartmentNumber"
        hide-details
        name="apartmentNumber"
        placeholder="155"
        variant="solo-inverted"
      />

    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import type { Act } from '@/types'
  import streetTypes from '@/dicts/street-types'
  import { address as schema } from '@/schemas/address.schema'

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
    set: (value: Partial<Address>) => emit('update:modelValue', value),
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
