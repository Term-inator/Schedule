import Vuex from 'vuex'
import Vue from 'vue'
import { customAlphabet } from "nanoid"
import { TaskDao } from "../dao/dao"
import { same } from "../utils/utils"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		now: null,
		data_path: "resources/data.json",
		/**
			 * {
			 * 	日期: {
			 * 					id: task
			 * 					...
			 * 				}
			 * 	...
			 * }
			 */
		data: {}
	},
	mutations: {
		updateTime(state) {
			state.now = new Date()
		},
		loadData(state) {
			let fs = require("fs")
			let data = fs.readFileSync(state.data_path, "utf8")
			state.data = JSON.parse(data)
			console.log(state.data)
		},
		storeData(state) {
			let fs = require("fs")
			fs.writeFile(state.data_path, JSON.stringify(state.data), (err) => {
				if(err) {
					console.error(err)
				}
			})
		},
		addTask(state, [time, task]) {
			const nanoid = customAlphabet('0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 8)
			if(state.data[time] === undefined) {
				Vue.set(state.data, time, {})
			}
			Vue.set(state.data[time], "#" + nanoid(), task)
		},
		deleteTask(state, taskDao) {
			if(taskDao === null) {
				return
			}
			let time = taskDao.time
			let id = taskDao.id
			console.log(time, id)
			delete state.data[time][id]
			if(Object.keys(state.data[time]).length === 0) {
				delete state.data[time]
			}
		},
		deleteByTask(state, [task_time, task]) {
			this.dispatch("searchByTask", [task_time, task]).then((data) => {
				let taskDaos = data.taskDaos
				taskDaos.forEach((taskDao) => {
					this.commit("deleteTask", taskDao)
				})
			}).catch()
		},
		deleteByName(state, task_name) {
			let taskDaos = this.dispatch("searchByName", task_name)
			taskDaos.forEach((taskDao) => {
				this.commit("deleteTask", taskDao)
			})
		},
		deleteById(state, task_id) {
			this.dispatch("searchById", task_id).then((data) => {
				let taskDao = data.taskDao
				this.commit("deleteTask", taskDao)
			}).catch()
		},
		deleteByTimes(state, task_time_list) {
			let taskDaos = this.dispatch("searchByTimes", task_time_list)
			taskDaos.forEach((taskDao) => {
				this.commit("deleteTask", taskDao)
			})
		}
	},
	actions: {
		searchByTask(context, [task_time, task]) {
			let res = []
			for(let time in context.state.data) {
				for(let id in context.state.data[time]) {
					let res_task = context.state.data[time][id]
					if(task_time === time && same(task.time_ranges, res_task.time_ranges) && task.name === res_task.name) {
						let taskDao = new TaskDao(id, res_task.name, time, res_task.time_ranges)
						res.push(taskDao)
					}
				}
			}
			return {"taskDaos": res}
		},
		searchByName(context, task_name) {
			let res = []
			for(let time in context.state.data) {
				for(let id in context.state.data[time]) {
					let task = context.state.data[time][id]
					if(task_name === task.name) {
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
						res.push(taskDao)
					}
				}
			}
			return res
		},
		searchById(context, task_id) {
			for(let time in context.state.data) {
				for(let id in context.state.data[time]) {
					let task = context.state.data[time][id]
					if(task_id === id) {
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
						return {"taskDao": taskDao}
					}
				}
			}
			console.error("没有id为"+ task_id +"的task")
			return {"taskDao": null}
		},
		searchByTime(context, task_time) {
			let res = []
			for(let time in state.data) {
				if(task_time === time) {
					for(let id in context.state.data[time]) {
						let task = context.state.data[time][id]
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
						res.push(taskDao)
					}
				}
			}
			return res
		},
		searchByTimes(context, task_time_list) {
			res = []
			task_time_list.forEach((task_time) => {
				res.push(...this.dispatch("searchByTime", task_time))
			})
			return res
		}
	},
	getters: {}

})

export default store
