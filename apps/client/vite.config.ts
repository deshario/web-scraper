/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    include: ['**/__tests__/*'],
    css: true,
  },
  resolve: {
    alias: {
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@components': '/src/components',
    },
  },
})
