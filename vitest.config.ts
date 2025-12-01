import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['src/test/**', 'src/**/*.test.*', 'src/**/*integration*.test.*'],
      all: true,
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
});
