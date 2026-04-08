<template>
  <v-dialog
    v-model="dialog"
    @keydown.esc="cancel"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
    class="dialog-confirmation"
  >
    <v-card>
      <v-card-title>
        {{ showTitle }}
      </v-card-title>

      <v-card-text>
        <div>{{ showDescription }}</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          ref="cancelButton"
          color="red-darken-3"
          text
          @click="cancel"
        >
          Відмінити
        </v-btn>

        <v-btn
          ref="agreeButton"
          color="primary-darken-1"
          @click="agree"
        >
          Підтвердити
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { VBtn } from 'vuetify/components'


type DialogOptions = {
  title?: string
  description?: string
}

const defaultValues: Required<DialogOptions> = {
  title: '',
  description: ''
}

const dialog = ref(false)
const title = ref<string | undefined>()
const description = ref<string | undefined>()

const resolveRef = ref<((value: boolean) => void) | null>(null)

// Refs to buttons
const cancelButton = ref<VBtn>()
const agreeButton = ref<VBtn>()

// Computed
const showTitle = computed(() =>
  title.value || 'Підтвердження дії'
)

const showDescription = computed(() =>
  description.value || 'Ви дійсно хочете Підтвердити цю дію?'
)

// Methods
const open = (options?: DialogOptions): Promise<boolean> => {
  dialog.value = true

  nextTick(() => {
    agreeButton.value?.$el?.focus()
  })

  title.value = defaultValues.title
  description.value = defaultValues.description

  if (options) {
    if ('title' in options) title.value = options.title
    if ('description' in options) description.value = options.description
  }

  return new Promise<boolean>((resolve) => {
    resolveRef.value = resolve
  })
}

const agree = () => {
  resolveRef.value?.(true)
  dialog.value = false
}

const cancel = () => {
  nextTick(() => {
    cancelButton.value?.$el?.focus()
  })

  resolveRef.value?.(false)
  dialog.value = false
}

defineExpose({
  open
})
</script>