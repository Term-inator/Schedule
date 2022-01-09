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
			let add_test = "add 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test & (2022 01/09, 2023 01/09) Mon, Tue 12:00-13:00 test_测试;"
			let del_test = "del 2022 01/09,01/10 12:00-13:30, 14:00-14:30 测试test & (2022 01/09, 2023 01/09) Mon 12:00-13:00 test_测试; del id 12345666, 23565656;"
			let delall_test = "delall 2022 01/09, 02/09; delall (2022 01/09, 2023 01/09); delall 测试; delall (2022 01/09, 2023 01/09) 测试;"
			let rename_test = "rename 测试 测试1; rename id 123Tt4444 测试2;"
			let ajust_test = "ajust 2022 01/09 12:00-13:00 测试 to 13:00-14:00; ajust id 1245553 to 13:20-14:00; ajust id 1214452 to 2022 01/09 13:20-14:00; ajust id 122722 to 01/09 13:20-14:00;"
			const test = add_test + del_test + delall_test + rename_test + ajust_test
			const input = "add 2022 01/09,02/09 12:00-13:30, 14:20-14:30 测试test;"
			const chars = new antlr4.InputStream(input)
			const lexer = new scheduleLexer(chars)
			const tokens  = new antlr4.CommonTokenStream(lexer)
			const parser = new scheduleParser(tokens)
			parser.buildParseTrees = true
			const tree = parser.program()
			console.log(tree)
			this.tree = tree

			const listener = new scheduleListener()
			antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, this.tree)
		},
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