<template>
  <div>
    <v-list v-if="model?.length" class="bg-transparent">
      <v-list-item
        v-for="(person, i) in model"
        :key="[person.familyName, person.givenName, person.additionalName].join(',')"
        :title="[person.familyName, person.givenName, person.additionalName].join(' ')"
      >
        <template #append>
          <v-btn
            color="grey-darken-1"
            size="small"
            variant="tonal"
            @click="remove(i)"
          >Видалити</v-btn>
        </template>
      </v-list-item>
    </v-list>
    <div v-if="!model?.length">Ви не додали жодної залученої особи</div>
    <PersonDialog :id="personId" @add="add" @cancel="cancel" />
    <v-btn
      class="mt-4"
      color="primary-darken-1"
      prepend-icon="mdi-plus"
      @click="create"
    >Додати</v-btn>
  </div>
</template>

<script setup lang="ts">
  import type { Act, User } from '@/types'
  import { generateId } from '@/composables/generate-id'

  interface Props {
    modelValue: Act['involved']
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Act['involved']): void
  }>()

  const model = computed({
    get: () => props.modelValue as Act['involved'],
    set: (value: Act['involved']) => emit('update:modelValue', value),
  })

  const personId = ref<string | undefined>()

  function add (person: User) {
    model.value = [...(model.value ?? []), person]
  }

  function remove (n: number) {
    model.value.splice(n, 1)
  }

  function create () {
    personId.value = generateId()
  }

  function cancel () {
    personId.value = undefined
  }
</script>
