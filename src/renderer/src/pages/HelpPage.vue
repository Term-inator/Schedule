<template>
  Help
  <div class="tool-bar">
    <n-button @click="handleAdd">Add</n-button>
  </div>
  <n-modal v-model:show="showAddModal">
    <n-card
      style="width: 600px; height: 600px;"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        噢！
      </template>
      内容123
      <template #footer>
        尾部
      </template>
    </n-card>
  </n-modal>  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NModal, NCard } from 'naive-ui'

const showAddModal = ref(false)

const handleAdd = () => {
  showAddModal.value = true
}

</script>