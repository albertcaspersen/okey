import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-sw',
      closeBundle() {
        // Copy service worker to dist folder after build
        copyFileSync(
          resolve(__dirname, 'public/sw.js'),
          resolve(__dirname, 'dist/sw.js')
        )
      }
    }
  ],
  build: {
    target: 'es2022',
    minify: 'esbuild',
  },
  esbuild: {
    target: 'es2022',
  },
})

