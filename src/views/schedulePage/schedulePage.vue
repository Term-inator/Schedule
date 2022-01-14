<template>
  <div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle">
					<p style="font-size: 3vh; text-align: center;"> {{ day.year }} 年 {{ day.month }} 月 {{ day.date }} 日 </p>
				</Row>
			</div>
			<div>
				<Table size="large" :columns="times" :data="schedules" :show-header=false no-data-text="暂无日程">
					<template slot-scope="{ index }" slot="action">
						<Button type="info" ghost icon="ios-copy-outline" style="margin-right: 5px" @click="copyId($event, index)"></Button>
						<Button type="info" ghost icon="ios-trash-outline" @click="remove(index)"></Button>
					</template>
				</Table>
			</div>
		</Card>
	</div>
</template>

<script>
import Vue from 'vue'
import { cmpByKey } from "../../utils/utils"
import Clipboard from 'clipboard'

export default {
	name: "schedulePage",
	data() {
		return {
			day: {
				year: null,
				month: null,
				date: null,
				week_day: null
			},
			times: [
				{
					title: "TimeRange",
					key: "time_range"
				},
				{
					title: "Schedule",
					key: "name"
				},
				{
						title: "Action",
						slot: "action",
						width: 140,
						align: "center"
				}
			],
			schedules: [],
			message_to_copy: ""
		}
	},
	mounted() {
		console.log("load schedule")
		this.day = {
			year: this.$route.query.year.toString(),
			month: this.$route.query.month.toString(),
			date: this.$route.query.date.toString(),
			week_day: this.$route.query.week_day
		}
		let month = this.day.month.length === 1 ? "0" + this.day.month : this.day.month
		let date = this.day.date.length === 1 ? "0" + this.day.date : this.day.date
		let time = this.day.year + "/" + month + "/" + date
		let obj = this.$store.state.data[time]
		// let index = 0
		for(let id in obj) {
			this.schedules.push(obj[id])
			// Vue.set(this.schedules, index, obj[id])
			// ++index
		}
		this.schedules.sort(cmpByKey("time_range", false))

	},
	methods: {
		copyId(event, index) {
			const clipboard = new Clipboard(event.target, { text: () => this.schedules[index].id })
			clipboard.on("success", (event) => {
				console.log("复制成功")
				clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
			})
			clipboard.on("error", (event) => {
				clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
			})
			clipboard.onClick(event)
		},
		remove(index) {
			this.$store.commit("deleteTask", this.schedules[index])
			this.$store.commit("storeData")
			this.schedules.splice(index, 1)
		}
	}
}
</script>

<style scoped>
.main {
	padding: 4vh 5vw 4vh 5vw;
}
</style>