import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/semiotic-framework-tool/',
  optimizeDeps: {
    include: ['html2canvas', 'react-quill-new'],
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 8080,
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
});
