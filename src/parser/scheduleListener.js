// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';

// This class defines a complete listener for a parse tree produced by scheduleParser.
export default class scheduleListener extends antlr4.tree.ParseTreeListener {

	// Enter a parse tree produced by scheduleParser#program.
    // Program -> ( addTasks | delTasks | delAllTasks | renameTask | ajustTask )*
	enterProgram(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#program.
	exitProgram(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#addtasks.
    // addtasks -> ADD tasks ';'
	enterAddtasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#addtasks.
	exitAddtasks(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#deltasks.
    // deltasks -> DEL ( ID identifiers | tasks ) ';'
	enterDeltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#deltasks.
	exitDeltasks(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#delalltasks.
    // delAllTasks -> ( YEAR dates | datarange? names | daterange? timerange ) ';'
	enterDelalltasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#delalltasks.
	exitDelalltasks(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#renametask.
    // renametask -> RENAME ( NAME | ID IDENTIFIER ) NAME ';'
	enterRenametask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#renametask.
	exitRenametask(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#ajusttask.
    // ajusttask -> AJUST ( task | ID IDENTIFIER ) TO YEAR? DATE? timerange ';'
	enterAjusttask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#ajusttask.
	exitAjusttask(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#identifiers.
    // identifiers -> IDENTIFIER ',' identifiers | IDENTIFIER
	enterIdentifiers(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#identifiers.
	exitIdentifiers(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#tasks.
    // tasks -> task '&' tasks | task
	enterTasks(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#tasks.
	exitTasks(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#task.
    // task -> ( YEAR dates | daterange weekdays? ) timeranges NAME
	enterTask(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#task.
	exitTask(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#daterange.
    // daterange -> '(' YEAR DATE ',' YEAR DATE ')'
	enterDaterange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#daterange.
	exitDaterange(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#names.
    // names -> NAME ',' names | NAME
	enterNames(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#names.
	exitNames(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#dates.
    // dates -> DATE ',' dates | DATE
	enterDates(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#dates.
	exitDates(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#timeranges.
    // timeranges -> timerange ',' timeranges | timerange
	enterTimeranges(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#timeranges.
	exitTimeranges(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#timerange.
    // timerange -> TIME '-' TIME
	enterTimerange(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#timerange.
	exitTimerange(ctx) {
	}


	// Enter a parse tree produced by scheduleParser#weekdays.
    // weekdays -> WEEKDAY ',' weekdays | WEEKDAY
	enterWeekdays(ctx) {
	}

	// Exit a parse tree produced by scheduleParser#weekdays.
	exitWeekdays(ctx) {
	}



}