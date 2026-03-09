import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  // Point to the Vite entry HTML (the legacy index.html is the single-file build)
  // Once component migration is complete, rename vite-index.html to index.html
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: 'vite-index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
