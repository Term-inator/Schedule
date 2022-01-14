import Vuex from 'vuex'
import Vue from 'vue'
import { customAlphabet } from "nanoid"


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		now: null,
		code: "",
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
		setCode(state, code) {
			state.code = code
		},
		addTask(state, taskDao) {
			const nanoid = customAlphabet('0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz', 8)
			let time = taskDao.time
			if(state.data[time] === undefined) {
				Vue.set(state.data, time, {})
			}
			if(taskDao.id === null) {
				taskDao.id = "#" + nanoid()
			}
			Vue.set(state.data[time], taskDao.id, taskDao)
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
		updateTask(state, [taskDao, new_taskDao]) {
			let time = taskDao.time
			let id = taskDao.id
			console.log(taskDao, new_taskDao)
			if(new_taskDao.time === null) {
				for(let key in new_taskDao) {
					if(new_taskDao[key] !== null) {
						taskDao[key] = new_taskDao[key]
					}
				}
				state.data[time][id] = taskDao
			}
			else {
				this.commit("deleteTask", taskDao)
				for(let key in new_taskDao) {
					if(new_taskDao[key] !== null) {
						taskDao[key] = new_taskDao[key]
					}
				}
				let new_time = new_taskDao.time
				let year = time.substring(0, 4)
				let date = time.substring(5)
				let new_year = new_time.substring(0, 4)
				let new_date = new_time.substring(5)
				if(new_year === "0000") {
					new_year = year
				}
				if(new_date === "00/00") {
					new_date = date
				}
				taskDao.time = new_year + "/" + new_date
				this.commit("addTask", taskDao)
			}
		},
		updateByQuery(state, [task_query, new_taskDao]) {
			console.log(new_taskDao)
			let taskDaos = task_query.query(state.data)
			if(new_taskDao.time !== null && taskDaos.length !== 1) {
				// ajust操作
				console.error("ajust错误")
				return
			}
			taskDaos.forEach((taskDao) => {
				this.commit("updateTask", [taskDao, new_taskDao])
			})
		}
	},
	actions: {},
	getters: {}

})

export default store
