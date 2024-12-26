import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  components: {
    dirs: [
      '~/components',
      {
        path: '~/shared/components',
        global: true,
        prefix: '',
        pathPrefix: false,
      },
      {
        path: '~/admin/components',
        global: true,
        prefix: '',
        pathPrefix: false,
      },
    ],
  },
  // Development
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
  ],

  alias: {
    server: fileURLToPath(new URL('./server/', import.meta.url)),
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  nitro: {
    alias: {
      consola: 'consola',
    },
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
      tasks: true,
    },
    plugins: [
      'server/plugins/container',
      'server/plugins/zod',
    ],
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },

  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },

  hooks: {
    'nitro:build:before'(nitro) {
      nitro.options.moduleSideEffects.push('reflect-metadata');
    },
  },

  // Development config
  eslint: {
    config: {
      stylistic: {
        semi: true,
        commaDangle: 'always-multiline',
      },
    },
  },

  image: {
    providers: {
      nuxthub: {
        name: 'nuxthub',
        provider: '~/providers/nuxthub.image.ts',
        options: {
          baseURL: '/images',
        },
      },
    },
  },

  pinia: {
    storesDirs: ['./stores/**', './services/**'],
  },
});
