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
			this.compile()
			this.semantic()
		},
		compile() {
			var input = "add 2022 01/09 12:00-13:00 play好;del  2022 01/09 12:00-13:00 play好; ajust 2022 01/09 12:00-13:00 play好 to 13:00-14:00;"
			var chars = new antlr4.InputStream(input)
			var lexer = new scheduleLexer(chars)
			var tokens  = new antlr4.CommonTokenStream(lexer)
			var parser = new scheduleParser(tokens)
			parser.buildParseTrees = true
			var tree = parser.program()
			console.log(tree)
			this.tree = tree
		},
		semantic() {
			class Task {
				year = null
				date = null
				time_range = []
				name = ""
			}
			class Visitor {
				task_set = []
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
						case scheduleParser.RULE_tasks: {
							console.log("tasks")
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
						case scheduleParser.RULE_task: {
							console.log("task")
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

		tasks() {

		},

		dateRange() {

		},

		names() {

		},

		task() {

		},

		dates() {

		},

		times() {

		},

		timeRanges() {

		},

		timeRange() {

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