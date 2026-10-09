import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' produces RELATIVE asset paths in dist/.
// This is what makes the build work on Hostinger whether you drop it in
// public_html/ (root domain) or public_html/esummit/ (subfolder).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
