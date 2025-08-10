import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    include: ['**/*.spec.ts', '**/*.e2e.ts'],
    setupFiles: ['./test-setup.ts'],
  },
})
