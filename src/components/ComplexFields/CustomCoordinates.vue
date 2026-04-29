<template>
  <div class="coordinates">
    <v-row>
      <v-col cols="12" lg="4">
        <div class="font-weight-bold mb-1 text-subtitle-2">Широта</div>
        <v-text-field
          v-if="model"
          v-model="model[1]"
          variant="solo-inverted"
          aria-label="Широта"
          name="latitude"
          hide-details
        />
      </v-col>
      <v-col cols="12" lg="4">
        <div class="font-weight-bold mb-1 text-subtitle-2">Довогота</div>
        <v-text-field
          v-if="model"
          v-model="model[0]"
          variant="solo-inverted"
          aria-label="Довгота"
          name="longitude"
          hide-details
        />
      </v-col>
      <v-col cols="12" lg="4">
        <v-btn
          color="primary-darken-1"
          :loading="locationIsLoading"
          prepend-icon="mdi-map-marker"
          class="mt-8"
          size="large"
        >
          Визначити
          <v-menu activator="parent">
            <v-list>
              <v-list-item @click="getByAddress" :disabled="cantResolveByAddress">
                <v-list-item-title>За адресою</v-list-item-title>
              </v-list-item>
                <v-list-item @click="getLocation">
                <v-list-item-title>За локацією</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Act } from '@/types'
import { getLocationByAddress, getCurrentLocation } from '@/composables/locations'

const props = withDefaults(
  defineProps<{
    modelValue: Act['coordinates']
    address: Act['address']
  }>(),
  {
    modelValue: () => ([50.4501634, 30.5229938])
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Act['coordinates']): void
}>()

const model = computed<Act['coordinates']>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const locationIsLoading: Ref<boolean> = ref(false)

const getLocation = async () => {
  locationIsLoading.value = true
  try {
    const position = await getCurrentLocation()
    model.value = [...position.location]
  } catch (_err) {
    alert('Неможливо визначити поточну локацію')
  }
  locationIsLoading.value = false
}

const cantResolveByAddress = computed<boolean>(() => {
  return [
    props.address.admin4,
    props.address.streetType,
    props.address.streetName,
    props.address.building
  ].some(el => el === undefined || el === null || el === '')
})

const getByAddress = async () => {
  locationIsLoading.value = true
  if (!props.address) return alert('Адресу не зазначено')
  if (!props.address.admin4) return alert('Не визначено населений пункт')
  if (!props.address.streetType) return alert('Не визначено тип геоніма')
  if (!props.address.streetName) return alert('Не визначено назву геоніма')
  if (!props.address.building) return alert('Не визначено номер будинку')
  const coordinates = await getLocationByAddress(props.address)
  if (coordinates !== undefined) {
    model.value = [...coordinates.location]
  }
  locationIsLoading.value = false
}
</script>


