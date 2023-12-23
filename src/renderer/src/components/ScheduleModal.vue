<template>
  <n-button :type="(props.type as any)" @click="handleAdd">{{ props.name }}</n-button>
  <n-modal v-model:show="showAddModal">
    <n-card
      style="width: 58vw;"
      :title="props.name"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        ref="formRef"
        :model="props.modelValue"
        :rules="rules"
        label-placement="left"
        label-align="right"
        label-width="auto"
        require-mark-placement="right-hanging"
        :size="'large'"
      >
        <n-form-item label="Name" path="name">
          <n-input v-model:value="props.modelValue.name" />
        </n-form-item>
        <n-form-item label="rTime" path="rTime">
          <n-input
            v-model:value="props.modelValue.rTime"
            type="textarea"
            :autosize="{
              minRows: 4,
              maxRows: 8
            }"
          />
        </n-form-item>
        <n-form-item label="exTime" path="exTime">
          <n-input
            v-model:value="props.modelValue.exTime"
            type="textarea"
            :autosize="{
              minRows: 4,
              maxRows: 8
            }"
          />
        </n-form-item>
        <n-form-item label="Comment" path="comment">
          <n-input
            v-model:value="props.modelValue.comment"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5
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
import { reactive, ref, onBeforeUnmount } from 'vue'
import { NModal, NCard, NForm, NFormItem, FormInst, NInput, NButton } from 'naive-ui'
import { DateTime } from 'luxon';

type Model = {
  name: string
  rTime: string
  comment: string
  exTime: string
}

type Props = {
  type: string
  name: string
  modelValue?: Model
}

const props = withDefaults(defineProps<Props>(), 
  { type: 'default', modelValue: () => reactive({ name: '', rTime: '', exTime: '', comment: '' }) })
const emit = defineEmits(['submit'])

const showAddModal = ref(false)

const handleAdd = () => {
  showAddModal.value = true
}

const formRef = ref<FormInst | null>(null)

const rules = ref({
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' }
  ],
  rTime: [
    { required: true, message: 'Please input time', trigger: 'blur' }
  ]
})

const handleConfirmAdd = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('submit!')
      console.log(props.modelValue)
      emit('submit', props.modelValue)
      showAddModal.value = false
    } else {
      console.log('error submit!!')
    }
  })
}

// 监听键盘
const handleKeyboardEvent = (event: KeyboardEvent) => {
  // Modal 打开时的处理
  if (showAddModal.value) {
    // Ctrl + Enter 提交
    if (event.ctrlKey && event.key === 'Enter') {
      console.log('ctrl + enter')
      handleConfirmAdd()
    }
    // Ctrl + Up 关闭
    else if (event.ctrlKey && event.key === 'ArrowDown') {
      console.log('ctrl + down')
      showAddModal.value = false
    }
  // Modal 关闭时的处理
  } else {
    // Ctrl + Up 打开
    if (event.ctrlKey && event.key === 'ArrowUp') {
      console.log('ctrl + up')
      showAddModal.value = true
    }
  }

  // Ctrl + number
  if (event.ctrlKey && ['1', '2', '3', '4', '5', '6', '7'].includes(event.key)) {
    // x => 下一个星期x
    let date = DateTime.now().set({ weekday: Number(event.key) })
    if (date <= DateTime.now()) {
      date = date.plus({ week: 1 })
    }
    const value = date.toFormat('yyyy/MM/dd')

    // 获取 focus 的元素
    const focusElement = document.activeElement
    if (focusElement instanceof HTMLTextAreaElement) {
      const cursorStartPosition = focusElement.selectionStart
      const cursorEndPosition = focusElement.selectionEnd
      // 是第几个 textarea
      const textareaIndex = Array.from(document.querySelectorAll('textarea')).indexOf(focusElement as HTMLTextAreaElement)
      // 如果 Modal UI 改变，这里大概率要改
      switch (textareaIndex) {
        case 0: {
          props.modelValue.rTime = props.modelValue.rTime.slice(0, cursorStartPosition) + value + props.modelValue.rTime.slice(cursorEndPosition)
          break
        }
        case 1: {
          props.modelValue.exTime = props.modelValue.exTime.slice(0, cursorStartPosition) + value + props.modelValue.exTime.slice(cursorEndPosition)
          break
        }
      }
    }
  }
}

window.addEventListener('keydown', handleKeyboardEvent)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboardEvent)
})

</script>