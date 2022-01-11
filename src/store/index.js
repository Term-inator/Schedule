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
		searchByTask(state, [task_time, task_timeranges, task_name]) {
			let res = []
			for(let time in state.data) {
				for(let id in state.data[time]) {
					let task = state.data[time][id]
					if(task_time === time && same(task_timeranges, task.time_ranges) && task_name === task.name) {
						let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
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
		}
	},
	actions: {},
	getters: {}

})

export default store
