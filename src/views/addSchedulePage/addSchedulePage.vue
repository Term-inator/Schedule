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

export default {
  name: "addSchedulePage",
	data() {
		return {
			code: "",
			tree: null
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
			this.parse()
			this.semantic()
		},
		parse() {
			let add_test = "add 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test; (2022 01/09, 2023 01/09) Mon 12:00-13:00 play好;"
			let del_test = "del 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test; (2022 01/09, 2023 01/09) Mon 12:00-13:00 play好; id 12345666, 23565656;"
			let delall_test = "delall 2022 01/09, 02/09; delall (2022 01/09, 2023 01/09); delall 测试; delall (2022 01/09, 2023 01/09) 测试;"
			let rename_test = "rename 测试 测试1; rename id 123 测试2;"
			let ajust_test = "ajust 2022 01/09 12:00-13:00 测试 to 13:00-14:00; ajust id 123 to 13:20-14:00; ajust id 12 to 2022 01/09 13:20-14:00; ajust id 12 to 01/09 13:20-14:00;"
			let input = ajust_test
			let chars = new antlr4.InputStream(input)
			let lexer = new scheduleLexer(chars)
			let tokens  = new antlr4.CommonTokenStream(lexer)
			let parser = new scheduleParser(tokens)
			parser.buildParseTrees = true
			let tree = parser.program()
			console.log(tree)
			this.tree = tree
		},
		semantic() {
			let task_set = []
			class Task {
				id = 0
				year = null
				date = null
				time_range = []
				name = ""
			}
			class Visitor {
				visitChildren(ctx) {
					if (!ctx) {
						return
					}
					switch(ctx.ruleIndex) {
						case scheduleParser.RULE_addtasks: {
							console.log("add")
							break
						}
						case scheduleParser.RULE_deltasks: {
							console.log("del")
							break
						}
						case scheduleParser.RULE_delalltasks: {
							console.log("delall")
							break
						}
						case scheduleParser.RULE_renametask: {
							console.log("rename")
							break
						}
						case scheduleParser.RULE_ajusttask: {
							console.log("ajust")
							break
						}
						case scheduleParser.RULE_identifiers: {
							console.log("identifiers")
							break
						}
						case scheduleParser.RULE_tasks: {
							console.log("tasks")
							break
						}
						case scheduleParser.RULE_task: {
							console.log("task")
							break
						}
						case scheduleParser.RULE_daterange: {
							console.log("date_range")
							break
						}
						case scheduleParser.RULE_names: {
							console.log("names")
							break
						}
						case scheduleParser.RULE_dates: {
							console.log("dates")
							break
						}
						case scheduleParser.RULE_times: {
							console.log("times")
							break
						}
						case scheduleParser.RULE_timeranges: {
							console.log("time_ranges")
							break
						}
						case scheduleParser.RULE_timerange: {
							console.log("time_range")
							break
						}
						case scheduleParser.RULE_weekdays: {
							console.log("weekdays")
							break
						}
						default: {}
					}
					if (ctx.children) {
						return ctx.children.map(child => {
							if (child.children && child.children.length != 0) {
								return child.accept(this)
							} else {
								return child.getText()
							}
						});
					}
				}
			}
			this.tree.accept(new Visitor())
		},

		addTasks() {

		},

		delTasks() {
			
		},

		delAllTasks() {

		},

		renameTask() {

		},

		ajustTask() {

		},

		ids() {

		},

		tasks() {

		},

		task() {

		},

		dateRange() {

		},

		names() {

		},

		dates() {

		},

		times() {

		},

		timeRanges() {

		},

		timeRange() {

		},
		
		weekdays() {

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