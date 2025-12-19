import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import deno from '@deno/vite-plugin';

export default defineConfig({
  plugins: [deno(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
});
