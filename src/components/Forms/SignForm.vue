<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent :overlay="false"
    max-width="700px"
    transition="dialog-transition"
  >
    <v-card color="main">
      <v-card-title primary-title class="bg-primary-darken-2">
        Зберегти та підписати акт
      </v-card-title>
      <v-card-text>
        <v-stepper
          v-model="step"
          :items="['Генерація', 'Підписання', 'Завантаження', 'Результат']"
          next-text="Продовжити"
          color="primary-darken-2"
          :hide-actions="step === 4"
          :prev-text="step === 1 ? '' : 'Повернутися'"
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
                <div class="mb-6">Завантажте архів із підписаними документами та отриманим файлом підпису (*.p7s, *.asice, *.asics) до системи. Ви можете також завантажити додаткові файли у форматах *.pdf, *.jpg та *.jpeg розміром не більше 5 Мб. Після завантаження натисніть кнопку "Завершити".</div>
                <upload-box v-model="files" accept=".docx,.p7s,.zip,.asice,.asics,.jpg,.jpeg,.pdf" />
                <v-btn @click="upload" color="primary-darken-1">Завершити</v-btn>
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:item.4>
            <v-card title="Результат" flat class="bg-transparent">
              <v-card-text>
                <div class="mb-2">
                  <v-icon color="green" class="mr-2">mdi-check</v-icon> Завантаження акту
                </div>
                <div class="mb-2">
                  <v-icon color="green" class="mr-2">mdi-check</v-icon> Завантаження файлів
                </div>
              </v-card-text>
            </v-card>
          </template>
        </v-stepper>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="emit('cancel')">{{ step === 4 ? 'Завершити' : 'Скасувати' }}</v-btn>
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
import type { CustomFile } from '@/types/files'
import useGenerateDocument from '@/composables/generate-document'
import useDownload from '@/composables/download'
import { uploadAct, uploadFile } from '@/composables/activity-info'
import { useActs, useFiles } from '@/composables/database'

const { acts } = useActs()
const { files: filesRepository } = useFiles()
const { generateDocument } = useGenerateDocument()
const { download } = useDownload()

const step = ref(1)

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

const files = ref<CustomFile[]>([])

const downloadDocument = () => {
  const doc = generateDocument(model.value as Act)
  download(doc, new Date().toLocaleString('sv').substring(0, 10) + ' - Акт обстеження.docx')
}

const upload = async () => {
  if (model.value.id === undefined) return
  model.value.synced = false
  
  const act = await acts.get(model.value.id)
  if (act === undefined) {
    // Upload act to the database
    if (!process.env.IS_TEST && navigator.onLine) {
      const actIsUploaded = await uploadAct(model.value as Act).catch(err => {
        console.log(err)
        alert('Неможливо завантажити акт')
        return false
      })
      if (actIsUploaded === false) return
      model.value.synced = true
    }
    acts.put(JSON.parse(JSON.stringify(model.value)))
  }

  for (const file of files.value) {
    const existingFile = await filesRepository
      .where('[parentId+name]')
      .equals([model.value.id, file.name])
      .first()
    if (existingFile) {
      alert(`Файл ${file.name} для цього акту вже був завантажений`)
      continue
    }

    file.parentId = model.value.id
    if (!process.env.IS_TEST && navigator.onLine) {
      const fileIsUploaded = await uploadFile(file).catch(err => {
        console.log(err)
        alert(`Неможливо завантажити файл ${file.name}`)
        return false
      })
      if (fileIsUploaded === false) continue
      file.synced = true
    }
    filesRepository.put(file)
  }
}

</script>