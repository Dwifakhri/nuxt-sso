export default defineNuxtRouteMiddleware((to) => {
  const { setToken } = useAuthState()
  const { getSession, status } = useAuth()
  if (to.name !== "login" && status.value !== "authenticated") {
    const datax = to.query.dataCallback
    console.log("ada")
    console.log(to)

    // console.log(to.query)

    if (datax) {
      const decrypt: any = JSON.parse(atob(datax))
      // console.log(datax, "datax")

      // console.log("sds")
      // console.log("sd")
      // if (import.meta.server) {
      //   console.log("server")
      // }
      if (import.meta.client) {
        setToken(decrypt.jwtToken)
        // const user = $fetch(
        //   useRuntimeConfig().public.API_URL + "me?data=" + datax
        //   // "http://localhost:8000/api/" + "me?data=" + datax
        // )
        // console.log(decrypt.callbackUrl, "callback")
        const user = getSession()
        // console.log(decrypt.callbackUrl, "callback")

        user
          .then((res) => {
            // console.log("me auth", decrypt.callbackUrl)

            navigateTo(to.path, { external: false })
          })
          .catch((error) => {
            console.log("me error")
            console.log(error)
          })
      }
    } else {
      console.log("sd")
      console.log(to.query)
      return navigateTo({
        path: "/login",
        query: { redirect: encodeURIComponent(to.fullPath) },
      })
    }
  }
  if (to.name === "login" && status.value === "authenticated")
    return navigateTo("/")
})
