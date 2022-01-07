<template>
  <div class="main">
		<Row>
			<Col> {{ day.year }} 年 {{ day.month }} 月 {{ day.date }} 日 </Col>
		</Row>
		<Row>
		</Row>
	</div>
</template>

<script>
export default {
	name: "schedulePage",
	data() {
		return {
			day: {
				year: null,
				month: null,
				date: null,
				week_day: null
			}
		}
	},
	mounted() {
		this.day = this.$route.params.day
		console.log(this.day)
	}
}
</script>

<style>

</style>