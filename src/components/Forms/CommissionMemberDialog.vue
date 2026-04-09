<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
    :overlay="false"
    persistent
    scrollable
    transition="dialog-transition"
  >
    <v-card color="main">
      <v-card-title class="bg-primary-darken-2" primary-title>
        Додати члена комісії
      </v-card-title>
      <v-card-text>
        <p class="text-subtitle-1 mb-6">Зазначте прізвище, ім'я та по батькові особи</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.familyName.title }}</div>
        <ukrainian-text
          v-model="model.familyName"
          :aria-label="schema.properties.familyName.title"
          name="person.familyName"
          placeholder="Дія"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.givenName.title }}</div>
        <ukrainian-text
          v-model="model.givenName"
          :aria-label="schema.properties.givenName.title"
          name="person.givenName"
          placeholder="Надія"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.additionalName.title }}</div>
        <ukrainian-text
          v-model="model.additionalName"
          :aria-label="schema.properties.additionalName.title"
          name="person.additionalName"
          placeholder="Володимирівна"
          variant="solo-inverted"
        />

        <p class="text-subtitle-1 mb-6">Зазначте статус члена комісії</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.status.title }}</div>
        <dictionary-value
          v-model="model.status"
          dictionary="commissionMemberTypes"
        />

        <v-checkbox
          v-model="isCurrentUser"
          aria-label="Це мій власний запис"
          label="Це мій власний запис"
        />

      </v-card-text>
      <v-card-actions>
        <v-btn color="grey-darken-1" @click="emit('cancel')">Скасувати</v-btn>
        <v-btn color="primary-darken-1" variant="flat" @click="save">Зберегти</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
  import type { User } from '@/types'
  import { user as schema } from '@/schemas/user.schema'
  import { useAppStore } from '@/stores/app'

  const { addCommisionMember, saveUser, commissionMembers } = useAppStore()
  interface Props { id?: string }
  const props = defineProps<Props>()
  const dialog = computed(() => {
    return props.id !== undefined
  })

  const model = ref<Partial<User>>({})
  const isCurrentUser = ref<boolean>(false)

  const emit = defineEmits<{
    (e: 'cancel'): void
  }>()

  function save () {
    if (!model.value.familyName) return alert('Не зазначене прізвище члена комісії')
    if (!model.value.givenName) return alert('Не зазначене ім\'я члена комісії')
    if (!model.value.additionalName) return alert('Не зазначене по батькові члена комісії')
    if (!model.value.status) return alert('Не зазначений статус члена комісії')
    if (model.value.status !== 'Член комісії' && commissionMembers.some(cm => cm.status === model.value.status)) {
      return alert(model.value.status + ' вже наявний у вашій комісії')
    }
    const commissionMember = toRaw(model.value) as User
    if (!props.id) return
    commissionMember.id = props.id
    if (isCurrentUser.value) saveUser(commissionMember)
    addCommisionMember(commissionMember)
    model.value = {}
    emit('cancel')
  }
</script>
