// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';

export let tasks = []
class Task {
    year = null
    date = null
    time_range = []
    name = ""
}

// This class defines a complete listener for a parse tree produced by scheduleParser.
export default class scheduleListener extends antlr4.tree.ParseTreeListener {

	// Exit a parse tree produced by scheduleParser#program.
    // Program -> ( addTasks | delTasks | delAllTasks | renameTask | ajustTask )*
	exitProgram(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#addtasks.
    // addtasks -> ADD tasks ';'
	exitAddtasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#deltasks.
    // deltasks -> DEL ( ID identifiers | tasks ) ';'
	exitDeltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#delalltasks.
    // delAllTasks -> ( YEAR dates | datarange? names | daterange? timerange ) ';'
	exitDelalltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#renametask.
    // renametask -> RENAME ( NAME | ID IDENTIFIER ) NAME ';'
	exitRenametask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#ajusttask.
    // ajusttask -> AJUST ( task | ID IDENTIFIER ) TO YEAR? DATE? timerange ';'
	exitAjusttask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#identifiers.
    // identifiers -> IDENTIFIER ',' identifiers | IDENTIFIER
	exitIdentifiers(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#tasks.
    // tasks -> task '&' tasks | task
	exitTasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#task.
    // task -> ( YEAR dates | daterange weekdays? ) timeranges NAME
	exitTask(ctx) {
        let task = new Task()

	}

	// Exit a parse tree produced by scheduleParser#daterange.
    // daterange -> '(' YEAR DATE ',' YEAR DATE ')'
	exitDaterange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#names.
    // names -> NAME ',' names | NAME
	exitNames(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#dates.
    // dates -> DATE ',' dates | DATE
	exitDates(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#timeranges.
    // timeranges -> timerange ',' timeranges | timerange
	exitTimeranges(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#timerange.
    // timerange -> TIME '-' TIME
	exitTimerange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#weekdays.
    // weekdays -> WEEKDAY ',' weekdays | WEEKDAY
	exitWeekdays(ctx) {
	}
}