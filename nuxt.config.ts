import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@nuxt/eslint'
  ],

  alias: {
    server: fileURLToPath(new URL('./server/', import.meta.url)),
    root: fileURLToPath(new URL('./', import.meta.url)),
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

  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
      tasks: true,
    },
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
  // Development
  devtools: { enabled: true },

  // Development config
  eslint: {
    config: {
      stylistic: {
        semi: true,
        commaDangle: 'always-multiline',
      },
    },
  },
})
