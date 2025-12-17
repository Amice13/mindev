<template>
<div style="height:calc(100vh - 56px)">
  <v-layout class="rounded-md pa-3 h-100">
    <v-row>
      <v-col cols="5" class="d-flex h-100 pa-5">
        <v-card color="main" class="d-flex flex-column h-100 w-100">
          <v-card-text class="flex-grow-1 overflow-auto custom-scroll">
            <v-breadcrumbs :items="['Акти', 'Створення акту']">
              <template v-slot:divider>|</template>
            </v-breadcrumbs>
            <act-form v-model="model" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="7" class="d-flex h-100 pa-0">
        <v-card class="d-flex flex-column h-100 w-100 bg-white" flat>
          <v-card-text class="flex-grow-1 overflow-auto pa-5">
            <render-document :data="model" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</div>
</template>

<style>
.w-100 {
  width: 100%;
}

.custom-scroll::-webkit-scrollbar {
  width: 10px;
  background-color: #d7cfa7;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #2e6868;
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import type { Act } from '@/types'
import { useAppStore } from '@/stores/app'
import useActs from '@/composables/database'
const { acts } = useActs()

const { user, commission, commissionMembers } = useAppStore() 

const route = useRoute()
const { _id } = route.params as Record<string, string | undefined>

const getDefaultAct = (): Partial<Act> => {
  return {
    createdBy: user as Act['createdBy'],
    date: new Date().toLocaleString('sv').substring(0, 10),
    commission,
    commissionMembers,
    ownerType: undefined,
    ownerPerson: {},
    ownerOrganization: {},
    address: {},
    functionalPurpose: {},
    parentOrganization: {},
    buildingClass: {},
    culturalHeritage: {
      isHeritage: false,
      protectionDecision: {}
    },
    buildingProperty: {},
    constructionElements: {},
    internalSystems: {},
    rentInfo: {
      isRent: false
    },
    apartment: {},
    apartmentInternalSystems: {},
    landDocument: {},
    otherIndicators: [] as Act['otherIndicators'],
    landCategory: {}
  }
}

const model = ref<Act>(getDefaultAct() as Act)
const initialized = ref<boolean>(false)

onBeforeMount(async () => {
  if (_id === 'new') {
    initialized.value = true
    return
  }
  const act = await acts.get(_id)
  model.value = { ...act } as Act
  nextTick(() => {
    initialized.value = true    
  })
})

// Reset the form if estateType is changed
watch(() => model.value.estateType, (estateType) => {
  if (!initialized.value) return
  model.value = {
    ...getDefaultAct(),
    estateType
  } as Act
})

// Reset ownership data
watch(() => model.value.ownerType, () => {
  if (!initialized.value) return
  model.value.ownerPerson = {}
  model.value.ownerOrganization = {}
},
{ deep: true })

// Reset building properties
watch(() => model.value.buildingClass?.code3, () => {
  if (!initialized.value) return
  model.value.buildingProperty = {}
  model.value.buildingProperty = {}
})

</script>