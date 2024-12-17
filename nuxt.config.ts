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
  ],
  // Development
  devtools: { enabled: true },

  alias: {
    server: fileURLToPath(new URL('./server/', import.meta.url)),
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
      tasks: true,
    },
    plugins: [
      'server/plugins/container',
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
});
