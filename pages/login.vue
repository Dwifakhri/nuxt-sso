<template>
  <div class="welcome">
    <a href="#" @click="login" class="login-btn">Login</a>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: "check-auth"
})
const route = useRoute()
const login = () => {
  const urlOrigin = useRequestURL()
  const url = urlOrigin.origin + decodeURIComponent(route.query.redirect || "/")
  console.log(url);

  const data = JSON.stringify({ callbackUrl: url, sessionId: "123" })

  $fetch(useRuntimeConfig().public.API_URL_BE + "encrypt", { query: { str: data } })
    .then((res) => {
      return navigateTo(useRuntimeConfig().public.API_URL +
        "?data=" + res.encrypted, { external: true, })
    }).catch((err) => {
      return navigateTo("/login")
    })
}
</script>

<style>
.login-btn {
  padding: 10px 20px;
  background-color: #24ba79;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
}

.login-btn:hover {
  background-color: #24ba79;
}
</style>