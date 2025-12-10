<template>
  <v-table class="bg-transparent">
    <thead>
      <tr>
        <th class="text-center">
        </th>
        <th class="text-left">
          Найменування показника
        </th>
        <th class="text-left">
          Значення показника
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!model.length">
        <td></td>
        <td colspan="2">
          Ви не додали жодного показника
        </td>
      </tr>
      <tr
        v-for="(item, i) in model"
        :key="'custom-item-' + i" 
      >
        <td>
          <v-btn @click="remove(i)" size="small" variant="tonal" icon="mdi-delete"/>
        </td>
        <td class="pt-2 pb-2" v-if="model[i] !== undefined">
          <v-textarea
            v-model="model[i].title"
            rows="1"
            density="compact"
            variant="solo-inverted"
            inputmode="decimal"
            novalidate
            hide-details
          />
        </td>
        <td class="pt-2 pb-2" v-if="model[i] !== undefined">
          <v-text-field
            v-model.number="model[i].value"
            v-maska="numericMaska"
            density="compact"
            variant="solo-inverted"
            inputmode="decimal"
            novalidate
            hide-details
          />
        </td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">
          <v-btn @click="add" size="small">
            <v-icon icon="mdi-plus"/> Додати
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { Act } from '@/types'
import { vMaska } from 'maska/vue'

type AdditionalData = Act['otherIndicators']

interface Props {
  modelValue: NonNullable<AdditionalData>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: AdditionalData): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: AdditionalData) => emit('update:modelValue', value)
})

const tokens = {
  D: {
    pattern: /\./,
    optional: true
  },
  A: {
    pattern: /\d/,
    multiple: true
  }
}

const numericMaska = {
  mask: 'ADA',
  tokens
}

const add = (): void => {
  model.value.push({
    title: '',
    value: ''
  })
}

const remove = (i: number): void => {
  if (model.value[i] === undefined) return
  model.value.splice(i, 1)
}

</script>