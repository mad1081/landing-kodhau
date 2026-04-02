import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ideUrl: process.env.NUXT_PUBLIC_IDE_URL ?? 'https://kodhau-ide.vercel.app',
    },
  },
  compatibilityDate: "2025-07-15",
  ssr: true,
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' }
    ]
  }
});