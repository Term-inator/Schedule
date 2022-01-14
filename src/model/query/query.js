import { TaskDao } from "../dao/dao"

export class TaskQuery {
  times = []
	ids = []
	names = []
	time_ranges = []
	one_hot = [false, false, false, false]
	
	constructor(param) {
		if(param.times !== undefined) {
			this.times = param.times
			this.one_hot[0] = true
		}
		if(param.ids !== undefined) {
			this.ids = param.ids
			this.one_hot[1] = true
		}
		if(param.names !== undefined) {
			this.names = param.names
			this.one_hot[2] = true
		}
		if(param.time_ranges !== undefined) {
			this.time_ranges = param.time_ranges
			this.one_hot[3] = true
		}
	}

	query(data) {
		let res = []
		for(let time in data) {
			if(this.one_hot[0] && (this.times.indexOf(time) === -1)) {
				continue
			}
			for(let id in data[time]) {
				if(this.one_hot[1] && (this.ids.indexOf(id) === -1)) {
					continue
				}
				let task = data[time][id]
				let name = task.name
				if(this.one_hot[2] && (this.names.indexOf(name) === -1)) {
					continue
				}
				let task_time_range = task.time_range
				if(this.one_hot[3] && this.time_ranges.indexOf(task_time_range) === -1) {
					continue
				}
				let taskDao = new TaskDao(id, task.name, time, task.time_range)
				res.push(taskDao)
			}
		}
		if(res.length === 0) {
			console.error("nothing found")
		}
		return res
	}
}