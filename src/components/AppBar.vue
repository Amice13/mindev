<template>
  <v-app-bar app dark color="main" density="comfortable" class="position-fixed">
    <div class="d-flex align-center">
      <router-link to="/" tag="a">
        <v-img
          class="hidden-sm-and-down shrink ml-2 mr-2 cursor-pointer"
          router-link
          alt="Мінрозвитку - Акти обстеження об'єктів нерухомого майна"
          :src="logo()"
          contain
          height="34"
          width="150"/>
        <v-img
          class="hidden-md-and-up shrink ml-2 mr-2 cursor-pointer"
          router-link
          alt="Мінрозвитку - Акти обстеження об'єктів нерухомого майна"
          :src="smallLogo()"
          contain
          height="34"
          width="40"/>
      </router-link>
    </div>
    <v-app-bar-title>Акти <span class="hidden-sm-and-down">обстеження об'єктів нерухомого майна</span></v-app-bar-title>
    <template v-slot:append>
      <div class="hidden-sm-and-down">
        <v-btn to="/" class="mr-2" color="primary-darken-1" variant="flat">Акти</v-btn>
        <v-btn to="/admin" class="mr-2" color="primary-darken-1" variant="flat">Комісія</v-btn>
      </div>
      <v-btn
        @click="emit('changeDrawer')"
        class="hidden-md-and-up"
        color="primary-darken-2"
        icon="mdi-dots-vertical"
        variant="tonal"
      />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
  (e: 'changeDrawer'): void
}>()

const logo = () => {
  return `${import.meta.env.BASE_URL}/logo.svg`
}

const smallLogo = () => {
  return `${import.meta.env.BASE_URL}/android-chrome-512x512.png`
}
</script>
