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
      :items="acts"
      hide-actions
      class="elevation-1"
      item-key="id"
      hide-default-footer
      no-data-text="Ви ще не додали жодного акта"
    >
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
import { useAppStore } from '@/stores/app'

const { user, commission, commissionMembers } = useAppStore()

const errors = computed(() => {
  const problems = []
  if (!user.familyName) problems.push('Не визначено користувача системи')
  if (!commission.title) problems.push('Не зазначено інформацюі про комісію')
  if (commissionMembers.length === 0) problems.push('Не внесено жодного члена комісії')
  return problems
})

const acts = ref([])

const headers = [
  { key: 'id', title: 'Редагувати' },
  { key: 'date', title: 'Дата' },
  { key: 'estateType', title: 'Тип' },
  { key: 'title', title: 'Назва' },
  { key: 'conclusionType', title: 'Висновок' },
  { key: 'signature', title: 'Підпис' }
]

</script>