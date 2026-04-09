<template>
  <div>
    <v-list v-if="model?.length" class="bg-transparent">
      <v-list-item
        v-for="(file, i) in model"
        :key="`file-${i}`"
        :title="file.name"
      >
        <template #append>
          <v-btn
            color="grey-darken-1"
            icon="mdi-delete"
            size="x-small"
            variant="tonal"
            @click="remove(i)"
          />
        </template>
      </v-list-item>
    </v-list>
    <form
      action=""
      class="box mb-4 pa-4"
      :class="[isDragover ? 'bg-primary-lighten-2' : 'bg-primary-lighten-3']"
      enctype="multipart/form-data"
      method="post"
      @drag.prevent.stop
      @dragend.prevent.stop="isDragover = false"
      @dragenter.prevent.stop="isDragover = true"
      @dragleave.prevent.stop="isDragover = false"
      @dragover.prevent.stop="isDragover = true"
      @dragstart.prevent.stop
      @drop.prevent.stop="upload($event.dataTransfer?.files)"
    >
      <div class="box_input text-center pt-2 pb-2">
        <input
          :id="'file' + uid()"
          ref="fileInput"
          :accept="accept"
          class="d-none box__file"
          data-multiple-caption="{count} files selected"
          multiple
          :name="'files' + uid() + '[]'"
          type="file"
          @input="upload(($event.target as HTMLInputElement).files)"
        >
        <v-icon class="mb-4" x-large>mdi-upload</v-icon>
        <br>
        <label :for="'file' + uid" @click="fileInput?.click()">
          <strong class="mr-2">Оберіть файли</strong>
          <div class="box__dragndrop"> або перетягніть їх до цього вікна</div>
        </label>
      </div>
      <div class="box__uploading">Завантаження…</div>
      <div class="box__success">Готово</div>
      <div class="box__error">Помилка<span />.</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import type { CustomFile } from '@/types/files'
  import { compressImage } from '@/composables/compress-image'
  import { generateId } from '@/composables/generate-id'

  interface Props {
    modelValue?: CustomFile[]
    accept?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ([]),
    uploadImmediately: true,
    mode: 'edit',
  })

  const isDragover = ref(false)

  const model = computed<CustomFile[]>({
    get: () => props.modelValue ?? [],
    set: (value: CustomFile[]) => {
      emit('update:modelValue', value)
    },
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', files: CustomFile[]): void
  }>()

  const uid = () => Math.random()

  const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

  async function upload (fileList: FileList | null | undefined) {
    if (!fileList?.length) return
    const accept = props.accept?.slice(1).split(/,\./g) ?? []
    for (let file of fileList) {
      const extension = file.name.split(/\./g).at(-1)
      if (!accept.includes(extension ?? '')) continue
      if (['jpg', 'jpeg'].includes(extension ?? '') && file.size > 409_600) file = await compressImage({ file })
      model.value.push({
        id: generateId(),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        file,
      })
    }
    if (fileInput.value !== null) fileInput.value.value = ''
    isDragover.value = false
  }

  function remove (i: number): void {
    model.value.splice(i, 1)
  }
</script>

<style scoped>
.box__dragndrop,
.box__uploading,
.box__success,
.box__error {
  display: none;
}

.box {
  font-size: 1.25rem;
  background-color: #b7dfdf;
  position: relative;
  outline: 2px dashed #3d8b8b;
  outline-offset: -10px;
  -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
  transition: outline-offset .15s ease-in-out, background-color .15s linear;
  border-radius: 1em;
}

.box .box__dragndrop {
  font-size: 1rem;
  display: block;
}

.box_input label {
  max-width: 80%;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
}

.box_input label:hover strong, .box_input.has-focus label strong {
  color: #39bfd3;
}

.box_input label * {
  pointer-events: none;
}

.box.is-uploading .box_input {
  visibility: none;
}

.box.is-uploading .box__uploading {
  display: block;
}

</style>
