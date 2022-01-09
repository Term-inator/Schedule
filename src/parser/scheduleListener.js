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
    id = 0
    name = ''
    year = 0
    dates = []
    time_ranges = []
}

// This class defines a complete listener for a parse tree produced by scheduleParser.
export default class scheduleListener extends antlr4.tree.ParseTreeListener {
    tasks = []
    task = new Task()

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
        tasks["add"].push(this.tasks)
        this.tasks = []
	}


	// Enter a parse tree produced by scheduleParser#deltasks.
    // deltasks -> DEL ( ID identifiers | tasks ) ';'
	enterDeltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#deltasks.
	exitDeltasks(ctx) {
        console.log("deltasks")
	}


	// Enter a parse tree produced by scheduleParser#delalltasks.
    // delAllTasks -> ( YEAR dates | datarange? names | daterange? timerange ) ';'
	enterDelalltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#delalltasks.
	exitDelalltasks(ctx) {
        console.log("delallatasks")
	}


	// Enter a parse tree produced by scheduleParser#renametask.
    // renametask -> RENAME ( NAME | ID IDENTIFIER ) NAME ';'
	enterRenametask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#renametask.
	exitRenametask(ctx) {
        console.log("renametask")
	}


	// Enter a parse tree produced by scheduleParser#ajusttask.
    // ajusttask -> AJUST ( task | ID IDENTIFIER ) TO YEAR? DATE? timerange ';'
	enterAjusttask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#ajusttask.
	exitAjusttask(ctx) {
        console.log("ajusttask")
	}


	// Enter a parse tree produced by scheduleParser#identifiers.
    // identifiers -> IDENTIFIER ',' identifiers | IDENTIFIER
	enterIdentifiers(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#identifiers.
	exitIdentifiers(ctx) {
        console.log("identifiers")
	}


	// Enter a parse tree produced by scheduleParser#tasks.
    // tasks -> task '&' tasks | task
	enterTasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#tasks.
	exitTasks(ctx) {
        console.log("tasks")
        this.tasks.push(this.task)
        this.task = new Task()
	}


	// Enter a parse tree produced by scheduleParser#task.
    // task -> ( YEAR dates | daterange weekdays? ) timeranges NAME
	enterTask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#task.
	exitTask(ctx) {
        console.log("task")
        let name = ctx.NAME().getText()
        let year = ctx.YEAR().getText()
        this.task.name = name
        this.task.year = year
	}


	// Enter a parse tree produced by scheduleParser#daterange.
    // daterange -> '(' YEAR DATE ',' YEAR DATE ')'
	enterDaterange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#daterange.
	exitDaterange(ctx) {
        console.log("daterange")
	}


	// Enter a parse tree produced by scheduleParser#names.
    // names -> NAME ',' names | NAME
	enterNames(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#names.
	exitNames(ctx) {
        console.log("names")
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
	}


	// Enter a parse tree produced by scheduleParser#weekdays.
    // weekdays -> WEEKDAY ',' weekdays | WEEKDAY
	enterWeekdays(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#weekdays.
	exitWeekdays(ctx) {
        console.log("weekdays")
    }
}