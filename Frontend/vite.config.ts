import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
          '@': path.resolve(__dirname, './src')
      }
    },
      server: {
          proxy: {
              '/api': {
                  target: env.VITE_API_PROXY_TARGET || 'http://localhost:8000',
                  changeOrigin: true,
                  // No need for rewrite if you want to keep the path
              }
          }
      }
  }
})
