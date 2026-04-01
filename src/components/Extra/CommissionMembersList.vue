<template>
  <div class="pa-4">
    <h5 class="text-h5 mb-4">Склад комісії</h5>
    <v-data-table
      :headers="headers"
      :items="commissionMembers"
      hide-actions
      class="elevation-1 hidden-sm-and-down"
      item-key="id"
      hide-default-footer
      no-data-text="Ви ще не додали жодного члена комісії"
    >
      <template v-slot:[`item.status`]="{ item }">
        <v-chip label color="primary-darken-2">{{ item.status }}</v-chip>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <span class="text-no-wrap">{{ [item.familyName, item.givenName, item.additionalName].filter(Boolean).join(' ') }}</span>
      </template>
      <template v-slot:[`item.isCurrentUser`]="{ item }">
        <v-icon v-if="item.id === user.id">mdi-check</v-icon>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        <v-btn @click="remove(item.id)" color="error" variant="tonal" size="small">Видалити</v-btn>
      </template>
    </v-data-table>
    <div class="hidden-md-and-up">
      <v-card v-for="commissionMember in commissionMembers" :key="commissionMember.id" class="mb-4" style="border-left: 12px solid #2e6868;">
        <v-card-text>
          <v-chip label color="primary-darken-2">{{ commissionMember.status }}</v-chip>
          <div v-if="commissionMember.id === user.id" class="font-weight-bold my-4">Поточний користувач</div>
          <div class="my-4">{{ [commissionMember.familyName, commissionMember.givenName, commissionMember.additionalName].filter(Boolean).join(' ') }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="remove(commissionMember.id)" color="error" size="small" prepend-icon="mdi-delete">Видалити</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-btn @click="add" color="primary" class="mt-6">Додати</v-btn>
    <commission-member-dialog :id="commissionMemberId" @cancel="commissionMemberId = undefined" />
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import type { DataTableHeader } from 'vuetify'
import { generateId } from '@/composables/generate-id'

const store = useAppStore()
const { commissionMembers, user } = storeToRefs(store)
const { removeCommissionMember } = store

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Прізвище, ім\'я та по батькові' },
  { key: 'status', title: 'Статус' },
  { key: 'isCurrentUser', title: 'Поточний користувач', align: 'center' },
  { key: 'id', title: 'Видалити' }
]

const commissionMemberId = ref<string | undefined>()

const add = () => {
  commissionMemberId.value = generateId()
}
const remove = (id: string) => {
  removeCommissionMember(id)
}

</script>