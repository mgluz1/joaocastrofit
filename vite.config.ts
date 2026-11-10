import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { SHOP_ENABLED } from './src/shop.config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        results: resolve(import.meta.dirname, 'antes-e-depois/index.html'),
        // A loja só entra no build com SHOP_ENABLED (src/shop.config.ts).
        ...(SHOP_ENABLED ? { shop: resolve(import.meta.dirname, 'planilhas/index.html') } : {}),
      },
    },
  },
})
