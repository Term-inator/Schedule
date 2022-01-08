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
export default {
  name: "addSchedulePage",
	data() {
		return {
			code: "",
		}
	},
  mounted() {
		let that = this
		let fs = require("fs")
		fs.readFile('resources/data.json', 'utf8', function(err, data){
			// content.textContent = data
			console.log(err)
			that.code = data
			console.log(JSON.parse(data))
		})
		fs.writeFile('resources/data.json', JSON.stringify({2:123}), function(err) {
			console.log(err)
		})
    console.log("add")
  },
	methods: {
		commit() {
			
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