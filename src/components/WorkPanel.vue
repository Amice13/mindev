<template>
<div style="height:calc(100vh - 56px)">
  <v-layout class="rounded-md pa-3 h-100">
    <v-row>
      <v-col cols="5" class="d-flex h-100">
        <v-card class="d-flex flex-column h-100 w-100">
          <v-card-text class="flex-grow-1 overflow-auto">
            <v-breadcrumbs :items="['Акти', 'Створення акту']">
              <template v-slot:divider>|</template>
            </v-breadcrumbs>
            <div class="pa-4">
              <div class="font-weight-bold mb-1 text-subtitle-1">Select field</div>
              <v-select
                :items="items"
                v-model="value"
                variant="solo-inverted"
              ></v-select>

              <div class="font-weight-bold mb-1 text-subtitle-1">Text field</div>
              <v-text-field
                v-model="value2"
                variant="solo-inverted"
              ></v-text-field>

              <div v-for="i in 60" :key="i">Line {{ i }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="7">
        <v-card class="bg-white">
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
</style>

<script lang="ts" setup>
const value = ref('Hello')
const value2 = ref('Hello')
const items = ['Hello', 'World']

</script>