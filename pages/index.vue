<script setup>
definePageMeta({
  middleware: "check-auth"
})
const route = useRoute()
const { signOut } = useAuth()
const signout = () => {
  const urlOrigin = useRequestURL()
  const url = urlOrigin.origin + decodeURIComponent(route.path || "/")

  const data = JSON.stringify({ callbackUrl: url, sessionId: "123" })

  const encData = btoa(data)
  signOut()
  navigateTo(useRuntimeConfig().public.API_URL + "logout?data=" + encData, { external: true })
  // console.log(encData);
}
</script>

<template>
  <div class="welcome">
    <h2>Welcome, admin!</h2>
    <a href="#" @click="signout" class="logout-btn">Logout</a>
  </div>
</template>


<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.welcome h2 {
  margin-bottom: 20px;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>