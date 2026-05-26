import { defineConfig } from 'vite';
import { productionChunkSizeWarningLimitKb, resolveProductionChunk } from './src/performance/buildChunks';

export default defineConfig({
  server: {
    host: '127.0.0.1'
  },
  preview: {
    host: '127.0.0.1'
  },
  build: {
    chunkSizeWarningLimit: productionChunkSizeWarningLimitKb,
    rollupOptions: {
      output: {
        manualChunks: resolveProductionChunk
      }
    }
  }
});
