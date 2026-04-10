<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { syncData } from './composables/sync-data'
syncData()

</script>
