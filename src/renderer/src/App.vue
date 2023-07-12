<template>
  <router-view />
</template>

<script setup lang="ts">
const getData = async () => {
  const schedule = await window.api.readSchedule()
  console.log(schedule)

  const time = await window.api.readTime({
    where: {
      id: schedule.id,
      end: {
        gte: new Date(2023, 6, 12),
        lte: new Date(2023, 6, 20)
      }
    }
  })
  console.log(time)
}
getData()
</script>
