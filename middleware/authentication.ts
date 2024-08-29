export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()
  console.log(to.name)

  console.log(status.value)

  // if (to.name !== "login" && status.value !== "authenticated") {
  //   return navigateTo(
  //     useRuntimeConfig().public.API_URL +
  //       // "/login?callbackUrl=" +
  //       "?callbackUrl=" +
  //       useRuntimeConfig().public.APP_URL,
  //     // decodeURIComponent(to.fullPath),
  //     {
  //       external: true,
  //     }
  //   )
  // }
  if (to.name !== "login" && status.value !== "authenticated") {
    return navigateTo("/login")
  }
})
