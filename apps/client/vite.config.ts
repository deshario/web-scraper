/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import sassDts from 'vite-plugin-sass-dts'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
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
      '@api': '/src/api',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@interfaces': '/src/interfaces',
      '@components': '/src/components',
    },
  },
})
