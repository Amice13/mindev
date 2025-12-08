<template>
  <div class="pa-4">
    <p class="text-subtitle-1 mb-6">Для початку роботи оберіть тип обстежуваного об'єкту нерухомого майна</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.estateType.title }}</div>
    <dictionary-value
      v-model="model.estateType"
      dictionary="estateTypes"
    />

    <h5 class="text-h5 mt-6 mb-4">Власник ОНМ</h5>
    <p class="text-subtitle-1 mb-6">Відомості про власника об’єкта, зокрема територіальну громаду (утворені нею органи місцевого самоврядування), суб’єкта управління об’єктами державної власності</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.ownerType.title }}</div>
    <dictionary-value
      v-model="model.ownerType"
      dictionary="ownerTypes"
    />

    <person-form
      v-if="model.ownerType === 'Фізична особа'"
      v-model="model.ownerPerson"
    />
    <organization-form
      v-if="model.ownerType === 'Юридична особа'"
      v-model="model.ownerOrganization"
    />

    <h5 class="text-h5 mt-6 mb-4">Загальні відомості про об’єкт</h5>
    <p class="text-subtitle-1 mb-6">Зазначте місцезнаходження об’єкта</p>
    <custom-address
      v-model="model.address"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Act } from '@/types'
import { act as schema } from '@/schemas/act.schema'

interface Props {
  modelValue: NonNullable<Act>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Partial<Act>): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: Partial<Act>) => emit('update:modelValue', value)
})

</script>