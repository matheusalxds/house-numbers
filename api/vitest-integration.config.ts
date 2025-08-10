import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'integration',
    globals: true,
    environment: 'node',
    include: ['**/*.e2e.ts'],
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
