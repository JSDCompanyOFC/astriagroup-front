import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three'
          if (id.includes('/node_modules/@react-three/')) return 'react-three'
          if (id.includes('/node_modules/gsap/')) return 'gsap'
          if (id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react/')) return 'react'
        },
      },
    },
  },
})
