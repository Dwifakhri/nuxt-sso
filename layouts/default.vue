<template>
  <div>
    <p data-bs-toggle="tooltip" data-bs-title="ddfdf">
      layout
    </p>
    <slot></slot>
  </div>
</template>

<script setup>
const route = useRoute()
onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})
// onBeforeUpdate(() => {
//   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
//   console.log(tooltipTriggerList);

//   Array.from(tooltipTriggerList).map(tooltipTriggerEl => {
//     console.log(new bootstrap.Tooltip(tooltipTriggerEl))

//     new bootstrap.Tooltip(tooltipTriggerEl).dispose()
//   }

//   )

// })
onBeforeUpdate(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  Array.from(tooltipTriggerList).map((item) => {

    bootstrap.Tooltip.getInstance(item).hide();

  })
})
watch(() => route.name, (to, from) => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // const tooltipTriggerList = document.querySelectorAll('.tooltip.bs-tooltip-auto.fade.show')
  // tooltipTriggerList.forEach(tooltipTriggerEl => {
  //   tooltipTriggerEl.remove()
  // })
})
// onBeforeUnmount(() => {
//   console.log('sd');

//   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
//   tooltipTriggerList.map(tooltipTriggerEl => tooltipTriggerEl.dispose())
// })
</script>

<style lang="scss" scoped></style>