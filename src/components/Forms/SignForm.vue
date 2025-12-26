<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent :overlay="false"
    max-width="700px"
    transition="dialog-transition"
  >
    <v-card color="main">
      <v-card-title primary-title>
        Зберегти та підписати акт
      </v-card-title>
      <v-card-text>
        <v-stepper
          :items="['Генерація', 'Підписання', 'Завантаження']"
          next-text="Продовжити"
          color="primary-darken-2"
          prev-text="Повернутися"
          stepper-item-avatar-color="red"
          flat
          class="bg-transparent flat"
        >
          <template v-slot:item.1>
            <v-card title="Згенерувати документ" flat class="bg-transparent">
              <v-card-text>
                <div class="mb-6">Для генерації документу натисніть кнопку "Згенерувати" та перейдіть на наступний етап.</div>
                <v-btn @click="downloadDocument" color="primary-darken-1">Завантажити</v-btn>
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.2>
            <v-card title="Підписання документу" flat class="bg-transparent">
              <v-card-text>
                <div class="mb-6">Для підписання документу натисніть кнопку "Підписати". Ви будете направлені на сервіс Дія-Підпис. Скористайтеся вашим кваліфікованим електронним підписом, щоб отримати підписаний документ</div>
                <v-btn href="https://ca.diia.gov.ua/sign" target="_blank" color="primary-darken-1">Підписати</v-btn>
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:item.3>
            <v-card title="Завантаження документу" flat class="bg-transparent">
              <v-card-text>
                <div class="mb-6">Завантажте підписаний документ та отриманий файл підпису *.pks до системи. Після завантаження натисніт кнопку "Завершити".</div>
                <upload-box v-model="files" accept=".docx,.pks" />
                <v-btn color="primary-darken-1">Завершити</v-btn>
              </v-card-text>
            </v-card>
          </template>
        </v-stepper>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="emit('cancel')">Скасувати</v-btn>
      </v-card-actions>
    </v-card>    
  </v-dialog>  
</template>

<style>
.flat .v-stepper-header {
  box-shadow: none;
}
</style>

<script setup lang="ts">
import type { Act } from '@/types'
import useGenerateDocument from '@/composables/generate-document'
import useDownload from '@/composables/download'
const { generateDocument } = useGenerateDocument()
const { download } = useDownload()

interface Props {
  modelValue: Partial<Act>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Act>): void,
  (e: 'cancel'): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Act>) => emit('update:modelValue', value)
})

const dialog = computed(() => {
  return Object.values(model.value).length > 0
})

const files = ref([])

const downloadDocument = () => {
  const doc = generateDocument(model.value as Act)
  download(doc, new Date().toLocaleString('sv').substring(0, 10) + ' - Акт обстеження.docx')
}

</script>