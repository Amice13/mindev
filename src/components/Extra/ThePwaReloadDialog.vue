<template>
  <v-snackbar
    :model-value="model"
    :timeout="-1"
    color="primary"
    class="pwa-reload"
  >
    <span v-if="offlineReady">Додаток готовий до роботи оффлайн</span>
    <span v-if="needRefresh">Оновити додаток</span>

    <template #actions>
      <v-btn v-if="needRefresh" @click="close" variant="text">Скасувати</v-btn>
      <v-btn v-if="needRefresh" @click="update" variant="tonal">Оновити</v-btn>
      <v-btn v-if="offlineReady" @click="close" variant="text">Ок</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady: swOfflineReady, needRefresh: swNeedRefresh, updateServiceWorker } = useRegisterSW()

const offlineReady = ref(false)
const needRefresh = ref(false)

// Sync composable flags to local refs
watch(swOfflineReady, val => { offlineReady.value = val })
watch(swNeedRefresh, val => { needRefresh.value = val })

const model = computed(() => offlineReady.value || needRefresh.value)

function close (): void {
  offlineReady.value = false
  needRefresh.value = false
}

async function update (): Promise<void> {
  await updateServiceWorker()
  needRefresh.value = false
}
</script>
