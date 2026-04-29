<template>
  <v-row class="h-100">
    <v-col cols="12">
      <div style="height: 300px;">
        <v-img class="w-100 h-100">
          <div class="w-100 h-100" id="map"></div>
        </v-img>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Act } from '@/types'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  modelValue: Act['coordinates']
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Act['coordinates']): void
}>()

const map = ref<L.Map | null>(null)
const marker = ref<L.Marker | null>(null)

// Use a reactive copy of modelValue
const model = ref<Act['coordinates']>(props.modelValue ?? [50.4501634, 30.5229938])

// Sync props.modelValue initially
watchEffect(() => {
  model.value = props.modelValue ?? [50.4501634, 30.5229938]
})

onMounted(() => {
  const icon = L.icon({
    iconUrl: `/marker-icon.png`,
    shadowUrl: `/marker-shadow.png`,
    iconSize: [25, 41],
    shadowSize: [41, 41],
    iconAnchor: [12.5, 41],
    shadowAnchor: [12.5, 41],
    popupAnchor: [13, -50]
  })

  const initialLocation = model.value as L.LatLngTuple
  map.value = L.map('map', { zoomControl: false }).setView(initialLocation, 13)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map.value as L.Map)

  if (!map.value) return

  marker.value = L.marker(initialLocation, { icon, draggable: true }).addTo(map.value as L.Map)
  
  marker.value.on('dragend', (event: L.DragEndEvent): void => {
    const position = (event.target).getLatLng()
    model.value = [
      parseFloat(position.lat as unknown as string),
      parseFloat(position.lng  as unknown as string)
    ]
    emit('update:modelValue', model.value)
  })
})

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return
    model.value = val
    const coordinates = val as L.LatLngTuple
    if (marker.value && map.value) {
      marker.value.setLatLng(coordinates)
      map.value.panTo(coordinates)
    }
  },
  { immediate: true, deep: true }
)
</script>
