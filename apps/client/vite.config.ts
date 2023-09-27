/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import sassDts from 'vite-plugin-sass-dts'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    css: true,
  },
  resolve: {
    alias: {
      '@api': '/src/api',
      '@lib': '/src/lib',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@context': '/src/context',
      '@constants': '/src/constants',
      '@interfaces': '/src/interfaces',
      '@components': '/src/components',
    },
  },
})
