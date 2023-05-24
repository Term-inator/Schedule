// Generated from schedule.g4 by ANTLR 4.13.0

import {ParseTreeListener} from "antlr4";


import { ProgramContext } from "./scheduleParser";
import { StatementContext } from "./scheduleParser";
import { BuiltInFunctionContext } from "./scheduleParser";
import { AssignmentContext } from "./scheduleParser";
import { ArrayAssignmentContext } from "./scheduleParser";
import { FunctionCallContext } from "./scheduleParser";
import { ArgumentsContext } from "./scheduleParser";
import { ArgumentContext } from "./scheduleParser";
import { FunctionDeclarationContext } from "./scheduleParser";
import { ParametersContext } from "./scheduleParser";
import { ParameterContext } from "./scheduleParser";
import { TypeNameContext } from "./scheduleParser";
import { ArrayTypeContext } from "./scheduleParser";
import { ValueContext } from "./scheduleParser";
import { ArrayValueContext } from "./scheduleParser";
import { StringLiteralContext } from "./scheduleParser";
import { DateLiteralContext } from "./scheduleParser";
import { TimeLiteralContext } from "./scheduleParser";
import { DayLiteralContext } from "./scheduleParser";
import { TimeContext } from "./scheduleParser";
import { TimeRangeContext } from "./scheduleParser";
import { TaskContext } from "./scheduleParser";
import { CreateFunctionContext } from "./scheduleParser";
import { RemoveFunctionContext } from "./scheduleParser";
import { UpdateFunctionContext } from "./scheduleParser";
import { DeleteFunctionContext } from "./scheduleParser";
import { SelectFunctionContext } from "./scheduleParser";
import { PrintFunctionContext } from "./scheduleParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `scheduleParser`.
 */
export default class scheduleListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `scheduleParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.builtInFunction`.
	 * @param ctx the parse tree
	 */
	enterBuiltInFunction?: (ctx: BuiltInFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.builtInFunction`.
	 * @param ctx the parse tree
	 */
	exitBuiltInFunction?: (ctx: BuiltInFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.arrayAssignment`.
	 * @param ctx the parse tree
	 */
	enterArrayAssignment?: (ctx: ArrayAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.arrayAssignment`.
	 * @param ctx the parse tree
	 */
	exitArrayAssignment?: (ctx: ArrayAssignmentContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.arguments`.
	 * @param ctx the parse tree
	 */
	enterArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.arguments`.
	 * @param ctx the parse tree
	 */
	exitArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.argument`.
	 * @param ctx the parse tree
	 */
	enterArgument?: (ctx: ArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.argument`.
	 * @param ctx the parse tree
	 */
	exitArgument?: (ctx: ArgumentContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.parameters`.
	 * @param ctx the parse tree
	 */
	enterParameters?: (ctx: ParametersContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.parameters`.
	 * @param ctx the parse tree
	 */
	exitParameters?: (ctx: ParametersContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.parameter`.
	 * @param ctx the parse tree
	 */
	enterParameter?: (ctx: ParameterContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.parameter`.
	 * @param ctx the parse tree
	 */
	exitParameter?: (ctx: ParameterContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.typeName`.
	 * @param ctx the parse tree
	 */
	enterTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.typeName`.
	 * @param ctx the parse tree
	 */
	exitTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.arrayType`.
	 * @param ctx the parse tree
	 */
	enterArrayType?: (ctx: ArrayTypeContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.arrayType`.
	 * @param ctx the parse tree
	 */
	exitArrayType?: (ctx: ArrayTypeContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.arrayValue`.
	 * @param ctx the parse tree
	 */
	enterArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.arrayValue`.
	 * @param ctx the parse tree
	 */
	exitArrayValue?: (ctx: ArrayValueContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.stringLiteral`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.stringLiteral`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.dateLiteral`.
	 * @param ctx the parse tree
	 */
	enterDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.dateLiteral`.
	 * @param ctx the parse tree
	 */
	exitDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.timeLiteral`.
	 * @param ctx the parse tree
	 */
	enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.timeLiteral`.
	 * @param ctx the parse tree
	 */
	exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.dayLiteral`.
	 * @param ctx the parse tree
	 */
	enterDayLiteral?: (ctx: DayLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.dayLiteral`.
	 * @param ctx the parse tree
	 */
	exitDayLiteral?: (ctx: DayLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.time`.
	 * @param ctx the parse tree
	 */
	enterTime?: (ctx: TimeContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.time`.
	 * @param ctx the parse tree
	 */
	exitTime?: (ctx: TimeContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.timeRange`.
	 * @param ctx the parse tree
	 */
	enterTimeRange?: (ctx: TimeRangeContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.timeRange`.
	 * @param ctx the parse tree
	 */
	exitTimeRange?: (ctx: TimeRangeContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.task`.
	 * @param ctx the parse tree
	 */
	enterTask?: (ctx: TaskContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.task`.
	 * @param ctx the parse tree
	 */
	exitTask?: (ctx: TaskContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.createFunction`.
	 * @param ctx the parse tree
	 */
	enterCreateFunction?: (ctx: CreateFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.createFunction`.
	 * @param ctx the parse tree
	 */
	exitCreateFunction?: (ctx: CreateFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.removeFunction`.
	 * @param ctx the parse tree
	 */
	enterRemoveFunction?: (ctx: RemoveFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.removeFunction`.
	 * @param ctx the parse tree
	 */
	exitRemoveFunction?: (ctx: RemoveFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.updateFunction`.
	 * @param ctx the parse tree
	 */
	enterUpdateFunction?: (ctx: UpdateFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.updateFunction`.
	 * @param ctx the parse tree
	 */
	exitUpdateFunction?: (ctx: UpdateFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.deleteFunction`.
	 * @param ctx the parse tree
	 */
	enterDeleteFunction?: (ctx: DeleteFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.deleteFunction`.
	 * @param ctx the parse tree
	 */
	exitDeleteFunction?: (ctx: DeleteFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.selectFunction`.
	 * @param ctx the parse tree
	 */
	enterSelectFunction?: (ctx: SelectFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.selectFunction`.
	 * @param ctx the parse tree
	 */
	exitSelectFunction?: (ctx: SelectFunctionContext) => void;
	/**
	 * Enter a parse tree produced by `scheduleParser.printFunction`.
	 * @param ctx the parse tree
	 */
	enterPrintFunction?: (ctx: PrintFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `scheduleParser.printFunction`.
	 * @param ctx the parse tree
	 */
	exitPrintFunction?: (ctx: PrintFunctionContext) => void;
}

