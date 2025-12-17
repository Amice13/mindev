<template>
  <div class="pa-4">
    <div class="d-flex align-content-space mb-4">
      <h5 class="text-h5 w-100">Акти комісії</h5>
      <v-btn
        to="/act"
        :disabled="errors.length > 0"
        prepend-icon="mdi-plus"
        color="primary-darken-1"
      >Створити</v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
      item-key="id"
      hide-default-footer
      :items-per-page="0"
      no-data-text="Ви ще не додали жодного акта"
    >
      <template v-slot:[`item.id`]="{ item }">
        <v-btn :to="`/acts/${item.id}`" fab icon="mdi-pencil" size="x-small" color="primary-darken-1"></v-btn>
      </template>
      <template v-slot:[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleString('uk').substring(0, 10) }}
      </template>
      <template v-slot:[`item.title`]="{ item }">
        {{ generateTitle(item) }}
      </template>
      <template v-slot:[`item.conclusionType`]="{ item }">
        {{ getType(item.conclusionType) }}
      </template>
    </v-data-table>
    <v-alert
      v-if="errors.length > 0"
      class="mt-6"
      color="primary-darken-2"
      variant="outlined"
    >
      <p class="mb-4">Для початку користування системою, вам необхідно вирішити насутпні проблеми</p>
      <ul class="pl-5 mb-4">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      <p>Для налашутвання системи, натисніть кнопку "Налаштувати"</p>
      <v-btn
        to="/admin"
        class="mt-6"
        variant="flat"
        color="primary-darken-1"
      >Налаштувати</v-btn>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import type { Act } from '@/types'
import { useAppStore } from '@/stores/app'
import useActs from '@/composables/database'
import conclusionTypes from '@/dicts/conclusion-types'

interface Filters {
  minDate: string
  maxDate: string
  estateType: string
  conclusionType: string
}

interface Props {
  filters: Partial<Filters>
}

const props = defineProps<Props>()

const { user, commission, commissionMembers } = useAppStore()

const errors = computed(() => {
  const problems = []
  if (!user.familyName) problems.push('Не визначено користувача системи')
  if (!commission.title) problems.push('Не зазначено інформацюі про комісію')
  if (commissionMembers.length === 0) problems.push('Не внесено жодного члена комісії')
  return problems
})

const headers = [
  { key: 'id', title: '' },
  { key: 'date', title: 'Дата' },
  { key: 'number', title: 'Номер' },
  { key: 'estateType', title: 'Тип' },
  { key: 'title', title: 'Назва' },
  { key: 'conclusionType', title: 'Висновок' },
  { key: 'signature', title: 'Підпис' }
]

const items = ref<Act[]>([])

const load = async () => {
  const { acts } = useActs()
  if (!props.filters) {
    items.value = await acts.toArray()
    return
  }
  items.value = await acts
    .filter((act: Act): boolean => {
      if (props.filters.conclusionType) {
        if (props.filters.conclusionType !== act.conclusionType) return false
      }
      if (props.filters.estateType) {
        if (props.filters.estateType !== act.estateType) return false
      }
      if (props.filters.minDate) {
        if (new Date(props.filters.minDate) > new Date(act.date)) return false
      }
      if (props.filters.maxDate) {
        if (new Date(props.filters.maxDate) < new Date(act.date)) return false
      }
      return true
    }).toArray()
}

onMounted(async () => {
  await load()
})

const generateTitle = (act: Act) => {
  if (act.cadastreNumber) return act.cadastreNumber
  const address = [
    [act.address.admin4, `(${act.address.code4})`].join(' '),
    [act.address.streetType, act.address.streetName].filter(Boolean).join(' '),
    act.address.building,
    (act.address.block ? ['корпус', act.address.block] : []).join(' '),
    (act.address.apartmentNumber ? ['кв.', act.address.apartmentNumber] : []).join(' ')
  ].join(', ')
  return address
}

const getType = (value?: string) => {
  if (!value) return ''
  const conclusionType = conclusionTypes.find(el => el.value === value)
  if (conclusionType) return conclusionType.title
}

watch(() => props.filters, () => {
  load()
},
{ deep: true }
)
</script>