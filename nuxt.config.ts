// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL,
      API_URL_BE: process.env.NUXT_API_URL_BE,
      APP_URL: process.env.NUXT_APP_URL,
    },
  },
  app: {
    head: {
      title: "Web 1",
      link: [
        { rel: "stylesheet", href: "/bootstrap/bootstrap.min.css" },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
          integrity:
            "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A::",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
      script: [
        { type: "text/javascript", src: "/bootstrap/jquery-3.5.1.slim.min.js" },
        { src: "/bootstrap/bootstrap.bundle.min.js" },
      ],
    },
  },
  modules: ["@sidebase/nuxt-auth", "@nuxt/image"],
  image: {
    domains: ["www.pexels.com"],
    format: ["webp"],
  },
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
        type: "",
        //     signInResponseTokenPointer: "/token",
        //     maxAgeInSeconds: 60 * 60 * 24 * 7,
        secureCookieAttribute: true,
      },
    },
  },
})
