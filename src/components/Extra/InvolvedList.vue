<template>
  <div>
    <v-list v-if="model?.length" class="bg-transparent">
      <v-list-item
        v-for="(person, i) in model"
        :key="[person.familyName, person.givenName, person.additionalName].join(',')"
        :title="[person.familyName, person.givenName, person.additionalName].join(',')"
      >
        <template v-slot:append>
          <v-btn
            @click="remove(i)"
            size="small"
            color="grey-darken-1"
            variant="tonal"
          >Видалити</v-btn>
        </template>
      </v-list-item>
    </v-list>
    <div v-if="!model?.length">Ви не додали жодної залученої особи</div>
    <PersonDialog :id="personId" @add="add" @cancel="cancel" />
    <v-btn
      @click="create"
      class="mt-4"
      color="primary-darken-1"
      prepend-icon="mdi-plus"
    >Додати</v-btn>
  </div>
</template>

<script setup lang="ts">
import type { Act, User } from '@/types'
import { v7 as uuid } from 'uuid'

interface Props {
  modelValue: Act['involved']
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Act['involved']): void
}>()

const model = computed({
  get: () => props.modelValue as Act['involved'],
  set: (value: Act['involved']) => emit('update:modelValue', value)
})

const personId = ref<string | undefined>()

const add = (person: User) => {
  model.value = [...(model.value ?? []), person]
  nextTick(() => {
    console.log(model.value, person)
  })
}

const remove = (n: number) => {
  model.value.splice(n, 1)
}

const create = () => {
  personId.value = uuid()
}

const cancel = () => {
  personId.value = undefined
}
</script>