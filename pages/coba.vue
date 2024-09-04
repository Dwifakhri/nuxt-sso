<template>
  <div>
    <nuxt-link to="/" data-bs-toggle="tooltip" data-bs-title="to home">to home</nuxt-link>
    'coba'
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "check-auth"
})

</script>

<style lang="scss" scoped></style>