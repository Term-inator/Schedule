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
import { getDatesBetween } from "../../utils/utils"
import { TaskQuery } from "../../model/query/query"

export default {
  name: "addSchedulePage",
	data() {
		return {
			code: "",
			tasks: null
		}
	},
  mounted() {
  },
	methods: {
		commit() {
			const add_test = "add 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test & (2022 01/09, 2022 01/19) Mon, Tue 12:00-13:00 test_测试;"
			const del_test = "del 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test & (2022 01/09, 2023 01/09) Mon 12:00-13:00 test_测试; del id #12345666;"
			const delall_test = "delall 2022 01/09, 01/17; delall (2022 01/09, 2023 01/09); delall 测试; delall (2022 01/09, 2023 01/09) 测试; delall 12:00-13:00, 14:00-15:00; delall id #12345666, #23565656;"
			const rename_test = "rename 测试 测试1; rename id #123Tt4444 测试2;"
			const ajust_test = "ajust 2022 01/09 12:00-13:00 测试 to 13:00-14:00; ajust id #1245553 to 13:20-14:00; ajust id #1214452 to 2022 01/09 13:20-14:00; ajust id #122722 to 01/09 13:20-14:00;"
			const test = add_test + del_test + delall_test + rename_test + ajust_test
			const input = "add 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test;"
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
			for(let op in this.tasks) {
				this.tasks[op].forEach((task) => {
					switch(op) {
						case "add": {
							this.opAdd(task)
							break
						}
						case "del": {
							this.opDel(task)
							break
						}
						case "delall": {
							this.opDelall(task)
							break
						}
						case "rename": {
							// rename name name;

							// rename id identifier name;
							break
						}
						case "ajust": {
							// ajust YEAR dates timeranges NAME to YEAR? DATE? timerange

							// ajust id identifier to YEAR? DATE? timerange
							break
						}
						default: {}
					}
				})
			}
			console.log(this.$store.state.data)
		},
		opAdd(obj) {
			class Task {
				name = null
				time_range = null
			}
			// add YEAR dates timeranges NAME;
			if(obj.year !== null) {
				obj.dates.forEach((date) => {
					let task = new Task()
					let time = obj.year + "/" + date
					task.name = obj.names[0]
					obj.time_ranges.forEach((time_range) => {
						task.time_range = time_range
						this.$store.commit("addTask", [time, task])
					})
				})
			}
			// add daterange weekdays? timeranges NAME;
			else {
				let task = new Task()
				task.name = obj.names[0]
				task.time_ranges = obj.time_ranges
				let date_range = obj.date_range
				let start = new Date(date_range.substring(1, 5) + "/" + date_range.substring(5, 10))
				let end = new Date(date_range.substring(11, 15) + "/" + date_range.substring(15, 20))

				let times = getDatesBetween(start, end, obj.week_days)
				times.forEach((time) => {
					this.$store.commit("addTask", [time, task])
				})
			}
		},
		opDel(obj) {
			// del YEAR dates timeranges NAME;
			if(obj.year !== null) {
				let times = []
				obj.dates.forEach((date) => {
					let time = obj.year + "/" + date
					times.push(time)
				})
				let task_query = new TaskQuery({
						times: times, 
						names: obj.names, 
						time_ranges: obj.time_ranges
					})
				this.$store.commit("deleteByQuery", task_query)
			}
			// del id IDENTIFIER;
			else if(obj.ids.length !== 0) {
				let task_query = new TaskQuery({
						ids: obj.ids
					})
				this.$store.commit("deleteByQuery", task_query)
			}
			// del daterange weekdays? timeranges NAME;
			else {
				let date_range = obj.date_range
				let start = new Date(date_range.substring(1, 5) + "/" + date_range.substring(5, 10))
				let end = new Date(date_range.substring(11, 15) + "/" + date_range.substring(15, 20))

				let times = getDatesBetween(start, end, obj.week_days)
				let task_query = new TaskQuery({
						times: times, 
						names: obj.names, 
						time_ranges: obj.time_ranges
					})
				this.$store.commit("deleteByQuery", task_query)
			}
		},
		opDelall(obj) {
			// delall YEAR dates;
			if(obj.year !== null) {
				let year = obj.year
				let times = []
				obj.dates.forEach((date) => {
					let time = year + "/" + date
					times.push(time)
				})
				let task_query = new TaskQuery({
						times: times
					})
				this.$store.commit("deleteByQuery", task_query)
			}
			else if(obj.date_range !== null) {
				let date_range = obj.date_range
				let start = new Date(date_range.substring(1, 5) + "/" + date_range.substring(5, 10))
				let end = new Date(date_range.substring(11, 15) + "/" + date_range.substring(15, 20))

				let times = getDatesBetween(start, end, obj.week_days)
				// delall daterange names;
				if(obj.names.length !== 0) {
					let task_query = new TaskQuery({
							times: times,
							names: obj.names
						})
					this.$store.commit("deleteByQuery", task_query)
				}
				// delall daterange timerange;
				else if(obj.time_ranges.length !== 0) {
					let task_query = new TaskQuery({
							times: times,
							time_ranges: obj.time_ranges
						})
					this.$store.commit("deleteByQuery", task_query)
				}
				// delall daterange;
				else {
					let task_query = new TaskQuery({
							times: times
						})
					this.$store.commit("deleteByQuery", task_query)
				}
			}
			//delall id identifiers;
			else if(obj.ids.length !== 0) {
				let task_query = new TaskQuery({
						ids: obj.ids
					})
				this.$store.commit("deleteByQuery", task_query)
			}
			// delall names;
			else if(obj.names.length !== 0) {
				let task_query = new TaskQuery({
						names: obj.names
					})
				this.$store.commit("deleteByQuery", task_query)
			}
			// delall timeranges;
			else if(obj.time_ranges.length !== 0) {
				let task_query = new TaskQuery({
						time_ranges: obj.time_ranges
					})
				this.$store.commit("deleteByQuery", task_query)
			}
		},
		opRename(obj) {

		},
		opAjust(obj) {

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