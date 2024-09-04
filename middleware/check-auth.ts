export default defineNuxtRouteMiddleware((to) => {
  const { setToken } = useAuthState()
  const { getSession, status } = useAuth()
  if (to.name !== "login" && status.value !== "authenticated") {
    const datax = to.query.dataCallback
    if (datax) {
      $fetch(useRuntimeConfig().public.API_URL_BE + "decrypt", {
        query: { str: datax },
      })
        .then((res: any) => {
          const { jwtToken } = JSON.parse(res.decrypted)
          if (import.meta.client) {
            setToken(jwtToken)
            const user = getSession()
            user
              .then((res) => {
                navigateTo({
                  params: to.params,
                  query: { ...to.query, dataCallback: undefined },
                })
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    } else {
      return navigateTo({
        path: "/login",
        query: { redirect: encodeURIComponent(to.fullPath) },
      })
    }
  }
  if (to.name === "login" && status.value === "authenticated")
    return navigateTo("/")
})
