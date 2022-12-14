import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    root: './src',
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                'index': './src/index.html',
                // 'admin-account-index': './src/admin/account/index.html'
            }
        },
        outDir: '../docs',
    },
    publicDir: '../public',
    plugins: [
        react(),
        ViteMinifyPlugin({}),
    ],
})
