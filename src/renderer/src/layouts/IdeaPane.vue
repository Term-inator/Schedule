<template>
  <div class="idea-pane">
    <n-config-provider :theme="theme">
      <n-popover
        :show="showIdeaPopover"
        placement="left-start"
        trigger="manual"
        @update:show="handleUpdateShowIdea"
      >
        <template #trigger>
          <n-button
            text
            color="#ffe21e"
            style="font-size: 4vh"
            @click="showIdeaPopover = !showIdeaPopover"
          >
            <n-icon>
              <bulb-icon />
            </n-icon>
          </n-button>
        </template>
        <div style="width: 30vw">
          <n-input
            type="textarea"
            :autosize="{
              minRows: 16,
              maxRows: 20
            }"
            v-model:value="ideas"
            @update:value="debouncedHandleInput"
          />
        </div>
      </n-popover>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { NButton, NIcon, NPopover, NInput } from 'naive-ui'
import { Bulb as BulbIcon } from '@vicons/ionicons5'
import { useDebounce } from '@renderer/utils/utils'

const router = useRouter()

const theme = computed(() => {
  if (router.currentRoute.value.fullPath.includes('concentrate')) {
    return darkTheme
  } else {
    return null
  }
})

const showIdeaPopover = ref(false)

const handleUpdateShowIdea = (value: boolean) => {
  showIdeaPopover.value = value
}

const ideas = ref('')
const getIdeas = () => {
  const data = localStorage.getItem('ideas')
  if (data) {
    ideas.value = data
  } else {
    ideas.value = ''
  }
}
getIdeas()

const handleInput = (value: string) => {
  localStorage.setItem('ideas', value)
}

const debouncedHandleInput = useDebounce(handleInput, 500)
</script>

<style scoped lang="less">
.idea-pane {
  position: fixed;
  right: 1vh;
  top: 11.6vh;
}
</style>
