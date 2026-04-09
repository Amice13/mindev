<template>
  <div style="height:calc(100vh - 56px)">
    <v-layout class="rounded-md pa-3 h-100">
      <v-row class="w-100">
        <v-col class="d-md-flex h-100 pa-0 pa-sm-5" :class="{ 'hidden-sm-and-down': showPreview }" cols="12" md="5">
          <v-card class="d-flex flex-column h-100 w-100" color="main">
            <v-card-text class="flex-grow-1 overflow-auto custom-scroll pa-1 pa-md-4">
              <v-breadcrumbs :items="['Акти', model.isSigned ? 'Перегляд акту' : 'Створення акту']">
                <template #divider>|</template>
              </v-breadcrumbs>
              <act-form
                v-if="!model.isSigned"
                v-model="model"
              />
              <act-signed-form
                v-if="model.isSigned"
                v-model="model"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="d-flex h-100 pa-0" cols="12" md="7">
          <v-card class="d-flex flex-column h-100 w-100 bg-white" flat>
            <v-card-text class="flex-grow-1 overflow-auto pa-0 pa-md-4">
              <render-document :data="model" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-fab
        absolute
        class="hidden-md-and-up"
        color="primary-darken-1"
        :icon="showPreview ? 'mdi-pencil' : 'mdi-text-box-search-outline'"
        style="position: fixed; right: 20px; top: -12px"
        @click="showPreview = !showPreview"
      />
    </v-layout>
  </div>
</template>

<script setup lang="ts">
  import type { Act } from '@/types'
  import { useActs } from '@/composables/database'
  import { generateId } from '@/composables/generate-id'
  import { useAppStore } from '@/stores/app'

  const { acts } = useActs()

  const { user, commission, commissionMembers } = useAppStore()
  const route = useRoute()
  const { _id } = route.params as Record<string, string | undefined>

  function getDefaultAct (): Partial<Act> {
    return {
      id: generateId(),
      createdAt: new Date().toISOString(),
      createdBy: user as Act['createdBy'],
      date: new Date().toLocaleString('sv').slice(0, 10),
      actDate: new Date().toLocaleString('sv').slice(0, 10),
      commission,
      commissionMembers,
      ownerType: undefined,
      ownerPerson: {},
      ownerOrganization: {},
      address: {
        ...(commission?.address?.admin1 === undefined ? {} : { admin1: commission.address.admin1 }),
        ...(commission?.address?.admin2 === undefined ? {} : { admin2: commission.address.admin2 }),
        ...(commission?.address?.code1 === undefined ? {} : { code1: commission.address.code1 }),
        ...(commission?.address?.code2 === undefined ? {} : { code2: commission.address.code2 }),
      },
      functionalPurpose: {},
      parentOrganization: {},
      buildingClass: {},
      culturalHeritage: {
        isHeritage: false,
        protectionDecision: {},
      },
      buildingProperty: {},
      constructionElements: {},
      internalSystems: {},
      rentInfo: {
        isRent: false,
      },
      apartment: {},
      apartmentInternalSystems: {},
      landDocument: {},
      otherIndicators: [] as Act['otherIndicators'],
      landCategory: {},
    }
  }

  const model = ref<Act>(getDefaultAct() as Act)
  const initialized = ref<boolean>(false)
  const showPreview = ref<boolean>(false)

  onBeforeMount(async () => {
    if (_id === 'new' || _id === undefined) {
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
  watch(() => model.value.estateType, estateType => {
    if (!initialized.value) return
    model.value = {
      ...getDefaultAct(),
      estateType,
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

  // Reset conclusion deatils
  watch(() => model.value.conclusionType, () => {
          if (!initialized.value) return
          delete model.value.conclusionDetail
          delete model.value.landAction
          delete model.value.landActionExtra
        },
        { deep: true })

</script>

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
