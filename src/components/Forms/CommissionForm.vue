<template>
  <div class="pa-4">
    <h5 class="text-h5 mb-4">Основні дані про комісію</h5>
    <div class="mb-4">Оберіть вашу комісію із запропонованого переліку та натисніть кнопку зберігти. Якщо ваша комісія відсутня у списку, зніміть позначку вибору зі списку та заповніть дані самостійно.</div>

    <v-checkbox
      v-model="commissionIsPredefined"
      label="Обрати комісію з існуючого переліку"
    />

    <commission-selector v-if="commissionIsPredefined" v-model="model" />

    <div v-if="!commissionIsPredefined">
      <organization-form v-model="model" />

      <h5 class="text-h5 mt-6 mb-4">Місцезнаходження</h5>
      <territory v-model="model.address!" />
    </div>

    <v-btn
      class="mt-4"
      color="primary-darken-1"
      :disabled="!isChanged"
      @click="saveNewCommission"
    >Зберегти</v-btn>

  </div>
</template>

<script lang="ts" setup>
  import type { Organization } from '@/types'
  import { checkCode } from '@/composables/edrpou-validator'
  import { useAppStore } from '@/stores/app'

  const model = ref<Organization>({
    address: {},
    title: ''
  })

  const store = useAppStore()
  const { commission, saveCommission } = store
  const { commissionIsPredefined } = storeToRefs(store)

  const isChanged = ref<boolean>(false)

  onBeforeMount(() => {
    model.value = {
      ...toRaw(commission),
      title: commission?.title ?? '',
      address: commission?.address ?? {},
    } as Organization
    nextTick(() => {
      isChanged.value = false
    })
  })

  watch(() => model, (): void => {
    if (isChanged.value) return
    isChanged.value = true
  }, {
    deep: true,
  })

  function saveNewCommission () {
    if (!model.value?.address?.admin4) return alert('Не визначено місцезнаходження комісії')
    if (!model.value?.title) return alert('Не визначена назва комісії')
    if (!model.value?.code) return alert('Не визначено код ЄДРПОУ комісії')
    if (checkCode(model.value.code) !== true) return alert('Зазначений код ЄДРПОУ є невірним')
    saveCommission(model.value)
    isChanged.value = false
  }
</script>
