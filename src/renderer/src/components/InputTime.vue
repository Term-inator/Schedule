<template>
  <div class="container">
    <n-space>
      <n-input-number
        v-model:value="props.value.hour"
        :min="0"
        :max="23"
        :step="1"
        :disabled="props.disabled"
        :style="props.style"
        @update:value="handleUpdateValue"
      />
      <span style="lineheight: 2rem">:</span>
      <n-input-number
        v-model:value="props.value.minute"
        :min="0"
        :max="59"
        :step="1"
        :disabled="props.disabled"
        :style="props.style"
        @update:value="handleUpdateValue"
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { NSpace, NInputNumber } from 'naive-ui'

type Time = {
  hour: number
  minute: number
}

const props = withDefaults(
  defineProps<{
    value?: Time
    disabled?: boolean
    style?: CSSProperties
  }>(),
  {
    value: () => ({
      hour: 0,
      minute: 0
    }),
    disabled: false
  }
)

const emit = defineEmits(['update:value'])

const handleUpdateValue = () => {
  emit('update:value', props.value)
}
</script>

<style scoped lang="less"></style>
