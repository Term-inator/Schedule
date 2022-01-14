<template>
  <div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle">
					<p style="font-size: 3vh; text-align: center;"> {{ day.year }} 年 {{ day.month }} 月 {{ day.date }} 日 </p>
				</Row>
			</div>
			<div>
				<Table :columns="times" :data="schedules" :show-header=false>
					<template slot-scope="{ index }" slot="action">
						<Button type="primary" size="small" style="margin-right: 5px" @click="copyId(index)">Copy Id</Button>
						<Button type="error" size="small" @click="remove(index)">Delete</Button>
					</template>
				</Table>
			</div>
		</Card>
	</div>
</template>

<script>
import { cmpByKey } from "../../utils/utils"

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
						align: "center"
				}
			],
			schedules: [],
			message_to_copy: ""
		}
	},
	mounted() {
		this.day = {
			year: this.$route.query.year,
			month: this.$route.query.month,
			date: this.$route.query.date,
			week_day: this.$route.query.week_day
		}
		let month = this.day.month.length === 1 ? "0" + this.day.month : this.day.month
		let date = this.day.date.length === 1 ? "0" + this.day.date : this.day.date
		let time = this.day.year + "/" + month + "/" + date
		console.log(time)
		let obj = this.$store.state.data[time]
		for(let id in obj) {
			this.schedules.push(obj[id])
		}
		this.schedules.sort(cmpByKey("time_range", false))
	},
	methods: {
		copyId(index) {
		
		},
		remove(index) {

		}
	}
}
</script>

<style scoped>
.main {
	padding: 4vh 5vw 4vh 5vw;
}
</style>