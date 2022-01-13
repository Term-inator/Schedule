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
import { TaskDao } from "../../model/dao/dao"
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
			const ajust_test = "ajust 2022 01/09 12:00-13:00 测试 to 13:00-14:00; ajust id #1245553 to 13:20-14:00; ajust id #1214452 to 2022 01/09 13:20-14:00; ajust id #122722 to 01/09 13:20-14:00;"
			
			const task1 = "2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test"
			const task2 = "(2022 01/09, 2022 01/18) Mon, Tue 12:00-13:00 test_测试"

			const add_task1 = "add "+ task1 + ";"
			const add_task2 = "add " + task2 + ";"
			const add_task12 = "add " + task1 + " & " + task2 + ";"

			const del_task1 = add_task1 + "del " + task1 + ";"
			const del_task2 = add_task2 + "del " + task2 + ";"
			const del_id_test = ""

			const delall_year_date = add_task12 + "delall 2022 01/09, 01/10, 01/11, 01/17;"
			const delall_daterange = add_task12 + "delall (2022 01/09, 2022 01/18);"
			const delall_daterange_names = add_task12 + "delall (2022 01/09, 2022 01/18) 测试test, test_测试;"
			const delall_daterange_timeranges = add_task12 + "delall (2022 01/09, 2022 01/18) 12:00-13:00, 14:00-14:30;"
			const delall_names = add_task12 + "delall 测试test, test_测试;"
			const delall_timeranges = add_task12 + "delall 12:00-13:00, 14:00-14:30;"
			const delall_ids = ""
			const delall = "delall (2022 01/09, 2023 01/09);"

			const rename_name_name = add_task12 + "rename 测试test test_测试;" + "delall test_测试;"
			const rename_id_name = ""

			const ajust_task1_year_date_timerange = ""
			const ajust_task1_date_timerange = ""
			const ajust_task1_timerange = ""
			const ajust_task2_year_date_timerange = ""

			const input = "rename 测试test test_测试;"
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
							this.opRename(task)
							break
						}
						case "ajust": {
							this.opAjust(task)
							break
						}
						default: {}
					}
				})
			}
			console.log(this.$store.state.data)
		},
		opAdd(obj) {
			// add YEAR dates timeranges NAME;
			if(obj.year !== null) {
				obj.dates.forEach((date) => {
					obj.time_ranges.forEach((time_range) => {
						let taskDao = new TaskDao()
						let time = obj.year + "/" + date
						taskDao.name = obj.names[0]
						taskDao.time = time
						taskDao.time_range = time_range
						this.$store.commit("addTask", taskDao)
					})
				})
			}
			// add daterange weekdays? timeranges NAME;
			else {
				let date_range = obj.date_range
				let start = new Date(date_range.substring(1, 5) + "/" + date_range.substring(5, 10))
				let end = new Date(date_range.substring(11, 15) + "/" + date_range.substring(15, 20))
				let times = getDatesBetween(start, end, obj.week_days)
				obj.time_ranges.forEach((time_range) => {
					times.forEach((time) => {
						let taskDao = new TaskDao()
						taskDao.name = obj.names[0]
						taskDao.time = time
						taskDao.time_range = time_range
						this.$store.commit("addTask", taskDao)
					})
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
			// rename id identifier name;
			if(obj.task.ids.length !== 0) {
				let task_query = new TaskQuery({
					ids: obj.task.ids
				})
				let new_taskDao = new TaskDao(null, obj.new_task.names[0], null, null)
				this.$store.commit("updateByQuery", [task_query, new_taskDao])
			}
			// rename name name;
			else {
				let task_query = new TaskQuery({
						names: obj.task.names
					})
				let new_taskDao = new TaskDao(null, obj.new_task.names[0], null, null)
				this.$store.commit("updateByQuery", [task_query, new_taskDao])
			}
		},
		opAjust(obj) {
			// ajust id identifier to YEAR? DATE? timerange
			if(obj.task.ids.length !== 0) {
				let task_query = new TaskQuery({
					ids: obj.task.ids
				})
				// TODO
				let new_taskDao = new TaskDao(null, obj.new_task.names[0], null, null)
				this.$store.commit("updateByQuery", [task_query, new_taskDao])
			}
			// ajust YEAR dates timeranges NAME to YEAR? DATE? timerange
			else {
				let task_query = new TaskQuery({
						names: obj.task.names
					})
				// TODO
				let new_taskDao = new TaskDao(null, obj.new_task.names[0], null, null)
				this.$store.commit("updateByQuery", [task_query, new_taskDao])
			}
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