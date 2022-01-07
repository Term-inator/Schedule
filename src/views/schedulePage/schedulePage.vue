<template>
  <div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle" style="font-size: 3vh;">
					{{ day.year }} 年 {{ day.month }} 月 {{ day.date }} 日
				</Row>
			</div>
			<div>
				<Row type="flex" justify="center" align="middle">
					<Col>
						
					</Col>
				</Row>
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
			}
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
	padding: 4vh 5vw 0 5vw;
}
</style>