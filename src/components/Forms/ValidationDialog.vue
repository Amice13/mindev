<template>
  <v-dialog
    v-model="dialog"
    class="dialog-confirmation"
    max-width="800px"
    :overlay="false"
    persistent
    scrollable
    transition="dialog-transition"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title class="bg-primary-darken-2" primary-title>
        {{ showTitle }}
      </v-card-title>

      <v-card-text>
        <div class="mb-4 mt-4">На жаль, вашу форму неможливо завантажити, оскільки вона містить наступні помилки:</div>
        <div>
          <ul class="pl-10">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
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
    errors: string[]
  }

  const defaultValues: Required<DialogOptions> = {
    title: '',
    errors: [],
  }

  const dialog = ref(false)
  const title = ref<string | undefined>()
  const errors = ref<string[]>([])

  const resolveRef = ref<((value: boolean) => void) | null>(null)

  // Refs to buttons
  const cancelButton = ref<VBtn>()
  const agreeButton = ref<VBtn>()

  // Computed
  const showTitle = computed(() =>
    title.value || 'Помилка валідації',
  )

  // Methods
  function open (options?: DialogOptions): Promise<boolean> {
    dialog.value = true

    nextTick(() => {
      agreeButton.value?.$el?.focus()
    })

    title.value = defaultValues.title

    if (options) {
      if ('title' in options) title.value = options.title
      if ('errors' in options) errors.value = options.errors
    }

    return new Promise<boolean>(resolve => {
      resolveRef.value = resolve
    })
  }

  function agree () {
    resolveRef.value?.(true)
    dialog.value = false
  }

  function cancel () {
    nextTick(() => {
      cancelButton.value?.$el?.focus()
    })

    resolveRef.value?.(false)
    dialog.value = false
  }

  defineExpose({
    open,
  })
</script>
