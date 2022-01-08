<template>
  <div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle">
					<p style="font-size: 3vh; text-align: center;"> {{ day.year }} 年 {{ day.month }} 月 {{ day.date }} 日 </p>
				</Row>
			</div>
			<div>
				<Table :columns="times" :data="schedules" :show-header=false></Table>
			</div>
		</Card>
	</div>
</template>

<script>
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
					title: "Time",
					key: "time"
				},
				{
					title: "Schedule",
					key: "name"
				}
			],
			schedules: []
		}
	},
	mounted() {
		this.day = {
			year: this.$route.query.year,
			month: this.$route.query.month,
			date: this.$route.query.date,
			week_day: this.$route.query.week_day
		}
		console.log(this.$route.query.year, this.$route.query.month)
	}
}
</script>

<style scoped>
.main {
	padding: 4vh 5vw 4vh 5vw;
}
</style>