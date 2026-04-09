<template>
  <div class="pa-4">

    <h5 class="text-h5 mb-4">Інформація про акт</h5>

    <div>Ви переглядаєте акт № {{ model.actNumber }} від {{ formatDate(model.actDate) }} щодо об'єкту:</div>
    <div class="mb-4"><strong>{{ model.estateType }}</strong></div>
    <div class="mb-4">Цей акт було підписано і внесення змін неможливе</div>

    <h5 class="text-h5 mt-6 mb-4">Файли</h5>
    <div class="mb-10">
      <ul class="pl-10">
        <li v-for="file in attachedFiles" :key="file.id"><a href="javascript:void(0)" @click="downloadFile(file)">{{ file.name }}</a></li>
      </ul>
    </div>

    <v-btn color="primary-darken-1" @click="router.push({ name: '/' })">Закрити</v-btn>
  </div>
</template>

<script lang="ts" setup>
  import type { Act } from '@/types'
  import type { CustomFile } from '@/types/files'
  import { useRouter } from 'vue-router'
  import { useFiles } from '@/composables/database'

  function formatDate (date: string | undefined): string {
    if (!date) date = new Date() as unknown as string
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const router = useRouter()

  interface Props {
    modelValue: Partial<Act>
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<Act>): void
  }>()

  const model = computed<Act>({
    get: () => props.modelValue as Act,
    set: (value: Partial<Act>) => emit('update:modelValue', value),
  })

  const attachedFiles = ref<CustomFile[]>([])

  onMounted(async () => {
    const { files: filesRepository } = useFiles()

    const files = await filesRepository
      .where('parentId')
      .equals(model.value.id)
      .toArray()
    console.log(files)
    attachedFiles.value = files
  })

  function downloadBlob (blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.style.display = 'none'

    document.body.append(a)
    a.click()

    a.remove()
    URL.revokeObjectURL(url)
  }

  function downloadFile (file: CustomFile) {
    downloadBlob(file.file, file.name)
  }

</script>
