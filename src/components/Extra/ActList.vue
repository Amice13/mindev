<template>
  <div class="pa-4">
    <div class="d-flex align-content-space mb-4">
      <h5 class="text-h5 w-100">Акти комісії</h5>
      <v-btn
        color="primary-darken-1"
        :disabled="errors.length > 0"
        prepend-icon="mdi-plus"
        to="/acts/new"
      >Створити</v-btn>
    </div>
    <v-data-table
      class="elevation-1 hidden-md-and-down"
      :headers="headers"
      hide-actions
      hide-default-footer
      item-key="id"
      :items="items"
      :items-per-page="0"
      no-data-text="Ви ще не додали жодного акта"
    >
      <template #[`item.id`]="{ item }">
        <v-tooltip location="top" :text="item.isSigned ? 'Переглянути' : 'Редагувати'">
          <template #activator="{ props: tooltipProps }">
            <v-btn
              v-bind="tooltipProps"
              class="mr-2"
              color="primary-darken-1"
              fab
              :icon="item.isSigned ? 'mdi-eye' : 'mdi-pencil'"
              size="x-small"
              :to="`/acts/${item.id}`"
            />
          </template>
        </v-tooltip>
        <v-tooltip location="top" text="Видалити">
          <template #activator="{ props: tooltipProps }">
            <v-btn
              v-if="!item.isSigned"
              v-bind="tooltipProps"
              color="red-darken-3"
              fab
              icon="mdi-delete"
              size="x-small"
              @click="remove(item.id)"
            />
          </template>
        </v-tooltip>
      </template>
      <template #[`item.date`]="{ item }">
        {{ new Date(item.date).toLocaleString('uk').substring(0, 10) }}
      </template>
      <template #[`item.title`]="{ item }">
        {{ generateTitle(item) }}
      </template>
      <template #[`item.conclusionType`]="{ item }">
        {{ getType(item.conclusionType) }}
      </template>
    </v-data-table>
    <div class="hidden-md-and-up">
      <v-card v-for="act in items" :key="act.id" class="mb-4" style="border-left: 12px solid #2e6868;">
        <v-card-text>
          <div class="font-weight-bold text-caption">{{ new Date(act.date).toLocaleString('uk').substring(0, 10) }}</div>
          <div class="my-4">{{ generateTitle(act) }}</div>
          <div class="font-weight-bold">{{ getType(act.conclusionType) }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary-darken-1" prepend-icon="mdi-pencil" size="small">Редагувати</v-btn>
        </v-card-actions>
      </v-card>
    </div>
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
        class="mt-6"
        color="primary-darken-1"
        to="/admin"
        variant="flat"
      >Налаштувати</v-btn>
    </v-alert>
    <ConfirmationDialog ref="confirmationDialog" />
  </div>
</template>

<script setup lang="ts">
  import type { DataTableHeader } from 'vuetify'
  import type { Act } from '@/types'
  import { useActs } from '@/composables/database'
  import conclusionTypes from '@/dicts/conclusion-types'
  import { useAppStore } from '@/stores/app'

  const { acts } = useActs()

  const confirmationDialog = ref()

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
    if (!commission?.title) problems.push('Не зазначено інформацію про комісію')
    if (commissionMembers.length === 0) problems.push('Не внесено жодного члена комісії')
    const headOfCommission = commissionMembers.find(member => member.status === 'Голова комісії')
    if (headOfCommission === undefined) problems.push('Не зазначено голову комісії')
    return problems
  })

  const headers = [
    { key: 'id', title: 'Дії', width: 110 },
    { key: 'date', title: 'Дата' },
    { key: 'number', title: 'Номер' },
    { key: 'estateType', title: 'Тип' },
    { key: 'title', title: 'Назва' },
    { key: 'conclusionType', title: 'Висновок' },
    { key: 'signature', title: 'Підпис' },
  ] as DataTableHeader[]

  const items = ref<Act[]>([])

  async function load () {
    if (!props.filters) {
      items.value = await acts.toArray()
      return
    }
    items.value = await acts
      .filter((act: Act): boolean => {
        if (props.filters.conclusionType && props.filters.conclusionType !== act.conclusionType) return false
        if (props.filters.estateType && props.filters.estateType !== act.estateType) return false
        if (props.filters.minDate && new Date(props.filters.minDate) > new Date(act.date)) return false
        if (props.filters.maxDate && new Date(props.filters.maxDate) < new Date(act.date)) return false
        return true
      })
      .toArray()
  }

  onMounted(async () => {
    await load()
  })

  function generateTitle (act: Act) {
    if (act.cadastreNumber) return act.cadastreNumber
    const address = [
      [act.address.admin4, `(${act.address.code4})`].join(' '),
      [act.address.streetType, act.address.streetName].filter(Boolean).join(' '),
      act.address.building,
      (act.address.block ? ['корпус', act.address.block] : []).join(' '),
      (act.address.apartmentNumber ? ['кв.', act.address.apartmentNumber] : []).join(' '),
    ].filter(Boolean).join(', ')
    return address
  }

  function getType (value?: string) {
    if (!value) return ''
    const conclusionType = conclusionTypes.find(el => el.value === value)
    if (conclusionType) return conclusionType.title
  }

  async function remove (id: string) {
    const isConfirmed = await confirmationDialog.value.open({
      title: 'Видалення акту',
      description: 'Ви дійсно хочете видалити цей акт?',
    })
    if (isConfirmed) await acts.delete(id)
    load()
  }

  watch(() => props.filters, () => {
          load()
        },
        { deep: true },
  )
</script>
