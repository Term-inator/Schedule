import Vuex from 'vuex'
import Vue from 'vue'
import { customAlphabet } from "nanoid"
import { TaskDao } from "../dao/dao"

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
		searchByTask(state, task) {

		},
		searchByName(state, name) {

		},
		searchById(state, id) {

		}
	},
	actions: {},
	getters: {}

})

export default store
