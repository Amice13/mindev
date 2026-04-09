<template>
  <div class="pa-4">
    <h5 class="text-h5 mb-4">Склад комісії</h5>
    <div class="mb-6">Будь ласка, зазначте усіх членів комісії з їх відповідним статусом. Якщо ви вносите інформацію про себе, поставте відмітку "Це мій власний запис", щоб у подальшому можна було визначити особу, яка вносила дані.</div>
    <v-data-table
      class="elevation-1 hidden-sm-and-down"
      :headers="headers"
      hide-actions
      hide-default-footer
      item-key="id"
      :items="commissionMembers"
      no-data-text="Ви ще не додали жодного члена комісії"
    >
      <template #[`item.status`]="{ item }">
        <v-chip color="primary-darken-2" label>{{ item.status }}</v-chip>
      </template>
      <template #[`item.name`]="{ item }">
        <span class="text-no-wrap">{{ [item.familyName, item.givenName, item.additionalName].filter(Boolean).join(' ') }}</span>
      </template>
      <template #[`item.isCurrentUser`]="{ item }">
        <v-icon v-if="item.id === user.id">mdi-check</v-icon>
      </template>
      <template #[`item.id`]="{ item }">
        <v-btn color="error" size="small" variant="tonal" @click="remove(item.id)">Видалити</v-btn>
      </template>
    </v-data-table>
    <div class="hidden-md-and-up">
      <v-card v-for="commissionMember in commissionMembers" :key="commissionMember.id" class="mb-4" style="border-left: 12px solid #2e6868;">
        <v-card-text>
          <v-chip color="primary-darken-2" label>{{ commissionMember.status }}</v-chip>
          <div v-if="commissionMember.id === user.id" class="font-weight-bold my-4">Поточний користувач</div>
          <div class="my-4">{{ [commissionMember.familyName, commissionMember.givenName, commissionMember.additionalName].filter(Boolean).join(' ') }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" prepend-icon="mdi-delete" size="small" @click="remove(commissionMember.id)">Видалити</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-btn class="mt-6" color="primary" @click="add">Додати</v-btn>
    <commission-member-dialog :id="commissionMemberId" @cancel="commissionMemberId = undefined" />
  </div>
</template>

<script lang="ts" setup>
  import type { DataTableHeader } from 'vuetify'
  import { generateId } from '@/composables/generate-id'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const { commissionMembers, user } = storeToRefs(store)
  const { removeCommissionMember } = store

  const headers: DataTableHeader[] = [
    { key: 'name', title: 'Прізвище, ім\'я та по батькові' },
    { key: 'status', title: 'Статус' },
    { key: 'isCurrentUser', title: 'Поточний користувач', align: 'center' },
    { key: 'id', title: 'Видалити' },
  ]

  const commissionMemberId = ref<string | undefined>()

  function add () {
    commissionMemberId.value = generateId()
  }
  function remove (id: string) {
    removeCommissionMember(id)
  }

</script>
