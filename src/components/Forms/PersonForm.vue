<template>
  <div>
    <p class="text-subtitle-1 mb-6">Визначіть тип документа фізичної особи</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.documentType.title }}</div>
    <dictionary-value
      v-model="model.documentType"
      dictionary="personalDocumentTypes"
    />

    <div
      v-if="model.documentType === 'Паспорт громадянина України'"
      class="font-weight-bold mb-1 text-subtitle-2"
    >{{ schema.properties.passportNumber.title }}</div>
    <person-passport
      v-if="model.documentType === 'Паспорт громадянина України'"
      v-model="model.passportNumber"
    />

    <div
      v-if="model.documentType === 'РНОКПП'"
      class="font-weight-bold mb-1 text-subtitle-2"
    >{{ schema.properties.taxId.title }}</div>
    <person-tax-id
      v-if="model.documentType === 'РНОКПП'"
      v-model="model.taxId"
    />

    <p class="text-subtitle-1 mb-6">Зазначте прізвище, ім'я та по батькові особи</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.familyName.title }}</div>
    <ukrainian-text
      v-model="model.familyName"
      name="person.familyName"
      placeholder="Дія"
      variant="solo-inverted"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.givenName.title }}</div>
    <ukrainian-text
      v-model="model.givenName"
      name="person.givenName"
      placeholder="Надія"
      variant="solo-inverted"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.additionalName.title }}</div>
    <ukrainian-text
      v-model="model.additionalName"
      name="person.additionalName"
      placeholder="Володимирівна"
      variant="solo-inverted"
    />

  </div>
</template>

<script lang="ts" setup>
  import type { Act } from '@/types'

  import { person as schema } from '@/schemas/person.schema'
  type Person = Act['ownerPerson']

  interface Props {
    modelValue: NonNullable<Person>
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<Person>): void
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: (value: Partial<Person>) => emit('update:modelValue', value),
  })

</script>
