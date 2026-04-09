<template>
  <v-table class="bg-transparent">
    <thead>
      <tr>
        <th class="text-center" />
        <th class="text-left">
          Найменування показника
        </th>
        <th class="text-left">
          Значення показника
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="model.length === 0">
        <td />
        <td colspan="2">
          Ви не додали жодного показника
        </td>
      </tr>
      <tr
        v-for="(item, i) in model"
        :key="'custom-item-' + i"
      >
        <td>
          <v-btn icon="mdi-delete" size="small" variant="tonal" @click="remove(i)" />
        </td>
        <td v-if="model[i] !== undefined" class="pt-2 pb-2">
          <v-textarea
            v-model="model[i].title"
            aria-label="Найменування показника"
            density="compact"
            hide-details
            inputmode="decimal"
            novalidate
            rows="1"
            variant="solo-inverted"
          />
        </td>
        <td v-if="model[i] !== undefined" class="pt-2 pb-2">
          <v-text-field
            v-model.number="model[i].value"
            v-maska="numericMaska"
            aria-label="Значення показника"
            density="compact"
            hide-details
            inputmode="decimal"
            novalidate
            variant="solo-inverted"
          />
        </td>
      </tr>
      <tr>
        <td />
        <td colspan="2">
          <v-btn size="small" @click="add">
            <v-icon icon="mdi-plus" /> Додати
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
    set: (value: AdditionalData) => emit('update:modelValue', value),
  })

  const tokens = {
    D: {
      pattern: /\./,
      optional: true,
    },
    A: {
      pattern: /\d/,
      multiple: true,
    },
  }

  const numericMaska = {
    mask: 'ADA',
    tokens,
  }

  function add (): void {
    model.value.push({
      title: '',
      value: 0,
    })
  }

  function remove (i: number): void {
    if (model.value[i] === undefined) return
    model.value.splice(i, 1)
  }

</script>
