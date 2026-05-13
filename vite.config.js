import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'One Sound Emotion',
        short_name: 'One Sound',
        description: 'App oficial para ouvir minhas músicas online.',
        theme_color: '#00b894',
        background_color: '#101010',
        display: 'standalone',
        start_url: '/one-sound-emotion/',
        scope: '/one-sound-emotion/',
        icons: [
          {
            src: '/one-sound-emotion/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/one-sound-emotion/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/one-sound-emotion/',
})