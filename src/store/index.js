import Vuex from 'vuex'
import Vue from 'vue'
import { customAlphabet } from "nanoid"


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
		addTask(state, taskDao) {
			const nanoid = customAlphabet('0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 8)
			let time = taskDao.time
			if(state.data[time] === undefined) {
				Vue.set(state.data, time, {})
			}
			Vue.set(state.data[time], "#" + nanoid(), taskDao)
		},
		deleteTask(state, taskDao) {
			if(taskDao === null) {
				return
			}
			let time = taskDao.time
			let id = taskDao.id
			delete state.data[time][id]
			if(Object.keys(state.data[time]).length === 0) {
				delete state.data[time]
			}
		},
		deleteByQuery(state, task_query) {
			let taskDaos = task_query.query(state.data)
			taskDaos.forEach((taskDao) => {
				this.commit("deleteTask", taskDao)
			})
		},
		updateTask(state, taskDao, new_taskDao) {
			let time = taskDao.time
			let id = taskDao.id
			if(new_taskDao.time === null) {
				state.data[time][id] = new_taskDao
			}
			else {
				this.commit("deleteTask", taskDao)
				time = new_taskDao.time
				new_taskDao.id = id
				new_taskDao.name = taskDao.name
				this.addTask("addTask", taskDao)
			}
		},
		updateByQuery(state, [task_query, new_taskDao]) {
			let taskDaos = task_query.query(state.data)
			if(taskDaos.length !== 1) {
				console.error("update错误")
				return
			}
			taskDaos.forEach((taskDao) => {
				this.commit("updateTask", taskDao, new_taskDao)
			})
		}
	},
	actions: {},
	getters: {}

})

export default store
