<template>
  <div>
    <v-list v-if="model?.length" class="bg-transparent">
      <v-list-item
        v-for="(file, i) in model"
        :key="`file-${i}`"
        :title="file.name"
      >
        <template v-slot:append>
          <v-btn
            @click="remove(i)"
            size="x-small"
            color="grey-darken-1"
            variant="tonal"
            icon="mdi-delete"
          />
        </template>
      </v-list-item>
    </v-list>
    <form
      @drag.prevent.stop
      @dragstart.prevent.stop
      @dragend.prevent.stop="isDragover = false"
      @dragover.prevent.stop="isDragover = true"
      @dragenter.prevent.stop="isDragover = true"
      @dragleave.prevent.stop="isDragover = false"
      @drop.prevent.stop="upload($event.dataTransfer?.files)"
      class="box mb-4 pa-4"
      :class="[isDragover ? 'bg-primary-lighten-2' : 'bg-primary-lighten-3']"
      method="post"
      action=""
      enctype="multipart/form-data"
    >
      <div class="box_input text-center pt-2 pb-2">
        <input
          ref="fileInput"
          @input="upload(($event.target as HTMLInputElement).files)"
          class="d-none box__file" type="file"
          :accept="accept"
          :name="'files' + uid + '[]'"
          :id="'file' + uid"
          data-multiple-caption="{count} files selected"
          multiple
        />
        <v-icon x-large class="mb-4">mdi-upload</v-icon>
        <br/>
        <label :for="'file' + uid">
          <strong class="mr-2">Оберіть файли</strong>
          <div class="box__dragndrop"> або перетягніть їх до цього вікна</div>
        </label>
      </div>
      <div class="box__uploading">Завантаження…</div>
      <div class="box__success">Готово</div>
      <div class="box__error">Помилка<span></span>.</div>
    </form>
  </div>
</template>

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

<script lang="ts" setup>

interface CustomFile {
  name: string
  type: string
  size: number
  lastModified: number
  file: File
}

interface Props {
  modelValue?: CustomFile[]
  accept?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ([]),
  uploadImmediately: true,
  mode: 'edit'
})

const isDragover = ref(false)

const model = computed<CustomFile[]>({
  get: () => props.modelValue ?? [],
  set: (value: CustomFile[]) => {
    emit('update:modelValue', value)
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', files: CustomFile[]): void
}>()

const uid = () => Math.random()

const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

const upload = async (fileList: FileList | null | undefined) => {
  if (!fileList?.length) return
  for (const file of [...fileList]) {
    model.value.push({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      file
    })
  }
  if (fileInput.value !== null) fileInput.value.value = ''
  isDragover.value = false
}

const remove = (i: number): void => {
  model.value.splice(i, 1)
}
</script>