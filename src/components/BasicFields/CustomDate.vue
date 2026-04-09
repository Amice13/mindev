<template>
  <div class="date">
    <v-text-field
      id="date-menu-activator"
      v-model="date"
      v-maska="options"
      clearable
      :disabled="disabled"
      :hint="hint"
      :label="label"
      :name="name"
      :persistent-hint="persistentHint"
      placeholder="DD.MM.YYYY"
      variant="solo-inverted"
    >
      <template #append>
        <v-menu
          v-model="showCalendar"
          :close-on-content-click="false"
          :min-height="600"
          :min-width="400"
        >
          <template #activator="{ props: dateProps }">
            <v-icon v-bind="dateProps" icon="mdi-calendar" />
          </template>
          <v-locale-provider fallback-locale="en" locale="uk">
            <v-date-picker
              v-show="showCalendar"
              v-model="model"
              :aria-label="ariaLabel"
              color="primary"
              format="dd.mm.yyyy"
              header="Оберіть дату"
              input-text="dd.mm.yyyy"
              locale="uk"
              :max="maxDate"
              :min="minDate"
              title="Оберіть дату"
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
    ariaLabel?: string
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
      D: { pattern: /[0123]/ },
    },
  })

  // Show calendar menu
  const showCalendar = ref(false)
  const name = computed(() => {
    return props.name ?? 'date'
  })

  // Internal model representation as a real Date object
  const model = computed<Date | null>({
    get: () => {
      if (props.modelValue) {
        const d = new Date(props.modelValue)
        return Number.isNaN(d.getTime()) ? null : d
      }
      return null
    },
    set: value => {
      const formatted = value?.toLocaleDateString('sv') ?? null
      emit('update:modelValue', formatted)
    },
  })

  // String date for text input field
  const date = computed<string | undefined>({
    get: () => model.value?.toLocaleDateString('uk'),
    set: value => {
      if (!value) {
        model.value = null
        return
      }

      const match = value.match(/^(?<day>\d{2})\.(?<month>\d{2})\.(?<year>\d{4})$/)
      if (!match || !match.groups) return
      const { day, month, year } = match.groups
      model.value = new Date(`${year}-${month}-${day}`)
    },
  })

  // Max/min dates formatted as ISO string
  const maxDate = computed(() =>
    props.max ? props.max.toLocaleDateString('sv') : undefined,
  )
  const minDate = computed(() =>
    props.min ? props.min.toLocaleDateString('sv') : undefined,
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
