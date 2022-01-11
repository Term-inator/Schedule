<template>
	<div class="main">
		<Card style="width: 100%; height: 100%">
			<div slot="title">
				<Row type="flex" justify="space-between" align="middle" style="font-size: 3vh;">
					<Button shape="circle" icon="ios-arrow-back" @click="prevMonth"></Button>
					{{ month_selected.year }} 年 {{ month_selected.month }} 月
					<Button shape="circle" icon="ios-arrow-forward" @click="nextMonth"></Button>
				</Row>
			</div>
			<div id="header">
				<Row type="flex" justify="center" align="middle">
					<Col v-for="(item, index) in calendar_header" :key="index" span="3" style="height: 6vh;">
						<div style="font-size: 3vh ;text-align: center;">
							{{ item }}
						</div>
					</Col>
				</Row>
			</div>
			<div id="days">
				<Row v-for="(row, i) in calendar" :key="i" type="flex" justify="center" align="middle">
					<Col v-for="(date, j) in row" :key="j" span="3">
						<Card style="height: 11vh;" :class="isToday(date)" v-on:click.native="getSchedule(date, j + 1)">
							<div v-if="date !== 0">
								{{ date }}
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</Card>
	</div>
</template>

<script>
export default {
  name: "calendarPage",
	data() {
		return {
			month_selected: {
				year: null,
				month: null,
				date: null,
				week_day: null
			},
			offset: 0,
			calendar_header: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			calendar: []
		}
	},
	computed: {
		isToday() {
			let now = this.$store.state.now
			let today = {
				year: now.getFullYear(),
				month: now.getMonth() + 1,
				date: now.getDate(),
				week_day: now.getDay()
			}
			return (date) => {
				if(this.month_selected.year === today.year && 
				this.month_selected.month === today.month && 
				date === today.date) {
					return "day today"
				}
				else {
					return "day"
				}
			}
		}
	},
	created() {
		this.selectMonth(this.$store.state.now)
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
			if(this.$store.state.now.getHours() !== now.getHours() || this.$store.state.now.getMinutes() !== now.getMinutes) {
				this.$store.commit("updateTime")
			}
			console.log(this.$store.state.now)
		},
		updateCalendar() {
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
			this.calendar = calendar
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
		getSchedule(date, week_day) {
			if(date === 0) {
				return
			}
			this.$router.push({name:'schedule', query: {
				year: this.month_selected.year,
				month: this.month_selected.month,
				date: date,
				week_day: week_day
			}})
		}
	}
}
</script>

<style scoped>
.main {
	padding: 4vh 5vw 4vh 5vw;
}

.day {
	width: 10vw;
	height: 10vh;
	cursor: pointer;
}

.today {
	width: 10vw;
	height: 10vh;
	color: red;
}

</style>