<template>
	<div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle">
					<Button shape="circle" icon="ios-arrow-back" @click="prevMonth"></Button>
					{{ month_selected.year }} 年 {{ month_selected.month }} 月
					<Button shape="circle" icon="ios-arrow-forward" @click="nextMonth"></Button>
				</Row>
			</div>
			<div id="days">
				<Row v-for="index of 7" :key="index" :id="calendarRowId(index)"></Row>
			</div>
		</Card>
	</div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "calendarPage",
	data() {
		return {
			now: new Date(),
			month_selected: {
				year: null,
				month: null,
				date: null,
				week_day: null
			},
			offset: 0
		}
	},
	created() {
		this.selectMonth(this.now)
	},
	mounted() {
		this.updateCalendar()
		setInterval(() => {
			this.updateTime()
			this.updateCalendar()
		}, 59999)
	},
	methods: {
		updateTime() {
			let now = new Date()
			if(this.now.getHours() !== now.getHours() || this.now.getMinutes() !== now.getMinutes) {
				this.now = now
			}
			// console.log(this.now)
		},
		updateCalendar() {
			let today = {
				year: this.now.getFullYear(),
				month: this.now.getMonth() + 1,
				date: this.now.getDate(),
				week_day: this.now.getDay()
			}
			let last_day = () => {
				let day = new Date(this.month_selected.year, this.month_selected.month, 0)
				return {
					date: day.getDate(),
					week_day: day.getDay()
				}
			}
			let calendar = []
			let row = []
			let date = last_day().date
			let week_day = last_day().week_day
			for(; date >= 1; --date) {
				row.unshift(date)
				// week_day is from 1 to 7, shift it to 0 - 6 by - 1, then - 1 day, and (+ 7) % 7 to get a positive value
				week_day = (((week_day - 1) - 1) + 7) % 7 + 1 
				if(week_day === 7 || date === 1) {
					calendar.unshift(row)
					row = []
				}
			}
			while(calendar.at(0).length < 7) {
				calendar.at(0).unshift(0)
			}
			while(calendar.at(-1).length < 7) {
				calendar.at(-1).push(0)
			}
			console.log(calendar)
			for(let i = 0; i < calendar.length; ++i) {
				$("#calendar-row-" + i).empty()
				let row = calendar.at(i)
				row.forEach((date) => {
					$("#calendar-row-" + i).append("<div>" + (date === 0 ? '' : date) + "</div>")
				})
			}
		},
		selectMonth(dateObj) {
			this.month_selected = {
				year: dateObj.getFullYear(),
				month: dateObj.getMonth() + 1,
				date: dateObj.getDate(),
				week_day: dateObj.getDay()
			}
		},
		prevMonth() {
			this.offset -= 1
			let now = new Date()
			now.setMonth(now.getMonth() + this.offset)
			console.log(now)
			this.selectMonth(now)
			this.updateCalendar()
		},
		nextMonth() {
			this.offset += 1
			let now = new Date()
			now.setMonth(now.getMonth() + this.offset)
			this.selectMonth(now)
			this.updateCalendar()
		},
		calendarRowId(index) {
			return "calendar-row-" + (index - 1)
		}
	}
}
</script>

<style scoped>
.main {
	padding: 5vh 5vw 0 5vw;
}

.day {
	width: 10vw;
	height: 10vh;
}
</style>