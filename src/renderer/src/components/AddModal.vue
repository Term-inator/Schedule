<template>
  <n-button type="primary" @click="handleAdd">Add</n-button>
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
        :size="'large'"
      >
        <n-form-item label="Name" path="name">
          <n-input v-model:value="model.name" />
        </n-form-item>
        <n-form-item label="rTime" path="rTime">
          <n-input
            v-model:value="model.rTime"
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
        <n-form-item label="exTime" path="exTime">
          <n-input
            v-model:value="model.exTime"
            type="textarea"
            :autosize="{
              minRows: 5,
              maxRows: 10
            }"
          />
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
import { NModal, NCard, NForm, NFormItem, FormInst, NInput, NButton } from 'naive-ui'

const showAddModal = ref(false)

const handleAdd = () => {
  showAddModal.value = true
}

const formRef = ref<FormInst | null>(null)

const model = ref({
  name: '',
  rTime: '',
  comment: '',
  action: '',
  exTime: ''
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
        showAddModal.value = false
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>