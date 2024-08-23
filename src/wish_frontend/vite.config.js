import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-ignore-did',
      transform(code, id) {
        if (id.endsWith('.did')) {
          return ''; // Ignore .did files
        }
        return null; // Let Vite handle other files normally
      },
    },
  ],
  build: {
    rollupOptions: {
      external: ['**/*.did'], // Ensure .did files are not included in the build
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
      {
        find: '@declarations/community_hub',
        replacement: resolve(__dirname, 'src/declarations/community_hub/community_hub.did.js'),
      },
    ],
  },
});
