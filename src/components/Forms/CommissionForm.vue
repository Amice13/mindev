<template>
  <div class="pa-4">
    <h5 class="text-h5 mb-4">Основні дані про комісію</h5>
    <organization-form v-model="model" />

    <h5 class="text-h5 mt-6 mb-4">Місцезнаходження</h5>
    <territory v-model="model" />

    <v-btn
      @click="saveCommission"
      class="mt-4"
      color="primary-darken-1"
      :disabled="!isChanged"
    >Завантажити</v-btn>

  </div>
</template>

<script lang="ts" setup>
import type { Organization, Territory } from '@/types'
import { useAppStore } from '@/stores/app'

const model = ref<Organization & Partial<Territory>>({})

const { commission } = useAppStore()
const isChanged = ref<boolean>(false)

onBeforeMount(() => {
  model.value = toRaw(commission)
  nextTick(() => { isChanged.value = false })
})

watch(() => model, (): void => {
  if (isChanged.value) return
  isChanged.value = true
}, {
  deep: true
})

const saveCommission = () => {
  if (!model.value.admin4) return alert('Не визначено місцезнаходження комісії')
  if (!model.value.title) return alert('Не визначена назва комісії')
  if (!model.value.code) return alert('Не визначено код ЄДРПОУ комісії')
  commission.value = model.value
  isChanged.value = false
}
</script>