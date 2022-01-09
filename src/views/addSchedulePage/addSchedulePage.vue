<template>
  <div class="main">
    <Row type='flex' justify='space-around'>
			<Col span="24">
				<Row>
					<Input id="work-space" v-model='code' type='textarea' :rows='16' placeholder='Enter your code...' />
				</Row>
				<br>
				<Row justify='end'>
					<Button type='success' size='large' @click='commit'>提交</Button>
				</Row>
			</Col>
		</Row>
  </div>
</template>

<script>
import antlr4 from "antlr4"
import scheduleLexer from "../../parser/scheduleLexer.js"
import scheduleParser from "../../parser/scheduleParser.js"
import scheduleListener from "../../parser/scheduleListener.js"
import scheduleErrListener from "../../parser/scheduleErrListener.js"
import { customAlphabet } from "nanoid"

export default {
  name: "addSchedulePage",
	data() {
		return {
			code: "",
			tasks: null
		}
	},
  mounted() {
		// let that = this
		// let fs = require("fs")
		// fs.readFile('resources/data.json', 'utf8', function(err, data){
		// 	// content.textContent = data
		// 	console.log(err)
		// 	that.code = data
		// 	console.log(JSON.parse(data))
		// })
		// fs.writeFile('resources/data.json', JSON.stringify({2:123}), function(err) {
		// 	console.log(err)
		// })
    // console.log("add")
  },
	methods: {
		commit() {
			const add_test = "add 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test & (2022 01/09, 2023 01/09) Mon, Tue 12:00-13:00 test_测试;"
			const del_test = "del 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test & (2022 01/09, 2023 01/09) Mon 12:00-13:00 test_测试; del id 12345666, 23565656;"
			const delall_test = "delall 2022 01/09, 02/09; delall (2022 01/09, 2023 01/09); delall 测试; delall (2022 01/09, 2023 01/09) 测试;"
			const rename_test = "rename 测试 测试1; rename id 123Tt4444 测试2;"
			const ajust_test = "ajust 2022 01/09 12:00-13:00 测试 to 13:00-14:00; ajust id 1245553 to 13:20-14:00; ajust id 1214452 to 2022 01/09 13:20-14:00; ajust id 122722 to 01/09 13:20-14:00;"
			const test = add_test + del_test + delall_test + rename_test + ajust_test
			const input = add_test
			const chars = new antlr4.InputStream(input)
			const lexer = new scheduleLexer(chars)
			const tokens  = new antlr4.CommonTokenStream(lexer)
			const parser = new scheduleParser(tokens)

			let errorListener = new scheduleErrListener()
			parser.removeErrorListeners()
			parser.addErrorListener(errorListener)
			parser.buildParseTrees = true
			const tree = parser.program()

			const errors = errorListener.getErrors()
			if(errors.length !== 0) {
				console.error(errors)
				alert(errors)
				// TODO
				return
			}

			const listener = new scheduleListener()
			antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree)

			this.tasks = listener.getParseRes()
			this.operate()
		},
		operate() {
			let week = [null, "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

			class Task {
				id = null
				name = null
				time_ranges = null
			}

			let tasks_json = {}

			for(let op in this.tasks) {
				this.tasks[op].forEach((obj) => {
					switch(op) {
						case "add": {
							const nanoid = customAlphabet('0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 8)
							// add YEAR dates timeranges NAME;
							if(obj.year !== null) {
								obj.dates.forEach((date) => {
									obj.dates.forEach((date) => {
										let task = new Task()
										task.id = nanoid()
										let time = obj.year + "/" + date
										task.name = obj.names[0]
										task.time_ranges = obj.time_ranges
										if(tasks_json[time] === undefined) {
											tasks_json[time] = []
										}
										tasks_json[time].push(task)
									})
								})
							}
							// add daterange weekdays? timeranges NAME;
							else {
								let task = new Task()
								task.id = nanoid()
								task.name = obj.names[0]
								task.time_ranges = obj.time_ranges
								let date_range = obj.date_range
								let start = new Date(date_range.substring(1, 5) + "/" + date_range.substring(5, 10))
								let end = new Date(date_range.substring(11, 15) + "/" + date_range.substring(15, 20))
								
								while((end.getTime() - start.getTime())>=0){
									let year = start.getFullYear()
									let month = (start.getMonth() + 1).toString().length === 1 ? "0" + (start.getMonth() + 1).toString() : (start.getMonth() + 1).toString()
									let date = start.getDate().toString().length === 1 ? "0" + start.getDate() : start.getDate()
									if(obj.week_days.length === 0 || obj.week_days.indexOf(week[start.getDay()]) !== -1) {
										let time = year + '/' + month + '/' + date
										if(tasks_json[time] === undefined) {
											tasks_json[time] = []
										}
										tasks_json[time].push(task)
									}
									start.setDate(start.getDate() + 1)
								}
							}
							break
						}
						case "del": {
							break
						}
						case "delall": {
							break
						}
						case "rename": {
							break
						}
						case "ajust": {
							break
						}
						default: {}
					}
				})
			}
			console.log(tasks_json)
		}
	}
}
</script>

<style scoped>
.main {
	padding: 4vh 5vw 4vh 5vw;
}

#work-space /deep/ .ivu-input {
  font-size: 3vh;
  resize: none;
}
</style>