<template>
  <div class="pa-4">
    <p class="text-subtitle-1 mb-6">Для початку роботи оберіть тип обстежуваного об'єкту нерухомого майна</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.estateType.title }}</div>
    <dictionary-value
      v-model="model.estateType"
      dictionary="estateTypes"
    />

    <div v-if="model.estateType">
      <div
        v-if="[
          'Житлові будинки, будівлі, споруди (їх окремі частини)',
          'Квартири, житлові та нежитлові приміщення'
        ].includes(model.estateType ?? 'N/A')"
      >
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
        <custom-address
          v-if="[
            'Житлові будинки, будівлі, споруди (їх окремі частини)',
            'Квартири, житлові та нежитлові приміщення'
          ].includes(model.estateType ?? 'N/A')"
          v-model="model.address"
        />
      </div>

      <div v-if="model.estateType === 'Земельні ділянки'">
        <h5 class="text-h5 mt-6 mb-4">Адреса</h5>
        <p class="text-subtitle-1 mb-6">Зазначте місцезнаходження об'єкта</p>

        <territory v-model="model.address" />

        <h5 class="text-h5 mt-6 mb-4">Загальна інформація</h5>
        <p class="text-subtitle-1 mb-6">Зазаначте кадастровий номер земельної ділянки та її площу</p>
   
        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.cadastreNumber.title }}</div>
        <cadastre-number
          v-model="model.cadastreNumber"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landArea.title }}</div>
        <numeric-field v-model="model.landArea" />

        <h5 class="text-h5 mt-6 mb-4">Власник ОНМ</h5>
        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.formOfOwnership.title }}</div>
        <dictionary-value
          v-model="model.formOfOwnership"
          dictionary="ownershipTypes"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.ownershipInfo.title }}</div>
        <v-textarea
          v-model="model.ownershipInfo"
          rows="4"
          variant="solo-inverted"
        />
      </div>

      <h5 class="text-h5 mt-6 mb-4">Призначення</h5>

      <land-category
        v-if="model.estateType === 'Земельні ділянки'"
        v-model="model.landCategory"
      />
      <div
        v-if="[
          'Житлові будинки, будівлі, споруди (їх окремі частини)',
          'Квартири, житлові та нежитлові приміщення'
        ].includes(model.estateType ?? 'N/A')"
      >
        <p class="text-subtitle-1 mb-6">Вкажіть призначення (згідно з проектною документацією на будівництво об’єкта/станом на час проведення обстеження)</p>

        <functional-purpose v-model="model.functionalPurpose" />
      </div>

      <div v-show="model.estateType === 'Житлові будинки, будівлі, споруди (їх окремі частини)'">
        <h5 class="text-h5 mt-6 mb-4">Батьківська організація</h5>
        <p class="text-subtitle-1 mb-6">Визначте підприємство (комплекс), до складу якого входить об'єкт (за потреби)</p>

        <organization-form v-model="model.parentOrganization" />

        <h5 class="text-h5 mt-6 mb-4">Классифікація</h5>
        <p class="text-subtitle-1 mb-6">Оберіть код об'єкта згідно з Національним класифікатором НК 018:2023 "Класифікатор будівель і споруд" (НК 018:2023)</p>

        <building-class v-model="model.buildingClass" />
        <p class="text-subtitle-1 mb-6">Зазначте клас наслідків (відповідальності) згідно з проектною документацією (за наявності)</p>

        <dictionary-value
          v-model="model.consequenceClass"
          dictionary="consequenceClasses"
        />

        <h5 class="text-h5 mt-6 mb-4">Культурна спадщина</h5>
        <p class="text-subtitle-1 mb-6">дані про віднесення об’єкта до пам’яток культурної спадщини, зона регулювання забудови та історичного ареалу</p>

        <cultural-heritage v-model="model.culturalHeritage" />

        <h5 class="text-h5 mt-6 mb-4">Основні технічні показники об'єкта</h5>
        <building-properties-first
          v-if="['112', '113'].includes(model.buildingClass?.code3 ?? 'N/A')"
          v-model="model.buildingProperty"
        />
        <building-properties-second
          v-if="['121', '122', '123', '124', '126'].includes(model.buildingClass?.code3 ?? 'N/A')"
          v-model="model.buildingProperty"
        />
        <building-properties-third
          v-if="['125', '127'].includes(model.buildingClass?.code3 ?? 'N/A')"
          v-model="model.buildingProperty"
        />

        <h5 class="text-h5 mt-6 mb-4">Інші технічні показники</h5>
        <additional-data v-model="model.otherIndicators" />

        <h5 class="text-h5 mt-6 mb-4">Основні будівельні конструкції</h5>
        <construction-elements v-model="model.constructionElements" />

        <h5 class="text-h5 mt-6 mb-4">Внутрішні інженерні системи</h5>
        <internal-systems v-model="model.internalSystems" />
      </div>

      <div v-show="model.estateType === 'Квартири, житлові та нежитлові приміщення'">
        <h5 class="text-h5 mt-6 mb-4">Інформація щодо оренди</h5>
        <rent-info v-model="model.rentInfo" />

        <h5 class="text-h5 mt-6 mb-4">Основні показники об'єкта</h5>
        <apartment v-model="model.apartment" />

        <h5 class="text-h5 mt-6 mb-4">Внутрішні інженерні системи</h5>
        <apartment-internal-systems v-model="model.apartmentInternalSystems" />
      </div>

      <div v-show="model.estateType === 'Квартири, житлові та нежитлові приміщення'">
      </div>

      <div v-if="model.estateType === 'Земельні ділянки'">
        <h5 class="text-h5 mt-6 mb-4">Документи</h5>
        <p class="text-subtitle-1 mb-6">Документи, що підтверджують право на земельну ділянку (за наявності)</p>
        <document-reference v-model="model.landDocument" />        

        <h5 class="text-h5 mt-6 mb-4">Результати обстеження</h5>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landRestrictions.title }}</div>
        <v-textarea
          v-model="model.landRestrictions"
          rows="4"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landObservations.title }}</div>
        <v-textarea
          v-model="model.landObservations"
          rows="4"
          variant="solo-inverted"
        />

      </div>



      <h5 class="text-h5 mt-6 mb-4">Узагальнюючий висновок</h5>
      <p class="text-subtitle-1 mb-6">Визначте відповідний висновок та надайте коментар за потреби</p>

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.conclusionType.title }}</div>
      <conclusion-type
        v-model="model.conclusionType"
        :filter="model.estateType"
      />

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.conclusionText.title }}</div>
      <v-textarea
        v-model="model.conclusionText"
        rows="4"
        variant="solo-inverted"
      />
    </div>
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