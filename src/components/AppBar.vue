<template>
  <v-app-bar
    app
    class="position-fixed"
    color="main"
    dark
    density="comfortable"
  >
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Мінрозвитку - Акти обстеження об'єктів нерухомого майна"
          class="hidden-sm-and-down shrink ml-2 mr-2 cursor-pointer"
          contain
          height="34"
          router-link
          :src="logo()"
          width="150"
        />
        <v-img
          alt="Мінрозвитку - Акти обстеження об'єктів нерухомого майна"
          class="hidden-md-and-up shrink ml-2 mr-2 cursor-pointer"
          contain
          height="34"
          router-link
          :src="smallLogo()"
          width="40"
        />
      </router-link>
    </div>
    <v-app-bar-title>Акти <span class="hidden-sm-and-down">обстеження об'єктів нерухомого майна</span></v-app-bar-title>
    <template #append>
      <div class="hidden-sm-and-down">
        <v-btn class="mr-2" color="primary-darken-1" to="/" variant="flat">Акти</v-btn>
        <v-btn class="mr-2" color="primary-darken-1" to="/admin" variant="flat">Комісія</v-btn>
      </div>
      <v-btn
        class="hidden-md-and-up"
        color="primary-darken-2"
        icon="mdi-dots-vertical"
        variant="tonal"
        @click="emit('change-drawer')"
      />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>

  const emit = defineEmits<{
    (e: 'change-drawer'): void
  }>()

  function logo () {
    return `/logo.svg`
  }

  function smallLogo () {
    return `/android-chrome-512x512.png`
  }
</script>
