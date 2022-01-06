<template>
	<div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle">
					<Button shape="circle" icon="ios-arrow-back"></Button>
					{{ month }}
					<Button shape="circle" icon="ios-arrow-forward"></Button>
				</Row>
			</div>
			<div id="days">

			</div>
		</Card>
	</div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "calendarPage",
	data() {
		return {
			month: 1,
			now: new Date()
		}
	},
	mounted() {
		this.createCalendar()
		setInterval(() => {
			this.updateTime()
			this.createCalendar()
		}, 20001)
	},
	methods: {
		updateTime() {
			let now = new Date()
			if(this.now.getHours() !== now.getHours() || this.now.getMinutes() !== now.getMinutes) {
				this.now = now
			}
			console.log(this.now)
		},
		createCalendar() {
			let days = d3.select("#days")
			console.log(days)
		}
	}
}
</script>

<style scoped>
.main {
	padding: 5vh 5vw 0 5vw;
}
</style>