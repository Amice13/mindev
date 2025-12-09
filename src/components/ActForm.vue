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

    <h5 class="text-h5 mt-6 mb-4">Адреса</h5>
    <p class="text-subtitle-1 mb-6">Зазначте місцезнаходження об'єкта</p>
    <territory v-model="model.address" />
    <custom-address v-model="model.address" />

    <h5 class="text-h5 mt-6 mb-4">Призначення</h5>
    <p class="text-subtitle-1 mb-6">Вкажіть призначення (згідно з проектною документацією на будівництво об’єкта/станом на час проведення обстеження)</p>

    <functional-purpose v-model="model.functionalPurpose" />

    <h5 class="text-h5 mt-6 mb-4">Батьківська організація</h5>
    <p class="text-subtitle-1 mb-6">Визначте підприємство (комплекс), до складу якого входить об'єкт (за потреби)</p>

    <organization-form v-model="model.parentOrganization" />

    <h5 class="text-h5 mt-6 mb-4">Классифікація</h5>
    <p class="text-subtitle-1 mb-6">Оберіть код об'єкта згідно з Національним класифікатором НК 018:2023 “Класифікатор будівель і споруд” (НК 018:2023)</p>

    <building-class v-model="model.buildingClass" />
    <p class="text-subtitle-1 mb-6">Зазначте клас наслідків (відповідальності) згідно з проектною документацією (за наявності)</p>

    <dictionary-value
      v-model="model.consequenceClass"
      dictionary="consequenceClasses"
    />

    <h5 class="text-h5 mt-6 mb-4">Культурна спадщина</h5>
    <p class="text-subtitle-1 mb-6">дані про віднесення об’єкта до пам’яток культурної спадщини, зона регулювання забудови та історичного ареалу</p>

    <cultural-heritage v-model="model.culturalHeritage" />

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