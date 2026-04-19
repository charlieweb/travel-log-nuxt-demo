import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  typescript: {
    tsConfig: {
      include: ["../lib/types.ts"],
    },
  },
  css: ["./app/assets/css/main.css"],
  nitro: {
    preset: "vercel",
    externals: {
      inline: ["vue"],
    },
  },
  build: {
    transpile: ["vue"],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  colorMode: {
    dataValue: "theme",
  },
});
