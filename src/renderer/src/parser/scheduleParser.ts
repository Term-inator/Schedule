// Generated from schedule.g4 by ANTLR 4.13.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import scheduleListener from "./scheduleListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class scheduleParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly ID = 36;
	public static readonly ALPHANUM = 37;
	public static readonly DIGIT = 38;
	public static readonly WS = 39;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_builtInFunction = 2;
	public static readonly RULE_assignment = 3;
	public static readonly RULE_arrayAssignment = 4;
	public static readonly RULE_functionCall = 5;
	public static readonly RULE_arguments = 6;
	public static readonly RULE_argument = 7;
	public static readonly RULE_functionDeclaration = 8;
	public static readonly RULE_parameters = 9;
	public static readonly RULE_parameter = 10;
	public static readonly RULE_typeName = 11;
	public static readonly RULE_arrayType = 12;
	public static readonly RULE_value = 13;
	public static readonly RULE_arrayValue = 14;
	public static readonly RULE_stringLiteral = 15;
	public static readonly RULE_dateLiteral = 16;
	public static readonly RULE_timeLiteral = 17;
	public static readonly RULE_dayLiteral = 18;
	public static readonly RULE_time = 19;
	public static readonly RULE_timeRange = 20;
	public static readonly RULE_task = 21;
	public static readonly RULE_createFunction = 22;
	public static readonly RULE_removeFunction = 23;
	public static readonly RULE_updateFunction = 24;
	public static readonly RULE_deleteFunction = 25;
	public static readonly RULE_selectFunction = 26;
	public static readonly RULE_printFunction = 27;
	public static readonly literalNames: (string | null)[] = [ null, "'='", 
                                                            "';'", "'('", 
                                                            "')'", "','", 
                                                            "'{'", "'}'", 
                                                            "'string'", 
                                                            "'date'", "'day'", 
                                                            "'time'", "'task'", 
                                                            "'[]'", "'['", 
                                                            "']'", "'\"'", 
                                                            "'\\r'", "'\\n'", 
                                                            "'\\'", "'/'", 
                                                            "':'", "'Mon'", 
                                                            "'Tue'", "'Wed'", 
                                                            "'Thur'", "'Fri'", 
                                                            "'Sat'", "'Sun'", 
                                                            "'-'", "'create'", 
                                                            "'remove'", 
                                                            "'update'", 
                                                            "'delete'", 
                                                            "'select'", 
                                                            "'print'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "ID", "ALPHANUM", 
                                                             "DIGIT", "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "builtInFunction", "assignment", "arrayAssignment", 
		"functionCall", "arguments", "argument", "functionDeclaration", "parameters", 
		"parameter", "typeName", "arrayType", "value", "arrayValue", "stringLiteral", 
		"dateLiteral", "timeLiteral", "dayLiteral", "time", "timeRange", "task", 
		"createFunction", "removeFunction", "updateFunction", "deleteFunction", 
		"selectFunction", "printFunction",
	];
	public get grammarFileName(): string { return "schedule.g4"; }
	public get literalNames(): (string | null)[] { return scheduleParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return scheduleParser.symbolicNames; }
	public get ruleNames(): string[] { return scheduleParser.ruleNames; }
	public get serializedATN(): number[] { return scheduleParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, scheduleParser._ATN, scheduleParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, scheduleParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 57;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 56;
				this.statement();
				}
				}
				this.state = 59;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & 532676639) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, scheduleParser.RULE_statement);
		try {
			this.state = 66;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 61;
				this.assignment();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 62;
				this.arrayAssignment();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 63;
				this.functionCall();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 64;
				this.functionDeclaration();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 65;
				this.builtInFunction();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public builtInFunction(): BuiltInFunctionContext {
		let localctx: BuiltInFunctionContext = new BuiltInFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, scheduleParser.RULE_builtInFunction);
		try {
			this.state = 74;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 68;
				this.createFunction();
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 69;
				this.removeFunction();
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 70;
				this.updateFunction();
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 71;
				this.deleteFunction();
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 72;
				this.selectFunction();
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 73;
				this.printFunction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, scheduleParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 76;
			this.typeName();
			this.state = 77;
			this.match(scheduleParser.ID);
			this.state = 78;
			this.match(scheduleParser.T__0);
			this.state = 79;
			this.value();
			this.state = 80;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayAssignment(): ArrayAssignmentContext {
		let localctx: ArrayAssignmentContext = new ArrayAssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, scheduleParser.RULE_arrayAssignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 82;
			this.arrayType();
			this.state = 83;
			this.match(scheduleParser.ID);
			this.state = 84;
			this.match(scheduleParser.T__0);
			this.state = 85;
			this.arrayValue();
			this.state = 86;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let localctx: FunctionCallContext = new FunctionCallContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, scheduleParser.RULE_functionCall);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 88;
			this.match(scheduleParser.ID);
			this.state = 89;
			this.match(scheduleParser.T__2);
			this.state = 91;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 14)) & ~0x1F) === 0 && ((1 << (_la - 14)) & 16809733) !== 0)) {
				{
				this.state = 90;
				this.arguments();
				}
			}

			this.state = 93;
			this.match(scheduleParser.T__3);
			this.state = 94;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let localctx: ArgumentsContext = new ArgumentsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, scheduleParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 96;
			this.argument();
			this.state = 101;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===5) {
				{
				{
				this.state = 97;
				this.match(scheduleParser.T__4);
				this.state = 98;
				this.argument();
				}
				}
				this.state = 103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public argument(): ArgumentContext {
		let localctx: ArgumentContext = new ArgumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, scheduleParser.RULE_argument);
		try {
			this.state = 106;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 38:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 104;
				this.value();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 105;
				this.arrayValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionDeclaration(): FunctionDeclarationContext {
		let localctx: FunctionDeclarationContext = new FunctionDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, scheduleParser.RULE_functionDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 108;
			this.typeName();
			this.state = 109;
			this.match(scheduleParser.ID);
			this.state = 110;
			this.match(scheduleParser.T__2);
			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 7936) !== 0)) {
				{
				this.state = 111;
				this.parameters();
				}
			}

			this.state = 114;
			this.match(scheduleParser.T__3);
			this.state = 115;
			this.match(scheduleParser.T__5);
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 116;
				this.statement();
				}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & 532676639) !== 0));
			this.state = 121;
			this.match(scheduleParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let localctx: ParametersContext = new ParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, scheduleParser.RULE_parameters);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 123;
			this.parameter();
			this.state = 128;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===5) {
				{
				{
				this.state = 124;
				this.match(scheduleParser.T__4);
				this.state = 125;
				this.parameter();
				}
				}
				this.state = 130;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameter(): ParameterContext {
		let localctx: ParameterContext = new ParameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, scheduleParser.RULE_parameter);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 131;
			this.typeName();
			this.state = 132;
			this.match(scheduleParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, scheduleParser.RULE_typeName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 134;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 7936) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayType(): ArrayTypeContext {
		let localctx: ArrayTypeContext = new ArrayTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, scheduleParser.RULE_arrayType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 136;
			this.typeName();
			this.state = 137;
			this.match(scheduleParser.T__12);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, scheduleParser.RULE_value);
		try {
			this.state = 144;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 139;
				this.task();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 140;
				this.dateLiteral();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 141;
				this.dayLiteral();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 142;
				this.timeLiteral();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 143;
				this.stringLiteral();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayValue(): ArrayValueContext {
		let localctx: ArrayValueContext = new ArrayValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, scheduleParser.RULE_arrayValue);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 146;
			this.match(scheduleParser.T__13);
			this.state = 155;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 16)) & ~0x1F) === 0 && ((1 << (_la - 16)) & 4202433) !== 0)) {
				{
				this.state = 147;
				this.value();
				this.state = 152;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===5) {
					{
					{
					this.state = 148;
					this.match(scheduleParser.T__4);
					this.state = 149;
					this.value();
					}
					}
					this.state = 154;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 157;
			this.match(scheduleParser.T__14);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stringLiteral(): StringLiteralContext {
		let localctx: StringLiteralContext = new StringLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, scheduleParser.RULE_stringLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 159;
			this.match(scheduleParser.T__15);
			this.state = 165;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294508542) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 255) !== 0)) {
				{
				this.state = 163;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 20:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 39:
					{
					this.state = 160;
					_la = this._input.LA(1);
					if(_la<=0 || (((_la) & ~0x1F) === 0 && ((1 << _la) & 983040) !== 0)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				case 19:
					{
					this.state = 161;
					this.match(scheduleParser.T__18);
					this.state = 162;
					this.matchWildcard();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 168;
			this.match(scheduleParser.T__15);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public dateLiteral(): DateLiteralContext {
		let localctx: DateLiteralContext = new DateLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, scheduleParser.RULE_dateLiteral);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 170;
			this.match(scheduleParser.DIGIT);
			this.state = 171;
			this.match(scheduleParser.DIGIT);
			this.state = 172;
			this.match(scheduleParser.DIGIT);
			this.state = 173;
			this.match(scheduleParser.DIGIT);
			this.state = 174;
			this.match(scheduleParser.T__19);
			this.state = 175;
			this.match(scheduleParser.DIGIT);
			this.state = 176;
			this.match(scheduleParser.DIGIT);
			this.state = 177;
			this.match(scheduleParser.T__19);
			this.state = 178;
			this.match(scheduleParser.DIGIT);
			this.state = 179;
			this.match(scheduleParser.DIGIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timeLiteral(): TimeLiteralContext {
		let localctx: TimeLiteralContext = new TimeLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, scheduleParser.RULE_timeLiteral);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 181;
			this.match(scheduleParser.DIGIT);
			this.state = 182;
			this.match(scheduleParser.DIGIT);
			this.state = 183;
			this.match(scheduleParser.T__20);
			this.state = 184;
			this.match(scheduleParser.DIGIT);
			this.state = 185;
			this.match(scheduleParser.DIGIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public dayLiteral(): DayLiteralContext {
		let localctx: DayLiteralContext = new DayLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, scheduleParser.RULE_dayLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 187;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 532676608) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public time(): TimeContext {
		let localctx: TimeContext = new TimeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, scheduleParser.RULE_time);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			this.match(scheduleParser.DIGIT);
			this.state = 190;
			this.match(scheduleParser.DIGIT);
			this.state = 191;
			this.match(scheduleParser.T__20);
			this.state = 192;
			this.match(scheduleParser.DIGIT);
			this.state = 193;
			this.match(scheduleParser.DIGIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public timeRange(): TimeRangeContext {
		let localctx: TimeRangeContext = new TimeRangeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, scheduleParser.RULE_timeRange);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 195;
			this.time();
			this.state = 196;
			this.match(scheduleParser.T__28);
			this.state = 197;
			this.time();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public task(): TaskContext {
		let localctx: TaskContext = new TaskContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, scheduleParser.RULE_task);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 199;
			this.time();
			this.state = 200;
			this.stringLiteral();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public createFunction(): CreateFunctionContext {
		let localctx: CreateFunctionContext = new CreateFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, scheduleParser.RULE_createFunction);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 202;
			this.match(scheduleParser.T__29);
			this.state = 203;
			this.match(scheduleParser.T__2);
			this.state = 204;
			this.arrayValue();
			this.state = 205;
			this.match(scheduleParser.T__3);
			this.state = 206;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public removeFunction(): RemoveFunctionContext {
		let localctx: RemoveFunctionContext = new RemoveFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, scheduleParser.RULE_removeFunction);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 208;
			this.match(scheduleParser.T__30);
			this.state = 209;
			this.match(scheduleParser.T__2);
			this.state = 210;
			this.arrayValue();
			this.state = 211;
			this.match(scheduleParser.T__3);
			this.state = 212;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public updateFunction(): UpdateFunctionContext {
		let localctx: UpdateFunctionContext = new UpdateFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, scheduleParser.RULE_updateFunction);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 214;
			this.match(scheduleParser.T__31);
			this.state = 215;
			this.match(scheduleParser.T__2);
			this.state = 216;
			this.arrayValue();
			this.state = 217;
			this.match(scheduleParser.T__4);
			this.state = 218;
			this.stringLiteral();
			this.state = 219;
			this.match(scheduleParser.T__4);
			this.state = 220;
			this.value();
			this.state = 221;
			this.match(scheduleParser.T__3);
			this.state = 222;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public deleteFunction(): DeleteFunctionContext {
		let localctx: DeleteFunctionContext = new DeleteFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, scheduleParser.RULE_deleteFunction);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 224;
			this.match(scheduleParser.T__32);
			this.state = 225;
			this.match(scheduleParser.T__2);
			this.state = 226;
			this.arrayValue();
			this.state = 227;
			this.match(scheduleParser.T__3);
			this.state = 228;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectFunction(): SelectFunctionContext {
		let localctx: SelectFunctionContext = new SelectFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, scheduleParser.RULE_selectFunction);
		let _la: number;
		try {
			this.state = 253;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 230;
				this.match(scheduleParser.T__33);
				this.state = 231;
				this.match(scheduleParser.T__2);
				this.state = 245;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===16) {
					{
					this.state = 232;
					this.stringLiteral();
					this.state = 233;
					this.match(scheduleParser.T__4);
					this.state = 234;
					this.value();
					this.state = 242;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===5) {
						{
						{
						this.state = 235;
						this.match(scheduleParser.T__4);
						this.state = 236;
						this.stringLiteral();
						this.state = 237;
						this.match(scheduleParser.T__4);
						this.state = 238;
						this.value();
						}
						}
						this.state = 244;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 247;
				this.match(scheduleParser.T__3);
				this.state = 248;
				this.match(scheduleParser.T__1);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 249;
				this.match(scheduleParser.T__33);
				this.state = 250;
				this.match(scheduleParser.T__2);
				this.state = 251;
				this.match(scheduleParser.T__3);
				this.state = 252;
				this.match(scheduleParser.T__1);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public printFunction(): PrintFunctionContext {
		let localctx: PrintFunctionContext = new PrintFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, scheduleParser.RULE_printFunction);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this.match(scheduleParser.T__34);
			this.state = 256;
			this.match(scheduleParser.T__2);
			this.state = 257;
			this.arrayValue();
			this.state = 258;
			this.match(scheduleParser.T__3);
			this.state = 259;
			this.match(scheduleParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,39,262,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,1,0,4,0,58,8,0,11,0,12,0,59,1,1,1,1,1,
	1,1,1,1,1,3,1,67,8,1,1,2,1,2,1,2,1,2,1,2,1,2,3,2,75,8,2,1,3,1,3,1,3,1,3,
	1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,3,5,92,8,5,1,5,1,5,1,5,1,6,
	1,6,1,6,5,6,100,8,6,10,6,12,6,103,9,6,1,7,1,7,3,7,107,8,7,1,8,1,8,1,8,1,
	8,3,8,113,8,8,1,8,1,8,1,8,4,8,118,8,8,11,8,12,8,119,1,8,1,8,1,9,1,9,1,9,
	5,9,127,8,9,10,9,12,9,130,9,9,1,10,1,10,1,10,1,11,1,11,1,12,1,12,1,12,1,
	13,1,13,1,13,1,13,1,13,3,13,145,8,13,1,14,1,14,1,14,1,14,5,14,151,8,14,
	10,14,12,14,154,9,14,3,14,156,8,14,1,14,1,14,1,15,1,15,1,15,1,15,5,15,164,
	8,15,10,15,12,15,167,9,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,
	1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,19,1,19,1,
	19,1,19,1,19,1,19,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,22,1,22,1,22,1,22,
	1,22,1,22,1,23,1,23,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,
	1,26,1,26,1,26,1,26,1,26,5,26,241,8,26,10,26,12,26,244,9,26,3,26,246,8,
	26,1,26,1,26,1,26,1,26,1,26,1,26,3,26,254,8,26,1,27,1,27,1,27,1,27,1,27,
	1,27,1,27,0,0,28,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
	40,42,44,46,48,50,52,54,0,3,1,0,8,12,1,0,16,19,1,0,22,28,260,0,57,1,0,0,
	0,2,66,1,0,0,0,4,74,1,0,0,0,6,76,1,0,0,0,8,82,1,0,0,0,10,88,1,0,0,0,12,
	96,1,0,0,0,14,106,1,0,0,0,16,108,1,0,0,0,18,123,1,0,0,0,20,131,1,0,0,0,
	22,134,1,0,0,0,24,136,1,0,0,0,26,144,1,0,0,0,28,146,1,0,0,0,30,159,1,0,
	0,0,32,170,1,0,0,0,34,181,1,0,0,0,36,187,1,0,0,0,38,189,1,0,0,0,40,195,
	1,0,0,0,42,199,1,0,0,0,44,202,1,0,0,0,46,208,1,0,0,0,48,214,1,0,0,0,50,
	224,1,0,0,0,52,253,1,0,0,0,54,255,1,0,0,0,56,58,3,2,1,0,57,56,1,0,0,0,58,
	59,1,0,0,0,59,57,1,0,0,0,59,60,1,0,0,0,60,1,1,0,0,0,61,67,3,6,3,0,62,67,
	3,8,4,0,63,67,3,10,5,0,64,67,3,16,8,0,65,67,3,4,2,0,66,61,1,0,0,0,66,62,
	1,0,0,0,66,63,1,0,0,0,66,64,1,0,0,0,66,65,1,0,0,0,67,3,1,0,0,0,68,75,3,
	44,22,0,69,75,3,46,23,0,70,75,3,48,24,0,71,75,3,50,25,0,72,75,3,52,26,0,
	73,75,3,54,27,0,74,68,1,0,0,0,74,69,1,0,0,0,74,70,1,0,0,0,74,71,1,0,0,0,
	74,72,1,0,0,0,74,73,1,0,0,0,75,5,1,0,0,0,76,77,3,22,11,0,77,78,5,36,0,0,
	78,79,5,1,0,0,79,80,3,26,13,0,80,81,5,2,0,0,81,7,1,0,0,0,82,83,3,24,12,
	0,83,84,5,36,0,0,84,85,5,1,0,0,85,86,3,28,14,0,86,87,5,2,0,0,87,9,1,0,0,
	0,88,89,5,36,0,0,89,91,5,3,0,0,90,92,3,12,6,0,91,90,1,0,0,0,91,92,1,0,0,
	0,92,93,1,0,0,0,93,94,5,4,0,0,94,95,5,2,0,0,95,11,1,0,0,0,96,101,3,14,7,
	0,97,98,5,5,0,0,98,100,3,14,7,0,99,97,1,0,0,0,100,103,1,0,0,0,101,99,1,
	0,0,0,101,102,1,0,0,0,102,13,1,0,0,0,103,101,1,0,0,0,104,107,3,26,13,0,
	105,107,3,28,14,0,106,104,1,0,0,0,106,105,1,0,0,0,107,15,1,0,0,0,108,109,
	3,22,11,0,109,110,5,36,0,0,110,112,5,3,0,0,111,113,3,18,9,0,112,111,1,0,
	0,0,112,113,1,0,0,0,113,114,1,0,0,0,114,115,5,4,0,0,115,117,5,6,0,0,116,
	118,3,2,1,0,117,116,1,0,0,0,118,119,1,0,0,0,119,117,1,0,0,0,119,120,1,0,
	0,0,120,121,1,0,0,0,121,122,5,7,0,0,122,17,1,0,0,0,123,128,3,20,10,0,124,
	125,5,5,0,0,125,127,3,20,10,0,126,124,1,0,0,0,127,130,1,0,0,0,128,126,1,
	0,0,0,128,129,1,0,0,0,129,19,1,0,0,0,130,128,1,0,0,0,131,132,3,22,11,0,
	132,133,5,36,0,0,133,21,1,0,0,0,134,135,7,0,0,0,135,23,1,0,0,0,136,137,
	3,22,11,0,137,138,5,13,0,0,138,25,1,0,0,0,139,145,3,42,21,0,140,145,3,32,
	16,0,141,145,3,36,18,0,142,145,3,34,17,0,143,145,3,30,15,0,144,139,1,0,
	0,0,144,140,1,0,0,0,144,141,1,0,0,0,144,142,1,0,0,0,144,143,1,0,0,0,145,
	27,1,0,0,0,146,155,5,14,0,0,147,152,3,26,13,0,148,149,5,5,0,0,149,151,3,
	26,13,0,150,148,1,0,0,0,151,154,1,0,0,0,152,150,1,0,0,0,152,153,1,0,0,0,
	153,156,1,0,0,0,154,152,1,0,0,0,155,147,1,0,0,0,155,156,1,0,0,0,156,157,
	1,0,0,0,157,158,5,15,0,0,158,29,1,0,0,0,159,165,5,16,0,0,160,164,8,1,0,
	0,161,162,5,19,0,0,162,164,9,0,0,0,163,160,1,0,0,0,163,161,1,0,0,0,164,
	167,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,168,1,0,0,0,167,165,1,0,
	0,0,168,169,5,16,0,0,169,31,1,0,0,0,170,171,5,38,0,0,171,172,5,38,0,0,172,
	173,5,38,0,0,173,174,5,38,0,0,174,175,5,20,0,0,175,176,5,38,0,0,176,177,
	5,38,0,0,177,178,5,20,0,0,178,179,5,38,0,0,179,180,5,38,0,0,180,33,1,0,
	0,0,181,182,5,38,0,0,182,183,5,38,0,0,183,184,5,21,0,0,184,185,5,38,0,0,
	185,186,5,38,0,0,186,35,1,0,0,0,187,188,7,2,0,0,188,37,1,0,0,0,189,190,
	5,38,0,0,190,191,5,38,0,0,191,192,5,21,0,0,192,193,5,38,0,0,193,194,5,38,
	0,0,194,39,1,0,0,0,195,196,3,38,19,0,196,197,5,29,0,0,197,198,3,38,19,0,
	198,41,1,0,0,0,199,200,3,38,19,0,200,201,3,30,15,0,201,43,1,0,0,0,202,203,
	5,30,0,0,203,204,5,3,0,0,204,205,3,28,14,0,205,206,5,4,0,0,206,207,5,2,
	0,0,207,45,1,0,0,0,208,209,5,31,0,0,209,210,5,3,0,0,210,211,3,28,14,0,211,
	212,5,4,0,0,212,213,5,2,0,0,213,47,1,0,0,0,214,215,5,32,0,0,215,216,5,3,
	0,0,216,217,3,28,14,0,217,218,5,5,0,0,218,219,3,30,15,0,219,220,5,5,0,0,
	220,221,3,26,13,0,221,222,5,4,0,0,222,223,5,2,0,0,223,49,1,0,0,0,224,225,
	5,33,0,0,225,226,5,3,0,0,226,227,3,28,14,0,227,228,5,4,0,0,228,229,5,2,
	0,0,229,51,1,0,0,0,230,231,5,34,0,0,231,245,5,3,0,0,232,233,3,30,15,0,233,
	234,5,5,0,0,234,242,3,26,13,0,235,236,5,5,0,0,236,237,3,30,15,0,237,238,
	5,5,0,0,238,239,3,26,13,0,239,241,1,0,0,0,240,235,1,0,0,0,241,244,1,0,0,
	0,242,240,1,0,0,0,242,243,1,0,0,0,243,246,1,0,0,0,244,242,1,0,0,0,245,232,
	1,0,0,0,245,246,1,0,0,0,246,247,1,0,0,0,247,248,5,4,0,0,248,254,5,2,0,0,
	249,250,5,34,0,0,250,251,5,3,0,0,251,252,5,4,0,0,252,254,5,2,0,0,253,230,
	1,0,0,0,253,249,1,0,0,0,254,53,1,0,0,0,255,256,5,35,0,0,256,257,5,3,0,0,
	257,258,3,28,14,0,258,259,5,4,0,0,259,260,5,2,0,0,260,55,1,0,0,0,17,59,
	66,74,91,101,106,112,119,128,144,152,155,163,165,242,245,253];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!scheduleParser.__ATN) {
			scheduleParser.__ATN = new ATNDeserializer().deserialize(scheduleParser._serializedATN);
		}

		return scheduleParser.__ATN;
	}


	static DecisionsToDFA = scheduleParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_program;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignment(): AssignmentContext {
		return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext;
	}
	public arrayAssignment(): ArrayAssignmentContext {
		return this.getTypedRuleContext(ArrayAssignmentContext, 0) as ArrayAssignmentContext;
	}
	public functionCall(): FunctionCallContext {
		return this.getTypedRuleContext(FunctionCallContext, 0) as FunctionCallContext;
	}
	public functionDeclaration(): FunctionDeclarationContext {
		return this.getTypedRuleContext(FunctionDeclarationContext, 0) as FunctionDeclarationContext;
	}
	public builtInFunction(): BuiltInFunctionContext {
		return this.getTypedRuleContext(BuiltInFunctionContext, 0) as BuiltInFunctionContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_statement;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
}


export class BuiltInFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public createFunction(): CreateFunctionContext {
		return this.getTypedRuleContext(CreateFunctionContext, 0) as CreateFunctionContext;
	}
	public removeFunction(): RemoveFunctionContext {
		return this.getTypedRuleContext(RemoveFunctionContext, 0) as RemoveFunctionContext;
	}
	public updateFunction(): UpdateFunctionContext {
		return this.getTypedRuleContext(UpdateFunctionContext, 0) as UpdateFunctionContext;
	}
	public deleteFunction(): DeleteFunctionContext {
		return this.getTypedRuleContext(DeleteFunctionContext, 0) as DeleteFunctionContext;
	}
	public selectFunction(): SelectFunctionContext {
		return this.getTypedRuleContext(SelectFunctionContext, 0) as SelectFunctionContext;
	}
	public printFunction(): PrintFunctionContext {
		return this.getTypedRuleContext(PrintFunctionContext, 0) as PrintFunctionContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_builtInFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterBuiltInFunction) {
	 		listener.enterBuiltInFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitBuiltInFunction) {
	 		listener.exitBuiltInFunction(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public ID(): TerminalNode {
		return this.getToken(scheduleParser.ID, 0);
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_assignment;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterAssignment) {
	 		listener.enterAssignment(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitAssignment) {
	 		listener.exitAssignment(this);
		}
	}
}


export class ArrayAssignmentContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayType(): ArrayTypeContext {
		return this.getTypedRuleContext(ArrayTypeContext, 0) as ArrayTypeContext;
	}
	public ID(): TerminalNode {
		return this.getToken(scheduleParser.ID, 0);
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_arrayAssignment;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterArrayAssignment) {
	 		listener.enterArrayAssignment(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitArrayAssignment) {
	 		listener.exitArrayAssignment(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(scheduleParser.ID, 0);
	}
	public arguments(): ArgumentsContext {
		return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_functionCall;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterFunctionCall) {
	 		listener.enterFunctionCall(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitFunctionCall) {
	 		listener.exitFunctionCall(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public argument_list(): ArgumentContext[] {
		return this.getTypedRuleContexts(ArgumentContext) as ArgumentContext[];
	}
	public argument(i: number): ArgumentContext {
		return this.getTypedRuleContext(ArgumentContext, i) as ArgumentContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_arguments;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterArguments) {
	 		listener.enterArguments(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitArguments) {
	 		listener.exitArguments(this);
		}
	}
}


export class ArgumentContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_argument;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterArgument) {
	 		listener.enterArgument(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitArgument) {
	 		listener.exitArgument(this);
		}
	}
}


export class FunctionDeclarationContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public ID(): TerminalNode {
		return this.getToken(scheduleParser.ID, 0);
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_functionDeclaration;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterFunctionDeclaration) {
	 		listener.enterFunctionDeclaration(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitFunctionDeclaration) {
	 		listener.exitFunctionDeclaration(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameter_list(): ParameterContext[] {
		return this.getTypedRuleContexts(ParameterContext) as ParameterContext[];
	}
	public parameter(i: number): ParameterContext {
		return this.getTypedRuleContext(ParameterContext, i) as ParameterContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_parameters;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterParameters) {
	 		listener.enterParameters(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitParameters) {
	 		listener.exitParameters(this);
		}
	}
}


export class ParameterContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public ID(): TerminalNode {
		return this.getToken(scheduleParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_parameter;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterParameter) {
	 		listener.enterParameter(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitParameter) {
	 		listener.exitParameter(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_typeName;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterTypeName) {
	 		listener.enterTypeName(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitTypeName) {
	 		listener.exitTypeName(this);
		}
	}
}


export class ArrayTypeContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_arrayType;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterArrayType) {
	 		listener.enterArrayType(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitArrayType) {
	 		listener.exitArrayType(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public task(): TaskContext {
		return this.getTypedRuleContext(TaskContext, 0) as TaskContext;
	}
	public dateLiteral(): DateLiteralContext {
		return this.getTypedRuleContext(DateLiteralContext, 0) as DateLiteralContext;
	}
	public dayLiteral(): DayLiteralContext {
		return this.getTypedRuleContext(DayLiteralContext, 0) as DayLiteralContext;
	}
	public timeLiteral(): TimeLiteralContext {
		return this.getTypedRuleContext(TimeLiteralContext, 0) as TimeLiteralContext;
	}
	public stringLiteral(): StringLiteralContext {
		return this.getTypedRuleContext(StringLiteralContext, 0) as StringLiteralContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_value;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterValue) {
	 		listener.enterValue(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitValue) {
	 		listener.exitValue(this);
		}
	}
}


export class ArrayValueContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public value_list(): ValueContext[] {
		return this.getTypedRuleContexts(ValueContext) as ValueContext[];
	}
	public value(i: number): ValueContext {
		return this.getTypedRuleContext(ValueContext, i) as ValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_arrayValue;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterArrayValue) {
	 		listener.enterArrayValue(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitArrayValue) {
	 		listener.exitArrayValue(this);
		}
	}
}


export class StringLiteralContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_stringLiteral;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterStringLiteral) {
	 		listener.enterStringLiteral(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitStringLiteral) {
	 		listener.exitStringLiteral(this);
		}
	}
}


export class DateLiteralContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DIGIT_list(): TerminalNode[] {
	    	return this.getTokens(scheduleParser.DIGIT);
	}
	public DIGIT(i: number): TerminalNode {
		return this.getToken(scheduleParser.DIGIT, i);
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_dateLiteral;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterDateLiteral) {
	 		listener.enterDateLiteral(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitDateLiteral) {
	 		listener.exitDateLiteral(this);
		}
	}
}


export class TimeLiteralContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DIGIT_list(): TerminalNode[] {
	    	return this.getTokens(scheduleParser.DIGIT);
	}
	public DIGIT(i: number): TerminalNode {
		return this.getToken(scheduleParser.DIGIT, i);
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_timeLiteral;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterTimeLiteral) {
	 		listener.enterTimeLiteral(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitTimeLiteral) {
	 		listener.exitTimeLiteral(this);
		}
	}
}


export class DayLiteralContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_dayLiteral;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterDayLiteral) {
	 		listener.enterDayLiteral(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitDayLiteral) {
	 		listener.exitDayLiteral(this);
		}
	}
}


export class TimeContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DIGIT_list(): TerminalNode[] {
	    	return this.getTokens(scheduleParser.DIGIT);
	}
	public DIGIT(i: number): TerminalNode {
		return this.getToken(scheduleParser.DIGIT, i);
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_time;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterTime) {
	 		listener.enterTime(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitTime) {
	 		listener.exitTime(this);
		}
	}
}


export class TimeRangeContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public time_list(): TimeContext[] {
		return this.getTypedRuleContexts(TimeContext) as TimeContext[];
	}
	public time(i: number): TimeContext {
		return this.getTypedRuleContext(TimeContext, i) as TimeContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_timeRange;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterTimeRange) {
	 		listener.enterTimeRange(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitTimeRange) {
	 		listener.exitTimeRange(this);
		}
	}
}


export class TaskContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public time(): TimeContext {
		return this.getTypedRuleContext(TimeContext, 0) as TimeContext;
	}
	public stringLiteral(): StringLiteralContext {
		return this.getTypedRuleContext(StringLiteralContext, 0) as StringLiteralContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_task;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterTask) {
	 		listener.enterTask(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitTask) {
	 		listener.exitTask(this);
		}
	}
}


export class CreateFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_createFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterCreateFunction) {
	 		listener.enterCreateFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitCreateFunction) {
	 		listener.exitCreateFunction(this);
		}
	}
}


export class RemoveFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_removeFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterRemoveFunction) {
	 		listener.enterRemoveFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitRemoveFunction) {
	 		listener.exitRemoveFunction(this);
		}
	}
}


export class UpdateFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
	public stringLiteral(): StringLiteralContext {
		return this.getTypedRuleContext(StringLiteralContext, 0) as StringLiteralContext;
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_updateFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterUpdateFunction) {
	 		listener.enterUpdateFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitUpdateFunction) {
	 		listener.exitUpdateFunction(this);
		}
	}
}


export class DeleteFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_deleteFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterDeleteFunction) {
	 		listener.enterDeleteFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitDeleteFunction) {
	 		listener.exitDeleteFunction(this);
		}
	}
}


export class SelectFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stringLiteral_list(): StringLiteralContext[] {
		return this.getTypedRuleContexts(StringLiteralContext) as StringLiteralContext[];
	}
	public stringLiteral(i: number): StringLiteralContext {
		return this.getTypedRuleContext(StringLiteralContext, i) as StringLiteralContext;
	}
	public value_list(): ValueContext[] {
		return this.getTypedRuleContexts(ValueContext) as ValueContext[];
	}
	public value(i: number): ValueContext {
		return this.getTypedRuleContext(ValueContext, i) as ValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_selectFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterSelectFunction) {
	 		listener.enterSelectFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitSelectFunction) {
	 		listener.exitSelectFunction(this);
		}
	}
}


export class PrintFunctionContext extends ParserRuleContext {
	constructor(parser?: scheduleParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayValue(): ArrayValueContext {
		return this.getTypedRuleContext(ArrayValueContext, 0) as ArrayValueContext;
	}
    public get ruleIndex(): number {
    	return scheduleParser.RULE_printFunction;
	}
	public enterRule(listener: scheduleListener): void {
	    if(listener.enterPrintFunction) {
	 		listener.enterPrintFunction(this);
		}
	}
	public exitRule(listener: scheduleListener): void {
	    if(listener.exitPrintFunction) {
	 		listener.exitPrintFunction(this);
		}
	}
}
