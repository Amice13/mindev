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
            <act-form v-model="act" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="7" class="d-flex h-100 pa-0">
        <v-card class="d-flex flex-column h-100 w-100 bg-white" flat>
          <v-card-text class="flex-grow-1 overflow-auto pa-5">
            <div>{{ act }}</div>
            <render-document />
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
const act = <NonNullable<Act>>reactive({
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
  otherIndicators: [],
  landCategory: {}
})
</script>