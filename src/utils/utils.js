export function getDatesBetween(start, end, week_days) {
    let week = [null, "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
    let res = []
    while((end.getTime() - start.getTime())>=0){
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