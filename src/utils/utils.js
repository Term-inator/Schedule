/**
 * 时间区间内的日期
 * @param {Date} start 起始日期
 * @param {Date} end 结束日期 不包括在内
 * @param {String[]} week_days 筛选星期
 * @returns 符合的日期字符串数组 yyyy/mm/dd
 */
export function getDatesBetween(start, end, week_days) {
  let week = [null, "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
  let res = []
  while((end.getTime() - start.getTime()) > 0){
		let year = start.getFullYear()
		let month = (start.getMonth() + 1).toString().length === 1 ? "0" + (start.getMonth() + 1).toString() : (start.getMonth() + 1).toString()
		let date = start.getDate().toString().length === 1 ? "0" + start.getDate() : start.getDate()
		if(week_days.length === 0 || week_days.indexOf(week[start.getDay()]) !== -1) {
			let time = year + '/' + month + '/' + date
			res.push(time)
		}
		start.setDate(start.getDate() + 1)
	}
	return res
}

export function same(list_a, list_b) {
	if(list_a.sort().toString() === list_b.sort().toString()) {
		return true
	}
	return false
}

export function contain(list_a, list_b) {
    let res = true
    list_b.forEach((item) => {
        if(list_a.indexOf(item) === -1) {
            res = false
            return
        }
    })
    return res
}

export function intersectionId(list_a, list_b) {
    let set_b = new Set(list_b.map(v => v.id))
    return Array.from(new Set(list_a.map(v => v.id).filter(v => set_b.has(v))))
}

/**
 * 根据对象的某个属性对对象数组排序
 * @param {String} key 属性名
 * @param {boolean} desc 是否降序
 * @returns 
 */
export function cmpByKey(key, desc) {
    return (a, b) => {
        if(desc) {
            if(a[key] < b[key]) {
                return 1
            }
            else if(a[key] > b[key]) {
                return -1
            }
            else {
                return 0
            }
        }
        else {
            if(a[key] < b[key]) {
                return -1
            }
            else if(a[key] > b[key]) {
                return 1
            }
            else {
                return 0
            }
        }
    }
  }

/**
 * 时间格式化（补 0）
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} date 
 * @returns yy/mm/dd
 */
export function timeFormat(year, month, date) {
    month = month.toString()
    date = date.toString()
    month = month.length === 1 ? "0" + month : month
	date = date.length === 1 ? "0" + date : date
	let time = year + "/" + month + "/" + date
    return time
}