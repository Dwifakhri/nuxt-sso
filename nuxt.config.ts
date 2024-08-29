// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      APP_URL: process.env.NUXT_APP_URL,
    },
  },
  app: {
    head: {
      title: "Web 1",
    },
  },
  modules: ["@sidebase/nuxt-auth"],
  auth: {
    globalAppMiddleware: {
      isEnabled: false,
    },
    // baseURL: process.env.API_URL,
    provider: {
      type: "local",
      endpoints: {
        //     signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "get" },
        getSession: { path: "/me", method: "get" },
      },
      pages: {
        login: "/login",
        // },
      },
      token: {
        //     signInResponseTokenPointer: "/token",
        //     maxAgeInSeconds: 60 * 60 * 24 * 7,
        secureCookieAttribute: true,
      },
    },
  },
})
