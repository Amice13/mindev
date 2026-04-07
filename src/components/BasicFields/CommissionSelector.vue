<template>
  <div>
    <p class="font-weight-bold mb-1 text-subtitle-2">Комісія з обстеження нерухомого майна</p>
    <v-select
      v-model="model"
      :items="commissionsList"
      item-title="title"
      placeholder="Натисніть, щоб обрати"
      variant="solo-inverted"
      return-object
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import type { Organization } from '@/types'
import commissionsList from '@/dicts/commissions-list'

interface Props {
  modelValue?: Organization
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | object | undefined): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>