<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent :overlay="false"
    max-width="700px"
    transition="dialog-transition"
  >
    <v-card color="main">
      <v-card-title primary-title>
        Додати члена комісії
      </v-card-title>
      <v-card-text>
        <p class="text-subtitle-1 mb-6">Зазначте прізвище, ім'я та по батькові особи</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.familyName.title }}</div>
        <v-text-field
          v-model="model.familyName"
          placeholder="Дія"
          variant="solo-inverted"
          name="person.familyName"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.givenName.title }}</div>
        <v-text-field
          v-model="model.givenName"
          placeholder="Надія"
          variant="solo-inverted"
          name="person.givenName"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.additionalName.title }}</div>
        <v-text-field
          v-model="model.additionalName"
          placeholder="Володимирівна"
          variant="solo-inverted"
          name="person.additionalName"
        />

      </v-card-text>
      <v-card-actions>
        <v-btn @click="emit('cancel')" color="grey-darken-1">Скасувати</v-btn>
        <v-btn @click="save" color="primary-darken-1" variant="flat">Зберегти</v-btn>
      </v-card-actions>
    </v-card>    
  </v-dialog>
</template>
<script setup lang="ts">
import type { User } from '@/types'
import { user as schema } from '@/schemas/user.schema'

interface Props { id?: string }
const props = defineProps<Props>()
const dialog = computed(() => {
  return props.id !== undefined
})

const model = ref<Partial<User>>({})

const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'add', person: User): void
}>()

const save = () => {
  if (!model.value.familyName) return alert('Не зазначене прізвище')
  if (!model.value.givenName) return alert('Не зазначене ім\'я')
  if (!model.value.additionalName) return alert('Не зазначене по батькові')
  const person = toRaw(model.value)
  person.id = props.id
  emit('add', person as User)
  emit('cancel')
}
</script>