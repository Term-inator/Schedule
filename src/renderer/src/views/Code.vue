<template>
  <div style="padding: 0 2vw 0 2vw">
    <div>
      <n-input type="textarea" round placeholder="Enter your code..."
        size="large"
        v-model:value="code"
        :autosize="{
          minRows: 32
        }"
      >
      </n-input>
    </div>
    <div class="submit-wrapper">
      <n-space justify="end">
        <n-button type="primary" size="large">
          <template #icon>
            <n-icon>
              <send-icon />
            </n-icon>
          </template>
          Submit
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NSpace } from 'naive-ui'
import { NInput, NButton, NIcon } from 'naive-ui'
import { SendSharp as SendIcon } from '@vicons/ionicons5'

const code = ref('')

</script>

<style lang="less" scoped>
.submit-wrapper {
  margin: 2.5vh 0 0 0;
}
</style>
