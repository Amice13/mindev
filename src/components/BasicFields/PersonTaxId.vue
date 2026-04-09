<template>
  <v-text-field
    v-model="model"
    v-maska="options"
    aria-label="РНОКПП"
    class="tax-id"
    clearable
    name="taxId"
    placeholder="1234567890"
    :rules="validationRules"
    validate-on="blur"
    variant="solo-inverted"
  />
</template>

<script lang="ts" setup>
  import type { MaskInputOptions } from 'maska'
  import { vMaska } from 'maska/vue'

  const mult = [-1, 5, 7, 9, 4, 6, 10, 5, 7]

  function validateTaxId (value: number | string | undefined): boolean {
    if (value === undefined) throw new Error('РНОКПП не зазначено')
    const checkValue = String(value).trim()
    if (!(/^\d{10}$/.test(checkValue))) throw new Error('РНОКПП має містити 10 цифр')
    const numbers = checkValue.slice(0, 9).split('').map(el => Number.parseInt(el))
    const checkSum = numbers.reduce((acc: number, val: number, i: number) => acc + val * (mult?.[i] ?? 0), 0) % 11 % 10
    if (Number.parseInt(checkValue.slice(9, 10)) !== checkSum) throw new Error('Це невірний РНОКПП')
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
    set: value => emit('update:modelValue', value),
  })

  // v-maska options
  const options = reactive<MaskInputOptions>({
    mask: 'AAAAAAAAAA',
    tokens: {
      A: { pattern: /\d/ },
    },
  })

  function validateTaxIdSafe (value: string): boolean | string {
    try {
      return validateTaxId(value)
    } catch (error) {
      return (error instanceof Error ? error.message : 'Це невірний РНОКПП')
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
      return validateTaxIdSafe(value) ?? 'Невірний номер РНОКПП'
    },
  ]
</script>
