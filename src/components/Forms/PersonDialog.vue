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
        Додати особу
      </v-card-title>
      <v-card-text>
        <p class="text-subtitle-1 mb-6">Зазначте прізвище, ім'я та по батькові особи</p>

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.familyName.title }}</div>
        <ukrainian-text
          v-model="model.familyName"
          name="person.familyName"
          placeholder="Дія"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.givenName.title }}</div>
        <ukrainian-text
          v-model="model.givenName"
          name="person.givenName"
          placeholder="Надія"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.additionalName.title }}</div>
        <ukrainian-text
          v-model="model.additionalName"
          name="person.additionalName"
          placeholder="Володимирівна"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.position.title }}</div>
        <ukrainian-text
          v-model="model.position"
          name="person.title"
          placeholder="Інженер-проектувальник"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.organization.properties.title.title }}</div>
        <v-text-field
          v-model="model.organization!.title"
          name="person.organization.title"
          placeholder="Міністерство розвитку громад та територій України"
          variant="solo-inverted"
        />

        <div class="font-weight-bold mb-1 text-subtitle-2">{{ schema.properties.organization.properties.code.title }}</div>
        <organization-code
          v-model="model.organization!.code"
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

  interface Props { id?: string }
  const props = defineProps<Props>()
  const dialog = computed(() => {
    return props.id !== undefined
  })

  const model = ref<Partial<User>>({
    organization: {},
  })

  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'add', person: User): void
  }>()

  function save () {
    if (!model.value.familyName) return alert('Не зазначене прізвище')
    if (!model.value.givenName) return alert('Не зазначене ім\'я')
    if (!model.value.additionalName) return alert('Не зазначене по батькові')
    const person = toRaw(model.value)
    person.id = props.id
    emit('add', person as User)
    model.value = Object.assign({ organization: {} })
    emit('cancel')
  }
</script>
