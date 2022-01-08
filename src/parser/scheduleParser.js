// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import scheduleListener from './scheduleListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u000fr\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0007\u0002!\n\u0002\f\u0002\u000e\u0002$\u000b\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005",
    "\u00052\n\u0005\u0003\u0005\u0003\u0005\u0005\u00056\n\u0005\u0003\u0005",
    "\u0005\u00059\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007",
    "D\n\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\t\u0003\t\u0003\t\u0003\t\u0005\tR\n\t\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0005\u000b^\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f",
    "\u0005\fe\n\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005\rl\n\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0002\u0002\u000f",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u0002",
    "\u0002\u0002q\u0002\"\u0003\u0002\u0002\u0002\u0004%\u0003\u0002\u0002",
    "\u0002\u0006)\u0003\u0002\u0002\u0002\b-\u0003\u0002\u0002\u0002\n:",
    "\u0003\u0002\u0002\u0002\fC\u0003\u0002\u0002\u0002\u000eE\u0003\u0002",
    "\u0002\u0002\u0010Q\u0003\u0002\u0002\u0002\u0012S\u0003\u0002\u0002",
    "\u0002\u0014]\u0003\u0002\u0002\u0002\u0016d\u0003\u0002\u0002\u0002",
    "\u0018k\u0003\u0002\u0002\u0002\u001am\u0003\u0002\u0002\u0002\u001c",
    "!\u0005\u0004\u0003\u0002\u001d!\u0005\u0006\u0004\u0002\u001e!\u0005",
    "\b\u0005\u0002\u001f!\u0005\n\u0006\u0002 \u001c\u0003\u0002\u0002\u0002",
    " \u001d\u0003\u0002\u0002\u0002 \u001e\u0003\u0002\u0002\u0002 \u001f",
    "\u0003\u0002\u0002\u0002!$\u0003\u0002\u0002\u0002\" \u0003\u0002\u0002",
    "\u0002\"#\u0003\u0002\u0002\u0002#\u0003\u0003\u0002\u0002\u0002$\"",
    "\u0003\u0002\u0002\u0002%&\u0007\b\u0002\u0002&\'\u0005\f\u0007\u0002",
    "\'(\u0007\u0003\u0002\u0002(\u0005\u0003\u0002\u0002\u0002)*\u0007\t",
    "\u0002\u0002*+\u0005\f\u0007\u0002+,\u0007\u0003\u0002\u0002,\u0007",
    "\u0003\u0002\u0002\u0002-8\u0007\n\u0002\u0002./\u0007\f\u0002\u0002",
    "/9\u0005\u0014\u000b\u000202\u0005\u000e\b\u000210\u0003\u0002\u0002",
    "\u000212\u0003\u0002\u0002\u000223\u0003\u0002\u0002\u000239\u0005\u0010",
    "\t\u000246\u0005\u000e\b\u000254\u0003\u0002\u0002\u000256\u0003\u0002",
    "\u0002\u000267\u0003\u0002\u0002\u000279\u0005\u001a\u000e\u00028.\u0003",
    "\u0002\u0002\u000281\u0003\u0002\u0002\u000285\u0003\u0002\u0002\u0002",
    "9\t\u0003\u0002\u0002\u0002:;\u0007\u000b\u0002\u0002;<\u0005\u0012",
    "\n\u0002<=\u0007\r\u0002\u0002=\u000b\u0003\u0002\u0002\u0002>?\u0005",
    "\u0012\n\u0002?@\u0007\u0003\u0002\u0002@A\u0005\f\u0007\u0002AD\u0003",
    "\u0002\u0002\u0002BD\u0005\u0012\n\u0002C>\u0003\u0002\u0002\u0002C",
    "B\u0003\u0002\u0002\u0002D\r\u0003\u0002\u0002\u0002EF\u0007\u0004\u0002",
    "\u0002FG\u0007\f\u0002\u0002GH\u0007\u000e\u0002\u0002HI\u0007\u0005",
    "\u0002\u0002IJ\u0007\f\u0002\u0002JK\u0007\u000e\u0002\u0002KL\u0007",
    "\u0006\u0002\u0002L\u000f\u0003\u0002\u0002\u0002MN\u0007\r\u0002\u0002",
    "NO\u0007\u0005\u0002\u0002OR\u0005\u0010\t\u0002PR\u0007\r\u0002\u0002",
    "QM\u0003\u0002\u0002\u0002QP\u0003\u0002\u0002\u0002R\u0011\u0003\u0002",
    "\u0002\u0002ST\u0007\f\u0002\u0002TU\u0005\u0014\u000b\u0002UV\u0005",
    "\u0016\f\u0002VW\u0007\r\u0002\u0002WX\u0007\u0003\u0002\u0002X\u0013",
    "\u0003\u0002\u0002\u0002YZ\u0007\u000e\u0002\u0002Z[\u0007\u0005\u0002",
    "\u0002[^\u0005\u0014\u000b\u0002\\^\u0007\u000e\u0002\u0002]Y\u0003",
    "\u0002\u0002\u0002]\\\u0003\u0002\u0002\u0002^\u0015\u0003\u0002\u0002",
    "\u0002_`\u0005\u001a\u000e\u0002`a\u0007\u0005\u0002\u0002ab\u0005\u0018",
    "\r\u0002be\u0003\u0002\u0002\u0002ce\u0005\u001a\u000e\u0002d_\u0003",
    "\u0002\u0002\u0002dc\u0003\u0002\u0002\u0002e\u0017\u0003\u0002\u0002",
    "\u0002fg\u0005\u001a\u000e\u0002gh\u0007\u0005\u0002\u0002hi\u0005\u0018",
    "\r\u0002il\u0003\u0002\u0002\u0002jl\u0005\u001a\u000e\u0002kf\u0003",
    "\u0002\u0002\u0002kj\u0003\u0002\u0002\u0002l\u0019\u0003\u0002\u0002",
    "\u0002mn\u0007\u000f\u0002\u0002no\u0007\u0007\u0002\u0002op\u0007\u000f",
    "\u0002\u0002p\u001b\u0003\u0002\u0002\u0002\f \"158CQ]dk"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class scheduleParser extends antlr4.Parser {

    static grammarFileName = "schedule.g4";
    static literalNames = [ null, "';'", "'('", "','", "')'", "'-'", "'add'", 
                            "'del'", "'delall'", "'rename'" ];
    static symbolicNames = [ null, null, null, null, null, null, "ADD", 
                             "DEL", "DELALL", "RENAME", "YEAR", "NAME", 
                             "DATE", "TIME" ];
    static ruleNames = [ "program", "addtasks", "deltasks", "delalltasks", 
                         "renametask", "tasks", "daterange", "names", "task", 
                         "dates", "times", "timeranges", "timerange" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = scheduleParser.ruleNames;
        this.literalNames = scheduleParser.literalNames;
        this.symbolicNames = scheduleParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, scheduleParser.RULE_program);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 32;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << scheduleParser.ADD) | (1 << scheduleParser.DEL) | (1 << scheduleParser.DELALL) | (1 << scheduleParser.RENAME))) !== 0)) {
	            this.state = 30;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case scheduleParser.ADD:
	                this.state = 26;
	                this.addtasks();
	                break;
	            case scheduleParser.DEL:
	                this.state = 27;
	                this.deltasks();
	                break;
	            case scheduleParser.DELALL:
	                this.state = 28;
	                this.delalltasks();
	                break;
	            case scheduleParser.RENAME:
	                this.state = 29;
	                this.renametask();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 34;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	addtasks() {
	    let localctx = new AddtasksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, scheduleParser.RULE_addtasks);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 35;
	        this.match(scheduleParser.ADD);
	        this.state = 36;
	        this.tasks();
	        this.state = 37;
	        this.match(scheduleParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	deltasks() {
	    let localctx = new DeltasksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, scheduleParser.RULE_deltasks);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 39;
	        this.match(scheduleParser.DEL);
	        this.state = 40;
	        this.tasks();
	        this.state = 41;
	        this.match(scheduleParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	delalltasks() {
	    let localctx = new DelalltasksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, scheduleParser.RULE_delalltasks);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 43;
	        this.match(scheduleParser.DELALL);
	        this.state = 54;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 44;
	            this.match(scheduleParser.YEAR);
	            this.state = 45;
	            this.dates();
	            break;

	        case 2:
	            this.state = 47;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===scheduleParser.T__1) {
	                this.state = 46;
	                this.daterange();
	            }

	            this.state = 49;
	            this.names();
	            break;

	        case 3:
	            this.state = 51;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===scheduleParser.T__1) {
	                this.state = 50;
	                this.daterange();
	            }

	            this.state = 53;
	            this.timerange();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	renametask() {
	    let localctx = new RenametaskContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, scheduleParser.RULE_renametask);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 56;
	        this.match(scheduleParser.RENAME);
	        this.state = 57;
	        this.task();
	        this.state = 58;
	        this.match(scheduleParser.NAME);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	tasks() {
	    let localctx = new TasksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, scheduleParser.RULE_tasks);
	    try {
	        this.state = 65;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 60;
	            this.task();
	            this.state = 61;
	            this.match(scheduleParser.T__0);
	            this.state = 62;
	            this.tasks();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 64;
	            this.task();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	daterange() {
	    let localctx = new DaterangeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, scheduleParser.RULE_daterange);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 67;
	        this.match(scheduleParser.T__1);
	        this.state = 68;
	        this.match(scheduleParser.YEAR);
	        this.state = 69;
	        this.match(scheduleParser.DATE);
	        this.state = 70;
	        this.match(scheduleParser.T__2);
	        this.state = 71;
	        this.match(scheduleParser.YEAR);
	        this.state = 72;
	        this.match(scheduleParser.DATE);
	        this.state = 73;
	        this.match(scheduleParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	names() {
	    let localctx = new NamesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, scheduleParser.RULE_names);
	    try {
	        this.state = 79;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 75;
	            this.match(scheduleParser.NAME);
	            this.state = 76;
	            this.match(scheduleParser.T__2);
	            this.state = 77;
	            this.names();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 78;
	            this.match(scheduleParser.NAME);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	task() {
	    let localctx = new TaskContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, scheduleParser.RULE_task);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 81;
	        this.match(scheduleParser.YEAR);
	        this.state = 82;
	        this.dates();
	        this.state = 83;
	        this.times();
	        this.state = 84;
	        this.match(scheduleParser.NAME);
	        this.state = 85;
	        this.match(scheduleParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	dates() {
	    let localctx = new DatesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, scheduleParser.RULE_dates);
	    try {
	        this.state = 91;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 87;
	            this.match(scheduleParser.DATE);
	            this.state = 88;
	            this.match(scheduleParser.T__2);
	            this.state = 89;
	            this.dates();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 90;
	            this.match(scheduleParser.DATE);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	times() {
	    let localctx = new TimesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, scheduleParser.RULE_times);
	    try {
	        this.state = 98;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 93;
	            this.timerange();
	            this.state = 94;
	            this.match(scheduleParser.T__2);
	            this.state = 95;
	            this.timeranges();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 97;
	            this.timerange();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	timeranges() {
	    let localctx = new TimerangesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, scheduleParser.RULE_timeranges);
	    try {
	        this.state = 105;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 100;
	            this.timerange();
	            this.state = 101;
	            this.match(scheduleParser.T__2);
	            this.state = 102;
	            this.timeranges();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 104;
	            this.timerange();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	timerange() {
	    let localctx = new TimerangeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, scheduleParser.RULE_timerange);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 107;
	        this.match(scheduleParser.TIME);
	        this.state = 108;
	        this.match(scheduleParser.T__4);
	        this.state = 109;
	        this.match(scheduleParser.TIME);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

scheduleParser.EOF = antlr4.Token.EOF;
scheduleParser.T__0 = 1;
scheduleParser.T__1 = 2;
scheduleParser.T__2 = 3;
scheduleParser.T__3 = 4;
scheduleParser.T__4 = 5;
scheduleParser.ADD = 6;
scheduleParser.DEL = 7;
scheduleParser.DELALL = 8;
scheduleParser.RENAME = 9;
scheduleParser.YEAR = 10;
scheduleParser.NAME = 11;
scheduleParser.DATE = 12;
scheduleParser.TIME = 13;

scheduleParser.RULE_program = 0;
scheduleParser.RULE_addtasks = 1;
scheduleParser.RULE_deltasks = 2;
scheduleParser.RULE_delalltasks = 3;
scheduleParser.RULE_renametask = 4;
scheduleParser.RULE_tasks = 5;
scheduleParser.RULE_daterange = 6;
scheduleParser.RULE_names = 7;
scheduleParser.RULE_task = 8;
scheduleParser.RULE_dates = 9;
scheduleParser.RULE_times = 10;
scheduleParser.RULE_timeranges = 11;
scheduleParser.RULE_timerange = 12;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_program;
    }

	addtasks = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AddtasksContext);
	    } else {
	        return this.getTypedRuleContext(AddtasksContext,i);
	    }
	};

	deltasks = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DeltasksContext);
	    } else {
	        return this.getTypedRuleContext(DeltasksContext,i);
	    }
	};

	delalltasks = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DelalltasksContext);
	    } else {
	        return this.getTypedRuleContext(DelalltasksContext,i);
	    }
	};

	renametask = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(RenametaskContext);
	    } else {
	        return this.getTypedRuleContext(RenametaskContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitProgram(this);
		}
	}


}



class AddtasksContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_addtasks;
    }

	ADD() {
	    return this.getToken(scheduleParser.ADD, 0);
	};

	tasks() {
	    return this.getTypedRuleContext(TasksContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterAddtasks(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitAddtasks(this);
		}
	}


}



class DeltasksContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_deltasks;
    }

	DEL() {
	    return this.getToken(scheduleParser.DEL, 0);
	};

	tasks() {
	    return this.getTypedRuleContext(TasksContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterDeltasks(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitDeltasks(this);
		}
	}


}



class DelalltasksContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_delalltasks;
    }

	DELALL() {
	    return this.getToken(scheduleParser.DELALL, 0);
	};

	YEAR() {
	    return this.getToken(scheduleParser.YEAR, 0);
	};

	dates() {
	    return this.getTypedRuleContext(DatesContext,0);
	};

	names() {
	    return this.getTypedRuleContext(NamesContext,0);
	};

	timerange() {
	    return this.getTypedRuleContext(TimerangeContext,0);
	};

	daterange() {
	    return this.getTypedRuleContext(DaterangeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterDelalltasks(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitDelalltasks(this);
		}
	}


}



class RenametaskContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_renametask;
    }

	RENAME() {
	    return this.getToken(scheduleParser.RENAME, 0);
	};

	task() {
	    return this.getTypedRuleContext(TaskContext,0);
	};

	NAME() {
	    return this.getToken(scheduleParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterRenametask(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitRenametask(this);
		}
	}


}



class TasksContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_tasks;
    }

	task() {
	    return this.getTypedRuleContext(TaskContext,0);
	};

	tasks() {
	    return this.getTypedRuleContext(TasksContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterTasks(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitTasks(this);
		}
	}


}



class DaterangeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_daterange;
    }

	YEAR = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(scheduleParser.YEAR);
	    } else {
	        return this.getToken(scheduleParser.YEAR, i);
	    }
	};


	DATE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(scheduleParser.DATE);
	    } else {
	        return this.getToken(scheduleParser.DATE, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterDaterange(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitDaterange(this);
		}
	}


}



class NamesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_names;
    }

	NAME() {
	    return this.getToken(scheduleParser.NAME, 0);
	};

	names() {
	    return this.getTypedRuleContext(NamesContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterNames(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitNames(this);
		}
	}


}



class TaskContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_task;
    }

	YEAR() {
	    return this.getToken(scheduleParser.YEAR, 0);
	};

	dates() {
	    return this.getTypedRuleContext(DatesContext,0);
	};

	times() {
	    return this.getTypedRuleContext(TimesContext,0);
	};

	NAME() {
	    return this.getToken(scheduleParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterTask(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitTask(this);
		}
	}


}



class DatesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_dates;
    }

	DATE() {
	    return this.getToken(scheduleParser.DATE, 0);
	};

	dates() {
	    return this.getTypedRuleContext(DatesContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterDates(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitDates(this);
		}
	}


}



class TimesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_times;
    }

	timerange() {
	    return this.getTypedRuleContext(TimerangeContext,0);
	};

	timeranges() {
	    return this.getTypedRuleContext(TimerangesContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterTimes(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitTimes(this);
		}
	}


}



class TimerangesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_timeranges;
    }

	timerange() {
	    return this.getTypedRuleContext(TimerangeContext,0);
	};

	timeranges() {
	    return this.getTypedRuleContext(TimerangesContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterTimeranges(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitTimeranges(this);
		}
	}


}



class TimerangeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_timerange;
    }

	TIME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(scheduleParser.TIME);
	    } else {
	        return this.getToken(scheduleParser.TIME, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterTimerange(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitTimerange(this);
		}
	}


}




scheduleParser.ProgramContext = ProgramContext; 
scheduleParser.AddtasksContext = AddtasksContext; 
scheduleParser.DeltasksContext = DeltasksContext; 
scheduleParser.DelalltasksContext = DelalltasksContext; 
scheduleParser.RenametaskContext = RenametaskContext; 
scheduleParser.TasksContext = TasksContext; 
scheduleParser.DaterangeContext = DaterangeContext; 
scheduleParser.NamesContext = NamesContext; 
scheduleParser.TaskContext = TaskContext; 
scheduleParser.DatesContext = DatesContext; 
scheduleParser.TimesContext = TimesContext; 
scheduleParser.TimerangesContext = TimerangesContext; 
scheduleParser.TimerangeContext = TimerangeContext; 
