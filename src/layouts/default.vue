<template>
  <app-bar />
  <v-navigation-drawer v-model="open">
    <v-list nav>
      <v-list-item title="Navigation drawer" link></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
const open = ref<boolean>(false)
</script>
