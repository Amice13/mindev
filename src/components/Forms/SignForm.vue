<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
    :overlay="false"
    persistent
    scrollable
    transition="dialog-transition"
  >
    <v-card color="main">
      <v-card-title class="bg-primary-darken-2" primary-title>
        Зберегти та підписати акт
      </v-card-title>
      <v-card-text>
        <v-stepper
          v-model="step"
          class="bg-transparent flat"
          color="primary-darken-2"
          flat
          :hide-actions="step === 4"
          :items="['Генерація', 'Підписання', 'Завантаження', 'Результат']"
          stepper-item-avatar-color="red"
        >
          <template #actions="{ next, prev }">
            <div class="d-flex flex-between mx-10">
              <v-btn
                v-if="step !== 1"
                prepend-icon="mdi-chevron-left"
                variant="text"
                @click="prev"
              >
                Повернутися
              </v-btn>

              <v-spacer />

              <v-btn
                v-if="!(step === 3 && notifications.length > 0) && step !== 4"
                append-icon="mdi-chevron-right"
                color="primary-darken-2"
                variant="text"
                @click="next"
              >
                Продовжити
              </v-btn>
            </div>
          </template>

          <template #item.1>
            <v-card class="bg-transparent" flat title="Згенерувати документ">
              <v-card-text>
                <div class="mb-6">Для генерації документу натисніть кнопку "Згенерувати" та перейдіть на наступний етап.</div>
                <v-btn color="primary-darken-1" @click="downloadDocument">Завантажити</v-btn>
              </v-card-text>
            </v-card>
          </template>

          <template #item.2>
            <v-card class="bg-transparent" flat title="Підписання документу">
              <v-card-text>
                <div class="mb-6">Для підписання документу натисніть кнопку "Підписати". Ви будете направлені на сервіс Дія-Підпис. Скористайтеся вашим кваліфікованим електронним підписом, щоб отримати підписаний документ.</div>
                <div class="mb-6"><strong>Зверніть увагу!</strong> Акт має бути піписаний головою комісії! Якщо ви не є головою комісії, то надішліть згенерований файл голові комісії та дочекайтеся від нього файл із підписом. А до цього моменту ви можете скасувати процедуру, зберегти акт та повернутися до завантаження пізніше.</div>
                <v-btn color="primary-darken-1" href="https://ca.diia.gov.ua/sign" target="_blank">Підписати</v-btn>
              </v-card-text>
            </v-card>
          </template>

          <template #item.3>
            <v-card class="bg-transparent" flat title="Завантаження документу">
              <v-card-text>
                <div class="mb-6">Завантажте архів <strong>(*.zip)</strong> із підписаними документами (*.docx) та отриманим файлом підпису <strong>(*.p7s, *.asice, *.asics)</strong> до системи. Ви можете також завантажити додаткові файли у форматах <strong>*.pdf, *.jpg та *.jpeg</strong> розміром не більше 5 Мб. Після завантаження натисніть кнопку <strong>"Продовжити"</strong>.</div>
                <div class="mb-6"><strong>Зверніть увагу!</strong> Після завантаження підписаного файлу з актом ви більше не зможити вносити до нього зміни!</div>
                <upload-box v-model="files" accept=".docx,.p7s,.zip,.asice,.asics,.jpg,.jpeg,.pdf" />
                <div class="my-2">
                  <ul class="pl-10">
                    <li v-for="notification in notifications" :key="notification">{{ notification }}</li>
                  </ul>
                </div>
              </v-card-text>
            </v-card>
          </template>
          <template #item.4>
            <v-card class="bg-transparent" flat title="Результат">
              <v-card-text>
                <div class="mb-2">
                  <v-progress-circular
                    v-if="actStatus === 'loading'"
                    class="mr-2"
                    color="primary-darken-2"
                    indeterminate
                    size="18"
                  />
                  <v-icon
                    v-if="actStatus === 'failed'"
                    class="mr-2"
                    color="red darken-2"
                  >mdi-close</v-icon>
                  <v-icon
                    v-if="actStatus === 'uploaded'"
                    class="mr-2"
                    color="green"
                  >mdi-check</v-icon> Завантаження акту
                </div>
                <div class="mb-2">
                  <v-progress-circular
                    v-if="filesStatus === 'loading'"
                    class="mr-2"
                    color="primary-darken-2"
                    indeterminate
                    size="18"
                  />
                  <v-icon
                    v-if="filesStatus === 'failed'"
                    class="mr-2"
                    color="red darken-2"
                  >mdi-close</v-icon>
                  <v-icon
                    v-if="filesStatus === 'uploaded'"
                    class="mr-2"
                    color="green"
                  >mdi-check</v-icon> Завантаження файлів
                </div>
                <div
                  v-if="!isOnline"
                  class="mt-6"
                >На данний момент відсутнє підключення до мережі, отже ваші файли збережуться локально та будуть завантажені пізніше.</div>
              </v-card-text>
            </v-card>
          </template>
        </v-stepper>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="close">{{ step === 4 ? 'Завершити' : 'Скасувати' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { Act } from '@/types'
  import type { CustomFile } from '@/types/files'
  import PizZip from 'pizzip'
  import { uploadAct, uploadFile } from '@/composables/activity-info'
  import { useActs, useFiles } from '@/composables/database'
  import useDownload from '@/composables/download'
  import useGenerateDocument from '@/composables/generate-document'

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
    (e: 'update:modelValue', value: Partial<Act>): void
    (e: 'cancel'): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<Act>) => emit('update:modelValue', value),
  })

  // Generic form methods
  const dialog = computed(() => {
    return Object.values(model.value).length > 0
  })

  function close () {
    step.value = 1
    emit('cancel')
  }

  // Document generation
  function downloadDocument () {
    const doc = generateDocument(model.value as Act)
    const today = new Date().toLocaleString('sv').slice(0, 10)
    const number = model.value.actNumber?.replace(/[\/\\]/g, '_')
    const date = new Date(model.value?.actDate ?? 0).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    download(doc, `${today} - Акт обстеження № ${number} від ${date} (${model.value.id}).docx`)
  }

  // File uploads
  const files = ref<CustomFile[]>([])

  const notifications = ref<string[]>([
    'Не завантажено акт у форматі *.docx',
    'Не завантажено підпис у дозволеному форматі',
  ])

  watch(files.value, async () => {
    const problems: string[] = []
    const actInDocxFiles = files.value.some(el => /Акт.*\.docx$/i.test(el.name))
    const signatureInFiles = files.value.some(el => /\.(p7s|asice|asics)$/i.test(el.name))
    const archives = files.value.filter(el => el.name.endsWith('.zip'))
    let actInZip = false
    let signatureInZip = false
    for (const archive of archives) {
      const { file } = archive
      const buffer = await file.arrayBuffer()
      const zip = new PizZip(buffer)
      const files = Object.keys(zip.files)
      for (const f of files) {
        if (/Акт.*\.docx$/i.test(f)) actInZip = true
        if (/\.(p7s|asice|asics)$/i.test(f)) signatureInZip = true
      }
    }
    if (!actInDocxFiles && !actInZip) problems.push('Не завантажено акт у форматі *.docx')
    if (!signatureInFiles && !signatureInZip) problems.push('Не завантажено підпис у дозволеному форматі')
    notifications.value = problems
  })

  // Communication with the server
  const actStatus = ref<string>('loading')
  const filesStatus = ref<string>('loading')

  async function upload () {
    if (model.value.id === undefined) return
    model.value.synced = false
    model.value.isSigned = true
    const act = await acts.get(model.value.id)
    if (act?.synced !== true) {
      // Upload act to the database
      if (!process.env.IS_TEST && navigator.onLine) {
        const actIsUploaded = await uploadAct(model.value as Act).catch(error => {
          console.log(error)
          alert('Неможливо завантажити акт')
          actStatus.value = 'failed'
          return false
        })
        actStatus.value = 'uploaded'
        if (actIsUploaded === false) return
        model.value.synced = true
      }
      acts.put(structuredClone(toRaw(model.value)))
      actStatus.value = 'uploaded'
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
        const fileIsUploaded = await uploadFile(file).catch(error => {
          console.log(error)
          alert(`Неможливо завантажити файл ${file.name}`)
          filesStatus.value = 'failed'
          return false
        })
        if (fileIsUploaded === false) continue
        file.synced = true
        filesStatus.value = 'uploaded'
      }
      filesRepository.put(toRaw(file))
      filesStatus.value = 'uploaded'
    }
  }

  watch(() => step.value, async () => {
    if (step.value === 4) upload()
  })

  const isOnline = ref(navigator.onLine)

  function update () {
    isOnline.value = navigator.onLine
  }

  onMounted(() => {
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
  })

  onUnmounted(() => {
    window.removeEventListener('online', update)
    window.removeEventListener('offline', update)
  })
</script>

<style>
.flat .v-stepper-header {
  box-shadow: none;
}
</style>
