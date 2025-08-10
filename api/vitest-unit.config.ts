import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'istanbul',
      reportsDirectory: 'cov',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 95,
        branches: 95,
        functions: 95,
      },
    },
    clearMocks: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
