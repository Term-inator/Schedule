import { same } from "../../utils/utils"
import { TaskDao } from "../dao/dao"

export class TaskQuery {
  times = []
	ids = []
	names = []
	time_ranges = []
	years = []
	one_hot = [false, false, false, false, false]
	
	constructor(times, ids, names, time_ranges, years) {
		if(times !== null) {
			this.times = times
			this.one_hot[0] = true
		}
		if(ids !== null) {
			this.ids = ids
			this.one_hot[1] = true
		}
		if(names !== null) {
			this.names = names
			this.one_hot[2] = true
		}
		if(time_ranges !== null) {
			this.time_ranges = time_ranges
			this.one_hot[3] = true
		}
		if(years !== null) {
			this.years = years
			this.one_hot[4] = true
		}
	}

	query(data) {
		let res = []
		for(let time in data) {
			if(this.one_hot[0] && this.times.indexOf(time) === -1) {
				continue
			}
			let year = time.substring(0, 4)
			if(this.one_hot[4] && this.years.indexOf(year) === -1) {
				continue
			}
			for(let id in data[time]) {
				if(this.one_hot[1] && this.ids.indexOf(id) === -1) {
					continue
				}
				let task = data[time][id]
				let name = task.name
				if(this.one_hot[2] && this.names.indexOf(name) === -1) {
					continue
				}
				let time_ranges = task.time_ranges
				if(this.one_hot[3] && same(this.time_ranges, time_ranges)) {
					continue
				}
				let taskDao = new TaskDao(id, task.name, time, task.time_ranges)
				res.push(taskDao)
			}
		}
		return res
	}
}