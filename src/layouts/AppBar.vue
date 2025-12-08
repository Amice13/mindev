<template>
  <v-app-bar app dark color="teal" density="comfortable" class="position-fixed">
    <div class="d-flex align-center">
      <router-link to="/" tag="a">
        <v-img
          router-link
          :alt="logoDescription"
          :src="logo"
          class="shrink ml-2 mr-2 cursor-pointer"
          contain
          height="34"
          width="150"/>
      </router-link>
    </div>
    <v-app-bar-title>Акти обстеження об'єктів нерухомого майна</v-app-bar-title>
    <template v-slot:append>
      <v-btn class="mr-2" color="primary-darken-1" variant="flat">Акти</v-btn>
      <v-btn class="mr-2" color="primary-darken-1" variant="flat">Комісія</v-btn>
      <v-btn color="primary-darken-2" icon="mdi-dots-vertical" variant="tonal"></v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
const name = 'Test'
const logoDescription = computed(() => {
  return `${name} logo`
})

const logout = () => {
  console.log('logout')
}

const logo = computed(() => {
  return `/logo.svg`
})

</script>
