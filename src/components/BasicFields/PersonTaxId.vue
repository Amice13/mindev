<template>
  <v-text-field
    v-model="model"
    v-maska="options"
    :rules="validationRules"
    placeholder="1234567890"
    class="tax-id"
    validate-on="blur"
    name="taxId"
    variant="solo-inverted"
    clearable
  />
</template>

<script lang="ts" setup>
import type { MaskInputOptions } from 'maska'
import { vMaska } from 'maska/vue'

const mult = [-1, 5, 7, 9, 4, 6, 10, 5, 7]

const validateTaxId = (value: number | string | undefined): boolean => {
  if (value === undefined) throw new Error('РНОКПП не зазначено')
  const checkValue = String(value).trim()
  if (!(/^\d{10}$/.test(checkValue))) throw new Error('РНОКПП має містити 10 цифр')
  const numbers = checkValue.slice(0, 9).split('').map(el => parseInt(el))
  const checkSum = numbers.reduce((acc: number, val: number, i: number) => acc + val * (mult?.[i] ?? 0), 0) % 11 % 10
  if (parseInt(checkValue.slice(9, 10)) !== checkSum) throw new Error('Це невірний РНОКПП')
  return true
}

// Props and emits
const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | undefined): void
}>()

// Two-way binding
const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

// v-maska options
const options = reactive<MaskInputOptions>({
  mask: 'AAAAAAAAAA',
  tokens: {
    A: { pattern: /\d/ }
  }
})

const validateTaxIdSafe = (value: string): boolean | string => {
  try {
    return validateTaxId(value)
  } catch (err) {
    return (err instanceof Error ? err.message : 'Це невірний РНОКПП')
  }
}

// Validation rules
const validationRules = [
  (value: string) =>
    !value || value.length === 10 || 'РНОКПП має містити 10 цифр',
  (value: string) =>
    !value || /^\d+$/.test(value) || 'РНОКПП має містити тільки цифри',
  (value: string) => {
    if (!value) return true
    if (value === '0000000000') return true
    return validateTaxIdSafe(value) ?? 'Невірний номер РНОКПП'
  }
]
</script>
