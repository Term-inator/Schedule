// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';

export let tasks = {
    "add": [],
    "del": [],
    "delall": [],
    "rename": [],
    "ajust": []
}
class Task {
    id = []
    names = []
    year = null
    dates = []
    time_ranges = []
    date_range = null
    week_days = []
}

// This class defines a complete listener for a parse tree produced by scheduleParser.
export default class scheduleListener extends antlr4.tree.ParseTreeListener {
    tasks = []
    task = new Task()
    new_task = new Task()

	// Enter a parse tree produced by scheduleParser#program.
    // Program -> ( addTasks | delTasks | delAllTasks | renameTask | ajustTask )*
	enterProgram(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#program.
	exitProgram(ctx) {
        console.log("program")
        console.log(tasks)
	}


	// Enter a parse tree produced by scheduleParser#addtasks.
    // addtasks -> ADD tasks ';'
	enterAddtasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#addtasks.
	exitAddtasks(ctx) {
        console.log("addtasks")
        tasks["add"].push(...this.tasks)
        this.tasks = []
	}


	// Enter a parse tree produced by scheduleParser#deltasks.
    // deltasks -> DEL ( ID identifiers | tasks ) ';'
	enterDeltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#deltasks.
	exitDeltasks(ctx) {
        console.log("deltasks")
        if(ctx.ID() !== null) {
            this.tasks.push(this.task)
        }
        tasks["del"].push(...this.tasks)
        this.task = new Task()
        this.tasks = []
	}


	// Enter a parse tree produced by scheduleParser#delalltasks.
    // delAllTasks -> ( YEAR dates | datarange? names | daterange? timerange ) ';'
	enterDelalltasks(ctx) {
        this.new_task = new Task()
	}

	// Exit a parse tree produced by scheduleParser#delalltasks.
	exitDelalltasks(ctx) {
        console.log("delallatasks")
        let year = (ctx.YEAR() === null ? null : ctx.YEAR().getText())
        this.task.year = year
        tasks["delall"].push(this.task)
        this.task = new Task()
	}


	// Enter a parse tree produced by scheduleParser#renametask.
    // renametask -> RENAME ( NAME | ID IDENTIFIER ) NAME ';'
	enterRenametask(ctx) {
        this.new_task = new Task()
	}

	// Exit a parse tree produced by scheduleParser#renametask.
	exitRenametask(ctx) {
        console.log("renametask")
        let name = ctx.NAME(0).getText()
        let id = (ctx.IDENTIFIER() === null ? null : ctx.IDENTIFIER().getText())
        let new_name = null
        if(id !== null) {
            new_name = name
            this.task.id.push(id)
        } 
        else {
            new_name = ctx.NAME(1).getText()
            this.task.names.push(name)
        }
        this.new_task.names.push(new_name)
        tasks["rename"].push({
            task: this.task, 
            new_task: this.new_task
        })
        this.task = new Task()
        this.new_task = new Task()
	}


	// Enter a parse tree produced by scheduleParser#ajusttask.
    // ajusttask -> AJUST ( task | ID IDENTIFIER ) TO YEAR? DATE? timerange ';'
	enterAjusttask(ctx) {
        this.new_task = new Task()
	}

	// Exit a parse tree produced by scheduleParser#ajusttask.
	exitAjusttask(ctx) {
        console.log("ajusttask")
        let id = (ctx.IDENTIFIER() === null ? null : ctx.IDENTIFIER().getText())
        let year = (ctx.YEAR() === null ? null : ctx.YEAR().getText())
        let date = (ctx.DATE() === null ? null : ctx.DATE().getText())
        this.task.id.push(id)
        this.new_task.year = year
        this.new_task.dates.push(date)
        tasks["ajust"].push({
            task: this.task, 
            new_task: this.new_task
        })
        this.task = new Task()
        this.new_task = new Task()
	}


	// Enter a parse tree produced by scheduleParser#identifiers.
    // identifiers -> IDENTIFIER ',' identifiers | IDENTIFIER
	enterIdentifiers(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#identifiers.
	exitIdentifiers(ctx) {
        console.log("identifiers")
        let id = ctx.IDENTIFIER().getText()
        this.task.id.push(id)
	}


	// Enter a parse tree produced by scheduleParser#tasks.
    // tasks -> task '&' tasks | task
	enterTasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#tasks.
	exitTasks(ctx) {
        console.log("tasks")
	}


	// Enter a parse tree produced by scheduleParser#task.
    // task -> ( YEAR dates | daterange weekdays? ) timeranges NAME
	enterTask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#task.
	exitTask(ctx) {
        console.log("task")
        let name = ctx.NAME().getText()
        let year = (ctx.YEAR() === null ? null : ctx.YEAR().getText())
        this.task.names.push(name)
        this.task.year = year
        this.tasks.push(this.task)
        this.task = new Task()
	}


	// Enter a parse tree produced by scheduleParser#daterange.
    // daterange -> '(' YEAR DATE ',' YEAR DATE ')'
	enterDaterange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#daterange.
	exitDaterange(ctx) {
        console.log("daterange")
        let date_range = ctx.getText()
        this.task.date_range = date_range
	}


	// Enter a parse tree produced by scheduleParser#names.
    // names -> NAME ',' names | NAME
	enterNames(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#names.
	exitNames(ctx) {
        console.log("names")
        let name = ctx.NAME().getText()
        this.task.names.push(name)
	}


	// Enter a parse tree produced by scheduleParser#dates.
    // dates -> DATE ',' dates | DATE
	enterDates(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#dates.
	exitDates(ctx) {
        console.log("dates")
        let date = ctx.DATE().getText()
        this.task.dates.push(date)
	}


	// Enter a parse tree produced by scheduleParser#timeranges.
    // timeranges -> timerange ',' timeranges | timerange
	enterTimeranges(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#timeranges.
	exitTimeranges(ctx) {
        console.log("timeranges")
        let time_range = ctx.timerange().getText()
        this.task.time_ranges.push(time_range)
	}


	// Enter a parse tree produced by scheduleParser#timerange.
    // timerange -> TIME '-' TIME
	enterTimerange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#timerange.
	exitTimerange(ctx) {
        console.log("timerange")
        let time_range = ctx.getText()
        this.new_task.time_ranges.push(time_range)
	}


	// Enter a parse tree produced by scheduleParser#weekdays.
    // weekdays -> WEEKDAY ',' weekdays | WEEKDAY
	enterWeekdays(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#weekdays.
	exitWeekdays(ctx) {
        console.log("weekdays")
        let week_day = ctx.WEEKDAY()
        this.task.week_days.push(week_day)
    }
}