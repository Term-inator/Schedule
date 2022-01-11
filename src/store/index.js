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
			Vue.set(state.data[time], nanoid(), task)
		},
		searchByTask(state, [task_time, task]) {
			let res = []
			for(let time in state.data) {
				for(let id in state.data[time]) {
					let res_task = state.data[time][id]
					if(task_time === time && same(task.timeranges, res_task.time_ranges) && task.name === res_task.name) {
						let taskDao = new TaskDao(id, res_task.name, time, res_task.time_ranges)
						res.push(taskDao)
					}
				}
			}
			return res
		},
		searchByName(state, task_name) {
			let res = []
			for(let time in state.data) {
				for(let id in state.data[time]) {
					let task = state.data[time][id]
					if(task_name === task.name) {
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
						res.push(taskDao)
					}
				}
			}
			return res
		},
		searchById(state, task_id) {
			for(let time in state.data) {
				for(let id in state.data[time]) {
					let task = state.data[time][id]
					if(task_id === id) {
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
						return taskDao
					}
				}
			}
		},
		searchByTime(state, task_time) {
			let res = []
			for(let time in state.data) {
				if(task_time === time) {
					for(let id in state.data[time]) {
						let task = state.data[time][id]
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
						res.push(taskDao)
					}
				}
			}
			return res
		},
		searchByTimes(state, task_time_list) {
			res = []
			task_time_list.forEach((task_time) => {
				res.push(...this.commit("searchByTime", task_time))
			})
		},
		deleteTask(state, taskDao) {
			let time = taskDao.time
			let id = taskDao.id
			delete state.data[time][id]
			if(Object.keys(state.data.time).length === 0) {
				delete state.data[time]
			}
		},
		deleteByTask(state, [task_time, task]) {
			let taskDaos = this.commit("searchByTask", [task_time, task])
			taskDaos.forEach((taskDao) => {
				this.commit("deleteTask", taskDao)
			})
		},
		deleteByName(state, task_name) {
			let taskDaos = this.commit("searchByName", task_name)
			taskDaos.forEach((taskDao) => {
				this.commit("deleteTask", taskDao)
			})
		},
		deleteById(state, task_id) {
			let taskDao = this.commit("searchById", task_id)
			this.commit("deleteTask", taskDao)
		},
		deleteByTimes(state, task_time_list) {
			let taskDaos = this.commit("searchByTimes", task_time_list)
			taskDaos.forEach((taskDao) => {
				this.commit("deleteTask", taskDao)
			})
		}
	},
	actions: {},
	getters: {}

})

export default store
