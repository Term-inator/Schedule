<template>
  <router-view />
</template>

<script setup lang="ts">
const getData = async () => {
  const schedule = await window.api.readSchedule({
    where: {
      done: false
    }
  })
  console.log(schedule)

  const time = await window.api.readTime({
    where: {
      done: false
    }
  })
  console.log(time)
}
getData()
</script>
