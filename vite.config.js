import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@tokens': path.resolve(__dirname, 'tokens'),
      '@workbench': path.resolve(__dirname, 'workbench'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
