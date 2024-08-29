<template>
  <div>
    <p>callback</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "guest"
})
const { getSession } = useAuth()
const { setToken, } = useAuthState()
const token = useRoute()?.query?.token
onMounted(() => {

  if (token) {
    console.log(token);

    $fetch("http://localhost:8082", { query: { token: token } })
      // $fetch("http://localhost:8000/api/token", { query: { token: token } })
      .then((res) => {
        setToken(res.token)
        const user = getSession()
        user.then(() => {
          return navigateTo("/")
        })
          .catch((err) => {
            console.log(err);
          })
      }).catch((err) => {
        console.log(err);
      })
  }
})
</script>

<!-- <style lang="scss" scoped></style> -->