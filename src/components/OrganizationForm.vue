<template>
  <div>
    <p class="text-subtitle-1 mb-6">Зазаначте найменування та код організації згідно з ЄДРПОУ</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.title.title }}</div>
    <v-text-field
      v-model="model.title"
      placeholder="Міністерство розвитку громад та територій України"
      variant="solo-inverted"
      name="organization.title"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.code.title }}</div>
    <organization-code
      v-model="model.code"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Act } from '@/types';
type Organization = Act['ownerOrganization']

import { organization as schema } from '@/schemas/organization.schema'

interface Props {
  modelValue: NonNullable<Organization>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Organization>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Organization>) => emit('update:modelValue', value)
})

</script>