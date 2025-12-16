<template>
  <app-bar @changeDrawer="open = !open" />
  <v-navigation-drawer temporary v-model="open">
    <v-list nav>
      <v-list-item to="/" title="Акти"></v-list-item>
      <v-list-item to="/admin" title="Комісія"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
const open = ref<boolean>(false)
</script>
