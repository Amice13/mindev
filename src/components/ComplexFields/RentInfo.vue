<template>
  <div>
    <v-checkbox
      v-model="model.isRent"
      :label="schema.properties.isRent.title"
    />

    <div v-show="model.isRent">
      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.reason.title }}</div>
      <v-textarea
        v-model="model.reason"
        name="rentReason"
        placeholder="Договір оренди від 12.10.2025"
        variant="solo-inverted"
      />

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.endDate.title }}</div>
      <v-text-field
        v-model="model.endDate"
        name="rentEndDate"
        placeholder="12.10.2026"
        variant="solo-inverted"
      />

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.habitants.title }}</div>
      <v-text-field
        v-model.number="model.habitants"
        v-maska="numericMaska"
        inputmode="integer"
        name="rentHabitants"
        placeholder="3"
        variant="solo-inverted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Act } from '@/types'
  import { vMaska } from 'maska/vue'
  import { rentInfo as schema } from '@/schemas/rent-info.schema'

  type RentInfo = Act['rentInfo']
  interface Props {
    modelValue: NonNullable<RentInfo>
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<RentInfo>): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<RentInfo>) => emit('update:modelValue', value),
  })

  const tokens = {
    A: {
      pattern: /\d/,
    },
  }

  const numericMaska = {
    mask: 'AA',
    tokens,
  }
</script>
