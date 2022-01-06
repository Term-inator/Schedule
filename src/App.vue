<template>
  <div id="app">
    <Menu mode="horizontal" active-name="1" @on-select="selectPage">
        <Menu-item name="1">
            <Icon type="ios-paper"></Icon>
            日程
        </Menu-item>
        <Menu-item name="2">
            <Icon type="ios-people"></Icon>
            添加
        </Menu-item>
    </Menu>
		<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
	methods: {
		selectPage(key) {
			const page_map = {
				1: "calendar",
				2: "add_schedule"
			}
			this.$router.push({name: page_map[key]})
		}
	}
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
