import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@monaco-editor/react']
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          monaco: ['@monaco-editor/react']
        }
      }
    }
  },
  server: {
    fs: {
      allow: ['..', 'node_modules/@monaco-editor']
    }
  }
})
