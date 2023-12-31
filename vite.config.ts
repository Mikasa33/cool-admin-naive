import { URL, fileURLToPath } from 'node:url'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import Unocss from 'unocss/vite'
import dayjs from 'dayjs'
import pkg from './package.json'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return defineConfig({
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/types', import.meta.url)),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/composables', 'src/hooks', 'src/stores'],
        vueTemplate: true,
      }),
      Components({
        dts: 'src/types/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      Unocss(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
    ],
    server: {
      proxy: {
        '/dev/': {
          target: 'http://localhost:9103',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/dev/, ''),
        },
      },
    },
  })
}
