import type { VitePWAOptions } from 'vite-plugin-pwa'

const PWAConfig: Partial<VitePWAOptions> = {
  injectRegister: 'auto',
  workbox: {
    maximumFileSizeToCacheInBytes: 10000000
  },
  registerType: 'prompt',
  includeAssets: [
    'favicon.ico',
    'apple-touch-icon-180x180.png',
    'maskable-icon-512x512.svg',
    'pwa-64x64.png',
    'pwa-192x192.png',
    'pwa-512x512.png',
    'raisplus_screenshot.png',
    'raisplus_screenshot_mobile.png'
  ],
  manifest: {
    name: 'Складення актів обстеження',
    short_name: 'Акти 4080',
    description: 'Складення актів обстеження в рамках Закону України №4080 (Мінрозвитку)',
    theme_color: '#F5F3E9',
    screenshots: [
      {
        src: 'minregion_1.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Головний екран'
      },
      {
        src: 'minregion_2.png',
        sizes: '1082x2402',
        type: 'image/png',
        label: 'Перегляд акту'
      },
      {
        src: 'minregion_3.png',
        sizes: '1082x2402',
        type: 'image/png',
        label: 'Внесення даних про комісію'
      }
    ],
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  devOptions: {
    enabled: process.env.IS_BUILD !== 'TRUE',
    type: 'module'
  }
}

export default PWAConfig
