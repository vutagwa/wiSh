import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
dotenv.config({ path: '../../.env' });

// Define the Vite configuration
export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      plugins: [
        // Custom Rollup plugin to ignore .did files
        {
          name: 'ignore-did-files',
          resolveId(source) {
            if (source.endsWith('.did')) {
              return { id: source, external: true };
            }
            return null;
          },
        },
      ],
    },
  },
  plugins: [
    react(),
    // Add other Vite plugins here if needed
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: 'declarations',
        replacement: fileURLToPath(new URL('../declarations', import.meta.url)),
      },
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
});
