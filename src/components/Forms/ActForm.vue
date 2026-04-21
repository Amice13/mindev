<template>
  <div class="pa-4">

    <h5 class="text-h5 mb-4">Інформація про затвердження акту</h5>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.date.title }}</div>
    <custom-date
      v-model="model.date"
      :aria-label="schema.properties.date.title"
      :max="new Date()"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.number.title }}</div>
    <v-text-field
      id="number"
      v-model="model.number"
      :aria-label="schema.properties.number.title"
      name="number"
      placeholder="123/12"
      variant="solo-inverted"
    />

    <h5 class="text-h5 mb-4">Інформація про акт</h5>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.actDate.title }}</div>
    <custom-date
      v-model="model.actDate"
      :aria-label="schema.properties.actDate.title"
      :max="new Date()"
    />

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.actNumber.title }}</div>
    <v-text-field
      id="number"
      v-model="model.actNumber"
      :aria-label="schema.properties.actNumber.title"
      name="number"
      placeholder="123/12"
      variant="solo-inverted"
    />

    <h5 class="text-h5 mt-6 mb-4">Об'єкт ОНМ</h5>
    <p class="text-subtitle-1 mb-6">Оберіть тип об'єкту нерухомого майна щодо якого здійснювалось обстеження</p>

    <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.estateType.title }}</div>
    <dictionary-value
      v-model="model.estateType"
      :aria-label="schema.properties.actNumber.title"
      dictionary="estateTypes"
    />

    <div v-if="model.estateType">
      <div
        v-if="[
          'Житлові будинки, будівлі, споруди (їх окремі частини)',
          'Квартири, житлові та нежитлові приміщення'
        ].includes(model.estateType ?? 'N/A')"
      >
        <h5 class="text-h5 mt-6 mb-4">Адреса</h5>
        <p class="text-subtitle-1 mb-6">Зазначте місцезнаходження об'єкта</p>
        <territory
          v-model="model.address"
          :disabled="commission?.address?.code2 === undefined ? [] : ['code1', 'code2']"
        />
        <custom-address
          v-if="[
            'Житлові будинки, будівлі, споруди (їх окремі частини)',
            'Квартири, житлові та нежитлові приміщення'
          ].includes(model.estateType ?? 'N/A')"
          v-model="model.address"
        />

        <h5 class="text-h5 mt-6 mb-4">Власник ОНМ</h5>
        <p class="text-subtitle-1 mb-6">Відомості про власника об’єкта, зокрема територіальну громаду (утворені нею органи місцевого самоврядування), суб’єкта управління об’єктами державної власності</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.ownerType.title }}</div>
        <dictionary-value
          v-model="model.ownerType"
          :aria-label="schema.properties.ownerType.title"
          dictionary="ownerTypes"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.ownershipType.title }}</div>
        <dictionary-value
          v-model="model.ownershipType"
          :aria-label="schema.properties.ownershipType.title"
          dictionary="ownershipTypes"
        />

        <person-form
          v-if="model.ownerType === 'Фізична особа'"
          v-model="model.ownerPerson"
        />
        <organization-form
          v-if="model.ownerType === 'Юридична особа'"
          v-model="model.ownerOrganization"
        />
      </div>

      <div v-if="model.estateType === 'Земельні ділянки'">
        <h5 class="text-h5 mt-6 mb-4">Адреса</h5>
        <p class="text-subtitle-1 mb-6">Зазначте місцезнаходження об'єкта</p>

        <territory
          v-model="model.address"
          :disabled="commission?.address?.code2 === undefined ? [] : ['code1', 'code2']"
        />

        <h5 class="text-h5 mt-6 mb-4">Загальна інформація</h5>
        <p class="text-subtitle-1 mb-6">Зазаначте кадастровий номер земельної ділянки та її площу</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.cadastreNumber.title }}</div>
        <cadastre-number
          v-model="model.cadastreNumber"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landArea.title }}</div>
        <numeric-field v-model="model.landArea" />

        <h5 class="text-h5 mt-6 mb-4">Власник ОНМ</h5>
        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.ownershipType.title }}</div>
        <dictionary-value
          v-model="model.ownershipType"
          :aria-label="schema.properties.ownershipType.title"
          dictionary="ownershipTypes"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.ownershipInfo.title }}</div>
        <v-textarea
          v-model="model.ownershipInfo"
          :aria-label="schema.properties.ownershipInfo.title"
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
        <h5 class="text-h5 mt-6 mb-4">Належність об'єкта до підприємства (комплексу)</h5>
        <p class="text-subtitle-1 mb-6">Визначте підприємство (комплекс), до складу якого входить об'єкт (за потреби)</p>

        <organization-form v-model="model.parentOrganization" />

        <h5 class="text-h5 mt-6 mb-4">Классифікація</h5>
        <p class="text-subtitle-1 mb-6">Оберіть код об'єкта згідно з Національним класифікатором НК 018:2023 "Класифікатор будівель і споруд" (НК 018:2023)</p>

        <building-class v-model="model.buildingClass" />
        <p class="text-subtitle-1 mb-6">Зазначте клас наслідків (відповідальності) згідно з проектною документацією (за наявності)</p>

        <dictionary-value
          v-model="model.consequenceClass"
          :aria-label="schema.properties.consequenceClass.title"
          dictionary="consequenceClasses"
        />

        <h5 class="text-h5 mt-6 mb-4">Культурна спадщина</h5>
        <p class="text-subtitle-1 mb-6">дані про віднесення об’єкта до пам’яток культурної спадщини, зона регулювання забудови та історичного ареалу</p>

        <cultural-heritage v-model="model.culturalHeritage" />

        <h5
          v-if="['112', '113', '121', '122', '123', '124', '126', '125', '127'].includes(model.buildingClass?.code3 ?? 'N/A')"
          class="text-h5 mt-6 mb-4"
        >
          Основні технічні показники об'єкта
        </h5>
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

        <h5
          v-if="['112', '113'].includes(model.buildingClass?.code3 ?? 'N/A')"
          class="text-h5 mt-6 mb-4"
        >
          Інші технічні показники
        </h5>
        <additional-data
          v-if="['112', '113'].includes(model.buildingClass?.code3 ?? 'N/A')"
          v-model="model.otherIndicators"
        />

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

      <div v-show="model.estateType === 'Квартири, житлові та нежитлові приміщення'" />

      <div v-if="model.estateType === 'Земельні ділянки'">
        <h5 class="text-h5 mt-6 mb-4">Документи</h5>
        <p class="text-subtitle-1 mb-6">Документи, що підтверджують право на земельну ділянку (за наявності)</p>
        <document-reference v-model="model.landDocument" />

        <h5 class="text-h5 mt-6 mb-4">Результати обстеження</h5>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landRestrictions.title }}</div>
        <v-textarea
          v-model="model.landRestrictions"
          :aria-label="schema.properties.landRestrictions.title"
          rows="4"
          variant="solo-inverted"
        />

        <p class="text-subtitle-1 mb-6">Зазначте результати обстеження земельної ділянки, у тому числі наявність на земельній ділянці збудованих або встановлених об'єктів та споруд, плодово-ягідних та інших багаторічних насаджень</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landObservations.title }}</div>
        <v-textarea
          v-model="model.landObservations"
          :aria-label="schema.properties.landObservations.title"
          rows="4"
          variant="solo-inverted"
        />
      </div>

      <!-- Conclusion -->
      <h5 class="text-h5 mt-6 mb-4">Узагальнюючий висновок</h5>
      <p class="text-subtitle-1 mb-6">Визначте відповідний висновок та надайте коментар за потреби</p>

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.conclusionType.title }}</div>
      <conclusion-type
        v-model="model.conclusionType"
        :aria-label="schema.properties.conclusionType.title"
        :filter="model.estateType"
      />

      <div v-if="model.conclusionType !== 'Інший висновок' && model.conclusionType !== undefined && model.estateType !== undefined">
        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.conclusionDetail.title }}</div>
        <conclusion-detail
          v-model="model.conclusionDetail"
          :aria-label="schema.properties.conclusionDetail.title"
          :filter="{
            conclusionType: model.conclusionType,
            estateType: model.estateType
          }"
        />
      </div>

      <div v-if="model.estateType === 'Житлові будинки, будівлі, споруди (їх окремі частини)'">
        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.additionalObservation.title }}</div>
        <dictionary-value
          v-model="model.additionalObservation"
          :aria-label="schema.properties.additionalObservation.title"
          dictionary="additionalObservations"
        />

        <div
          v-if="model.additionalObservation === 'Інше'"
          class="font-weight-bold mb-1 text-subtitle-2"
        >{{ schema.properties.additionalObservationExtra.title }}</div>

        <v-textarea
          v-if="model.additionalObservation === 'Інше'"
          v-model="model.additionalObservationExtra"
          :aria-label="schema.properties.additionalObservationExtra.title"
          rows="4"
          variant="solo-inverted"
        />
      </div>

      <div
        v-if="model.conclusionDetail === 'Необхідне вчинення дій для можливості використання земельної ділянки для будівництва об\'єктів нерухомого майна для проживання внутрішньо переміщених осіб та/або розміщення тимчасових споруд, їх комплексів, призначених для життєзабезпечення (тимчасового проживання та обслуговування) внутрішньо переміщених осіб'"
      >
        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.landAction.title }}</div>
        <dictionary-value
          v-model="model.landAction"
          :aria-label="schema.properties.landAction.title"
          dictionary="landActions"
        />

        <div
          v-if="model.landAction === 'Інше'"
          class="font-weight-bold mb-1 text-subtitle-2"
        >{{ schema.properties.landActionExtra.title }}</div>

        <v-textarea
          v-if="model.landAction === 'Інше'"
          v-model="model.landActionExtra"
          :aria-label="schema.properties.landActionExtra.title"
          rows="4"
          variant="solo-inverted"
        />
      </div>

      <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.conclusionText.title }}</div>
      <v-textarea
        v-model="model.conclusionText"
        :aria-label="schema.properties.conclusionText.title"
        rows="4"
        variant="solo-inverted"
      />
    </div>

    <h5 class="text-h5 mt-6 mb-4">Залучені особи</h5>
    <p class="text-subtitle-1 mb-6">Якщо на засіданні були присутні залучені до обстеження особи, зазначте їх</p>
    <involved-list v-model="model.involved" />

    <h5 class="text-h5 mt-8 mb-4">Завантажити та підписати</h5>
    <p class="text-subtitle-1 mb-6">Для отримання сформованого засобами системи акту комісійного обстеження перевірте правильність заповнення полів та натисніть "Завантажити".</p>
    <p class="text-subtitle-1 mb-6">У разі якщо заповнений акт комісійного обстеження потребує доопрацювання натисніть "Зберегти" нижче.</p>

    <v-btn color="primary-darken-1" @click="uploadDocument">Завантажити</v-btn>
    <sign-form v-model="actToSave" @cancel="discardDocument" />

    <h5 class="text-h5 mt-6 mb-4">Завершити роботу</h5>

    <v-btn color="primary-darken-1" @click="saveDocument">Зберегти</v-btn>
 <!--    <v-btn
      v-if="model.id"
      class="ml-4"
      color="error"
      variant="tonal"
      @click="deleteDocument"
    >Видалити</v-btn> -->
    <ValidationDialog ref="validationDialog" />
    <ConfirmationDialog ref="confirmationDialog" />
  </div>
</template>

<script lang="ts" setup>
  import type { Act } from '@/types'
  import { useRouter } from 'vue-router'
  import { useActs } from '@/composables/database'
  import { validateAct } from '@/composables/validate-act'
  import { act as schema } from '@/schemas/act.schema'
  import { useAppStore } from '@/stores/app'

  const { commission } = useAppStore()
  const router = useRouter()
  const { acts } = useActs()
  const confirmationDialog = ref()
  const validationDialog = ref()

  interface Props {
    modelValue: Partial<Act>
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Partial<Act>): void
  }>()

  const model = computed<Act>({
    get: () => props.modelValue as Act,
    set: (value: Partial<Act>) => emit('update:modelValue', value),
  })

  const actToSave = ref<Partial<Act>>({})

  async function uploadDocument () {
    model.value.updatedAt = new Date().toISOString()
    const errors = validateAct(toRaw(model.value))
    if (errors.length > 0) {
      await validationDialog.value.open({
        errors,
      })
      return
    }
    actToSave.value = model.value
  }

  function discardDocument () {
    actToSave.value = {}
  }

  async function saveDocument () {
    const act = JSON.parse(JSON.stringify(model.value))
    act.updatedAt = new Date().toISOString()
    try {
      await acts.put(act)
    } catch {
      alert('Сталася невідома помилка')
    }
    router.push({ name: '/' })
  }

  async function deleteDocument () {
    try {
      const isConfirmed = await confirmationDialog.value.open({
        title: 'Видалення акту',
        description: 'Ви дійсно хочете видалити цей акт?',
      })
      if (!isConfirmed) return false
      await acts.delete(model.value.id)
    } catch {
      alert('Сталася невідома помилка')
    }
    router.push({ name: '/' })
  }

</script>
