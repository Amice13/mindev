<template>
  <app-bar @change-drawer="open = !open" />
  <v-navigation-drawer v-model="open" temporary>
    <v-list nav>
      <v-list-item title="Акти" to="/" />
      <v-list-item title="Комісія" to="/admin" />
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
  <the-pwa-reload-dialog />
</template>

<script lang="ts" setup>
  const open = ref<boolean>(false)
</script>
