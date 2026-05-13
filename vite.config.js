import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/one-sound-emotion/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'icon-192.png',
        'icon-512.png',
        'favicon.ico',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'One Sound Emotion',
        short_name: 'One Sound',
        description: 'App oficial para ouvir minhas músicas online.',
        theme_color: '#00b894',
        background_color: '#101010',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/one-sound-emotion/',
        scope: '/one-sound-emotion/',
        icons: [
          {
            src: '/one-sound-emotion/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/one-sound-emotion/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ]
})