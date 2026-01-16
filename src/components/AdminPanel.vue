<template>
<div style="height:calc(100vh - 56px)">
  <v-layout class="rounded-md pa-3 h-100">
    <v-row class="w-100">
      <v-col cols="12" md="5" class="d-md-flex h-100 pa-0 pa-sm-5" :class="{ 'hidden-sm-and-down': showCommissionMembers }">
        <v-card color="main" class="d-flex flex-column h-100 w-100">
          <v-card-text class="flex-grow-1 overflow-auto custom-scroll">
            <v-breadcrumbs :items="['Налаштування комісії']">
              <template v-slot:divider>|</template>
            </v-breadcrumbs>
            <commission-form />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="7" class="d-flex h-100 pa-0">
        <v-card class="d-flex flex-column h-100 w-100 bg-white" flat>
          <v-card-text class="flex-grow-1 overflow-auto pa-2 pa-sm-5">
            <commission-members-list />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-fab
      @click="showCommissionMembers = !showCommissionMembers"
      :icon="showCommissionMembers ? 'mdi-office-building-marker' : 'mdi-account-multiple'"
      color="primary-darken-1"
      absolute
      class="pb-10"
      style="position: fixed; right: 20px; top: -12px"
    />
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
const showCommissionMembers = ref<boolean>(false)

</script>