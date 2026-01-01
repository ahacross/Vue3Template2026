import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT),
      // proxy: {
      //   '^/api': {
      //     target: '',
      //     changeOrigin: true,
      //     secure: false,
      //     ws: true,
      //   },
      // },
      proxy: {
        '/futurama': {
          target: 'https://api.sampleapis.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      VueRouter({
        routesFolder: 'src/views',
        routeBlockLang: 'json5',
        dts: './types/typed-router.d.ts',
        exclude: ['**/components/**/*.vue'],
      }),
      vue(),
      AutoImport({
        imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core'],
        vueTemplate: true,
        dirs: ['./src/composable', './src/stores'],
        dts: './types/auto-imports.d.ts',
        viteOptimizeDeps: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.js',
          globalsPropValue: 'readonly',
        },
      }),
      vueDevTools(),
    ],
  })
}
