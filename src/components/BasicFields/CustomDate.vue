<template>
  <div class="date">
    <v-text-field
      v-model="date"
      v-maska="options"
      placeholder="DD.MM.YYYY"
      :label="label"
      :hint="hint"
      :persistent-hint="persistentHint"
      :disabled="disabled"
      :name="name"
      variant="solo-inverted"
      id="date-menu-activator"
      clearable
    >
      <template #append>
        <v-menu
          v-model="showCalendar"
          :close-on-content-click="false"
          :min-width="400"
          :min-height="600"
        >
          <template #activator="{ props }">
            <v-icon v-bind="props" icon="mdi-calendar" />
          </template>
          <v-locale-provider locale="uk" fallback-locale="en">
            <v-date-picker
              v-model="model"
              v-show="showCalendar"
              title="Оберіть дату"
              :max="maxDate"
              :min="minDate"
              header="Оберіть дату"
              locale="uk"
              color="primary"
              format="dd.mm.yyyy"
              input-text="dd.mm.yyyy"
            />
          </v-locale-provider>
        </v-menu>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { MaskInputOptions } from 'maska'
import { vMaska } from 'maska/vue'

// Props
const props = defineProps<{
  modelValue?: string | number | Date
  max?: Date
  min?: Date
  label?: string
  hint?: string
  name?: string
  persistentHint?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void
}>()

// Masking options
const options = reactive<MaskInputOptions>({
  mask: 'D#.M#.Y###',
  tokens: {
    Y: { pattern: /[12]/ },
    M: { pattern: /[01]/ },
    D: { pattern: /[0123]/ }
  }
})

// Show calendar menu
const showCalendar = ref(false)
const name = computed(() => { return props.name ?? 'date' })

// Internal model representation as a real Date object
const model = computed<Date | null>({
  get: () => {
    if (props.modelValue) {
      const d = new Date(props.modelValue)
      return isNaN(d.getTime()) ? null : d
    }
    return null
  },
  set: (value) => {
    const formatted = value?.toLocaleDateString('sv') ?? null
    emit('update:modelValue', formatted)
  }
})

// String date for text input field
const date = computed<string | undefined>({
  get: () => model.value?.toLocaleDateString('uk'),
  set: (value) => {
    if (!value) {
      model.value = null
      return
    }

    const match = value.match(/^(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4})$/)
    if (!match || !match.groups) return
    const { day, month, year } = match.groups
    model.value = new Date(`${year}-${month}-${day}`)
  }
})

// Max/min dates formatted as ISO string
const maxDate = computed(() =>
  props.max ? props.max.toLocaleDateString('sv') : undefined
)
const minDate = computed(() =>
  props.min ? props.min.toLocaleDateString('sv') : undefined
)

// Hide calendar after selection
watch(model, () => {
  showCalendar.value = false
})

// Optional init to populate date field if pre-filled
onMounted(() => {
  if (model.value) date.value = model.value.toLocaleDateString('uk')
})
</script>
