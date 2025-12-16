<template>
  <v-app-bar app dark color="main" density="comfortable" class="position-fixed">
    <div class="d-flex align-center">
      <router-link to="/" tag="a">
        <v-img
          router-link
          alt="Мінрозвитку - Акти обстеження об'єктів нерухомого майна"
          :src="logo()"
          class="shrink ml-2 mr-2 cursor-pointer"
          contain
          height="34"
          width="150"/>
      </router-link>
    </div>
    <v-app-bar-title>Акти обстеження об'єктів нерухомого майна</v-app-bar-title>
    <template v-slot:append>
      <v-btn to="/" class="mr-2" color="primary-darken-1" variant="flat">Акти</v-btn>
      <v-btn to="/admin" class="mr-2" color="primary-darken-1" variant="flat">Комісія</v-btn>
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
</script>
