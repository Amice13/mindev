<template>
  <div class="pa-4">
    <h5 class="text-h5 mb-4">Акти обстеження нерухомого майна</h5>
    <p class="text-subtitle-1 mb-6">Ви можете встановити додаткові фільтри для пошуку актів</p>
    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.estateType.title }}</div>
    <dictionary-value
      v-model="model.estateType"
      dictionary="estateTypes"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.conclusionType.title }}</div>
    <conclusion-type
      v-model="model.conclusionType"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">Мінімальна дата прийтяття акту</div>
    <custom-date v-model="model.minDate" :max="new Date()" />

    <div class="font-weight-bold mb-1 text-subtitle-2">Максимальна дата прийтяття акту</div>
    <custom-date v-model="model.maxDate" :max="new Date()" />

    <v-btn @click="reset" сlass="mt-4" color="primary-darken-1">Скинути всі</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { act as schema } from '@/schemas/act.schema'

interface Filters {
  minDate: string
  maxDate: string
  estateType: string
  conclusionType: string
}

interface Props {
  modelValue: Partial<Filters>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Filters>): void
}>()

const model = computed<Partial<Filters>>({
  get: () => props.modelValue,
  set: (value: Partial<Filters>) => emit('update:modelValue', value)
})

const reset = () => {
  model.value = {}
}

</script>