import * as dateFns from "date-fns"

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      dateFns,
    },
  }
})
