<template>
  <div id="app">
    <Menu mode="horizontal" :active-name="this.$route.name" @on-select="selectPage">
        <Menu-item name="calendar">
            <Icon type="ios-paper"></Icon>
            日程
        </Menu-item>
        <Menu-item name="add_schedule">
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
  mounted() {
		this.$store.commit("updateTime")
		this.$store.commit("loadData")
	},
	methods: {
		selectPage(key) {
			this.$router.push({name: key})
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
