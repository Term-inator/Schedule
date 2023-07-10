<template>
  <n-layout has-sider style="height: 100%;">
    <n-layout-sider
      bordered 
      show-trigger
      collapse-mode="width"
      :collapsed-width="0"
      :width="'30vw'"
      :native-scrollbar="false"
      content-style="padding: 0 1vw 0 1vw;"
    >
      <div class="tool-bar">
        <n-button @click="handleAdd">Add</n-button>
      </div>
      <TodoList></TodoList>
    </n-layout-sider>
    <n-layout-content 
      bordered 
      :native-scrollbar="false"
      content-style="padding: 0 3vw 0 3vw;"
    >
      <n-calendar
        v-model:value="value"
        @update:value="handleUpdateValue"
      >
        <div style="height: 11vh">
          content
        </div>
      </n-calendar>
    </n-layout-content>
  </n-layout>

  <n-modal v-model:show="showAddModal">
    <n-card
      style="width: 76vw;"
      title="Add"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-align="right"
        label-width="auto"
        require-mark-placement="right-hanging"
        :size="large"
      >
        <n-form-item label="Name" path="name">
          <n-input v-model:value="model.name" />
        </n-form-item>
        <n-form-item label="Time" path="time">
          <n-input
            v-model:value="model.time"
            type="textarea"
            :autosize="{
              minRows: 5,
              maxRows: 10
            }"
          />
        </n-form-item>
        <n-form-item label="Comment" path="comment">
          <n-input
            v-model:value="model.comment"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5
            }"
          />
        </n-form-item>
        <n-form-item label="Action" path="action">
          <n-input v-model:value="model.action" />
        </n-form-item>
      </n-form>
      <template #footer>
        <NButton type="primary" @click="handleConfirmAdd">Confirm</NButton>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import TodoList from '../components/TodoList.vue'
import { NCalendar, NButton, NModal, NCard, NForm, NFormItem, FormInst, NInput } from 'naive-ui'
import { addDays } from 'date-fns/esm'

const showAddModal = ref(false)

const handleAdd = () => {
  showAddModal.value = true
}

const formRef = ref<FormInst | null>(null)

const model = ref({
  name: '',
  time: '',
  comment: '',
  action: ''
})

const rules = ref({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' }
  ],
  time: [
    { required: true, message: 'Please input time', trigger: 'blur' }
  ]
})


const handleConfirmAdd = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('submit!')
      console.log(model.value)
      window.api.createSchedule({...model.value}).then((res) => {
        console.log(res)
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}


const value = ref(addDays(Date.now(), 0).valueOf())

const handleUpdateValue = (
  _: number,
  { year, month, date }: { year: number; month: number; date: number }
) => {
  console.log(`${year}-${month}-${date}`)
}
</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 1vh 0;
}
</style>
