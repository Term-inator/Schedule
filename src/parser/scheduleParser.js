// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import scheduleListener from './scheduleListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0012\u0084\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002$\n\u0002",
    "\f\u0002\u000e\u0002\'\u000b\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u00056\n\u0005",
    "\u0003\u0005\u0003\u0005\u0005\u0005:\n\u0005\u0003\u0005\u0005\u0005",
    "=\n\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0005\u0007J\n\u0007\u0003\u0007\u0005\u0007M\n\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005\bW",
    "\n\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t",
    "\u0003\n\u0003\n\u0003\n\u0003\n\u0005\ne\n\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f",
    "\u0005\fp\n\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005\rw\n\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e~",
    "\n\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0002\u0002\u0010\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016",
    "\u0018\u001a\u001c\u0002\u0002\u0002\u0086\u0002%\u0003\u0002\u0002",
    "\u0002\u0004(\u0003\u0002\u0002\u0002\u0006,\u0003\u0002\u0002\u0002",
    "\b0\u0003\u0002\u0002\u0002\n@\u0003\u0002\u0002\u0002\fE\u0003\u0002",
    "\u0002\u0002\u000eV\u0003\u0002\u0002\u0002\u0010X\u0003\u0002\u0002",
    "\u0002\u0012d\u0003\u0002\u0002\u0002\u0014f\u0003\u0002\u0002\u0002",
    "\u0016o\u0003\u0002\u0002\u0002\u0018v\u0003\u0002\u0002\u0002\u001a",
    "}\u0003\u0002\u0002\u0002\u001c\u007f\u0003\u0002\u0002\u0002\u001e",
    "$\u0005\u0004\u0003\u0002\u001f$\u0005\u0006\u0004\u0002 $\u0005\b\u0005",
    "\u0002!$\u0005\n\u0006\u0002\"$\u0005\f\u0007\u0002#\u001e\u0003\u0002",
    "\u0002\u0002#\u001f\u0003\u0002\u0002\u0002# \u0003\u0002\u0002\u0002",
    "#!\u0003\u0002\u0002\u0002#\"\u0003\u0002\u0002\u0002$\'\u0003\u0002",
    "\u0002\u0002%#\u0003\u0002\u0002\u0002%&\u0003\u0002\u0002\u0002&\u0003",
    "\u0003\u0002\u0002\u0002\'%\u0003\u0002\u0002\u0002()\u0007\t\u0002",
    "\u0002)*\u0005\u000e\b\u0002*+\u0007\u0003\u0002\u0002+\u0005\u0003",
    "\u0002\u0002\u0002,-\u0007\n\u0002\u0002-.\u0005\u000e\b\u0002./\u0007",
    "\u0003\u0002\u0002/\u0007\u0003\u0002\u0002\u00020<\u0007\u000b\u0002",
    "\u000212\u0007\u000f\u0002\u00022=\u0005\u0016\f\u00023=\u0005\u0010",
    "\t\u000246\u0005\u0010\t\u000254\u0003\u0002\u0002\u000256\u0003\u0002",
    "\u0002\u000267\u0003\u0002\u0002\u00027=\u0005\u0012\n\u00028:\u0005",
    "\u0010\t\u000298\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:",
    ";\u0003\u0002\u0002\u0002;=\u0005\u001c\u000f\u0002<1\u0003\u0002\u0002",
    "\u0002<3\u0003\u0002\u0002\u0002<5\u0003\u0002\u0002\u0002<9\u0003\u0002",
    "\u0002\u0002=>\u0003\u0002\u0002\u0002>?\u0007\u0003\u0002\u0002?\t",
    "\u0003\u0002\u0002\u0002@A\u0007\f\u0002\u0002AB\u0007\u0010\u0002\u0002",
    "BC\u0007\u0010\u0002\u0002CD\u0007\u0003\u0002\u0002D\u000b\u0003\u0002",
    "\u0002\u0002EF\u0007\r\u0002\u0002FG\u0005\u0014\u000b\u0002GI\u0007",
    "\u000e\u0002\u0002HJ\u0007\u000f\u0002\u0002IH\u0003\u0002\u0002\u0002",
    "IJ\u0003\u0002\u0002\u0002JL\u0003\u0002\u0002\u0002KM\u0007\u0011\u0002",
    "\u0002LK\u0003\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002MN\u0003\u0002",
    "\u0002\u0002NO\u0005\u001c\u000f\u0002OP\u0007\u0003\u0002\u0002P\r",
    "\u0003\u0002\u0002\u0002QR\u0005\u0014\u000b\u0002RS\u0007\u0003\u0002",
    "\u0002ST\u0005\u000e\b\u0002TW\u0003\u0002\u0002\u0002UW\u0005\u0014",
    "\u000b\u0002VQ\u0003\u0002\u0002\u0002VU\u0003\u0002\u0002\u0002W\u000f",
    "\u0003\u0002\u0002\u0002XY\u0007\u0004\u0002\u0002YZ\u0007\u000f\u0002",
    "\u0002Z[\u0007\u0011\u0002\u0002[\\\u0007\u0005\u0002\u0002\\]\u0007",
    "\u000f\u0002\u0002]^\u0007\u0011\u0002\u0002^_\u0007\u0006\u0002\u0002",
    "_\u0011\u0003\u0002\u0002\u0002`a\u0007\u0010\u0002\u0002ab\u0007\u0005",
    "\u0002\u0002be\u0005\u0012\n\u0002ce\u0007\u0010\u0002\u0002d`\u0003",
    "\u0002\u0002\u0002dc\u0003\u0002\u0002\u0002e\u0013\u0003\u0002\u0002",
    "\u0002fg\u0007\u000f\u0002\u0002gh\u0005\u0016\f\u0002hi\u0005\u0018",
    "\r\u0002ij\u0007\u0010\u0002\u0002j\u0015\u0003\u0002\u0002\u0002kl",
    "\u0007\u0011\u0002\u0002lm\u0007\u0005\u0002\u0002mp\u0005\u0016\f\u0002",
    "np\u0007\u0011\u0002\u0002ok\u0003\u0002\u0002\u0002on\u0003\u0002\u0002",
    "\u0002p\u0017\u0003\u0002\u0002\u0002qr\u0005\u001c\u000f\u0002rs\u0007",
    "\u0005\u0002\u0002st\u0005\u001a\u000e\u0002tw\u0003\u0002\u0002\u0002",
    "uw\u0005\u001c\u000f\u0002vq\u0003\u0002\u0002\u0002vu\u0003\u0002\u0002",
    "\u0002w\u0019\u0003\u0002\u0002\u0002xy\u0005\u001c\u000f\u0002yz\u0007",
    "\u0005\u0002\u0002z{\u0005\u001a\u000e\u0002{~\u0003\u0002\u0002\u0002",
    "|~\u0005\u001c\u000f\u0002}x\u0003\u0002\u0002\u0002}|\u0003\u0002\u0002",
    "\u0002~\u001b\u0003\u0002\u0002\u0002\u007f\u0080\u0007\u0012\u0002",
    "\u0002\u0080\u0081\u0007\u0007\u0002\u0002\u0081\u0082\u0007\u0012\u0002",
    "\u0002\u0082\u001d\u0003\u0002\u0002\u0002\u000e#%59<ILVdov}"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class scheduleParser extends antlr4.Parser {

    static grammarFileName = "schedule.g4";
    static literalNames = [ null, "';'", "'('", "','", "')'", "'-'", null, 
                            "'add'", "'del'", "'delall'", "'rename'", "'ajust'", 
                            "'to'" ];
    static symbolicNames = [ null, null, null, null, null, null, "WS", "ADD", 
                             "DEL", "DELALL", "RENAME", "AJUST", "TO", "YEAR", 
                             "NAME", "DATE", "TIME" ];
    static ruleNames = [ "program", "addtasks", "deltasks", "delalltasks", 
                         "renametask", "ajusttask", "tasks", "daterange", 
                         "names", "task", "dates", "times", "timeranges", 
                         "timerange" ];

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
	        this.state = 35;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << scheduleParser.ADD) | (1 << scheduleParser.DEL) | (1 << scheduleParser.DELALL) | (1 << scheduleParser.RENAME) | (1 << scheduleParser.AJUST))) !== 0)) {
	            this.state = 33;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case scheduleParser.ADD:
	                this.state = 28;
	                this.addtasks();
	                break;
	            case scheduleParser.DEL:
	                this.state = 29;
	                this.deltasks();
	                break;
	            case scheduleParser.DELALL:
	                this.state = 30;
	                this.delalltasks();
	                break;
	            case scheduleParser.RENAME:
	                this.state = 31;
	                this.renametask();
	                break;
	            case scheduleParser.AJUST:
	                this.state = 32;
	                this.ajusttask();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 37;
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
	        this.state = 38;
	        this.match(scheduleParser.ADD);
	        this.state = 39;
	        this.tasks();
	        this.state = 40;
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
	        this.state = 42;
	        this.match(scheduleParser.DEL);
	        this.state = 43;
	        this.tasks();
	        this.state = 44;
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
	        this.state = 46;
	        this.match(scheduleParser.DELALL);
	        this.state = 58;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 47;
	            this.match(scheduleParser.YEAR);
	            this.state = 48;
	            this.dates();
	            break;

	        case 2:
	            this.state = 49;
	            this.daterange();
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
	            this.names();
	            break;

	        case 4:
	            this.state = 55;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===scheduleParser.T__1) {
	                this.state = 54;
	                this.daterange();
	            }

	            this.state = 57;
	            this.timerange();
	            break;

	        }
	        this.state = 60;
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



	renametask() {
	    let localctx = new RenametaskContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, scheduleParser.RULE_renametask);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 62;
	        this.match(scheduleParser.RENAME);
	        this.state = 63;
	        this.match(scheduleParser.NAME);
	        this.state = 64;
	        this.match(scheduleParser.NAME);
	        this.state = 65;
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



	ajusttask() {
	    let localctx = new AjusttaskContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, scheduleParser.RULE_ajusttask);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 67;
	        this.match(scheduleParser.AJUST);
	        this.state = 68;
	        this.task();
	        this.state = 69;
	        this.match(scheduleParser.TO);
	        this.state = 71;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===scheduleParser.YEAR) {
	            this.state = 70;
	            this.match(scheduleParser.YEAR);
	        }

	        this.state = 74;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===scheduleParser.DATE) {
	            this.state = 73;
	            this.match(scheduleParser.DATE);
	        }

	        this.state = 76;
	        this.timerange();
	        this.state = 77;
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



	tasks() {
	    let localctx = new TasksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, scheduleParser.RULE_tasks);
	    try {
	        this.state = 84;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 79;
	            this.task();
	            this.state = 80;
	            this.match(scheduleParser.T__0);
	            this.state = 81;
	            this.tasks();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 83;
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
	    this.enterRule(localctx, 14, scheduleParser.RULE_daterange);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 86;
	        this.match(scheduleParser.T__1);
	        this.state = 87;
	        this.match(scheduleParser.YEAR);
	        this.state = 88;
	        this.match(scheduleParser.DATE);
	        this.state = 89;
	        this.match(scheduleParser.T__2);
	        this.state = 90;
	        this.match(scheduleParser.YEAR);
	        this.state = 91;
	        this.match(scheduleParser.DATE);
	        this.state = 92;
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
	    this.enterRule(localctx, 16, scheduleParser.RULE_names);
	    try {
	        this.state = 98;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 94;
	            this.match(scheduleParser.NAME);
	            this.state = 95;
	            this.match(scheduleParser.T__2);
	            this.state = 96;
	            this.names();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 97;
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
	    this.enterRule(localctx, 18, scheduleParser.RULE_task);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 100;
	        this.match(scheduleParser.YEAR);
	        this.state = 101;
	        this.dates();
	        this.state = 102;
	        this.times();
	        this.state = 103;
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



	dates() {
	    let localctx = new DatesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, scheduleParser.RULE_dates);
	    try {
	        this.state = 109;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 105;
	            this.match(scheduleParser.DATE);
	            this.state = 106;
	            this.match(scheduleParser.T__2);
	            this.state = 107;
	            this.dates();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 108;
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
	    this.enterRule(localctx, 22, scheduleParser.RULE_times);
	    try {
	        this.state = 116;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 111;
	            this.timerange();
	            this.state = 112;
	            this.match(scheduleParser.T__2);
	            this.state = 113;
	            this.timeranges();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 115;
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
	    this.enterRule(localctx, 24, scheduleParser.RULE_timeranges);
	    try {
	        this.state = 123;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 118;
	            this.timerange();
	            this.state = 119;
	            this.match(scheduleParser.T__2);
	            this.state = 120;
	            this.timeranges();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 122;
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
	    this.enterRule(localctx, 26, scheduleParser.RULE_timerange);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 125;
	        this.match(scheduleParser.TIME);
	        this.state = 126;
	        this.match(scheduleParser.T__4);
	        this.state = 127;
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
scheduleParser.WS = 6;
scheduleParser.ADD = 7;
scheduleParser.DEL = 8;
scheduleParser.DELALL = 9;
scheduleParser.RENAME = 10;
scheduleParser.AJUST = 11;
scheduleParser.TO = 12;
scheduleParser.YEAR = 13;
scheduleParser.NAME = 14;
scheduleParser.DATE = 15;
scheduleParser.TIME = 16;

scheduleParser.RULE_program = 0;
scheduleParser.RULE_addtasks = 1;
scheduleParser.RULE_deltasks = 2;
scheduleParser.RULE_delalltasks = 3;
scheduleParser.RULE_renametask = 4;
scheduleParser.RULE_ajusttask = 5;
scheduleParser.RULE_tasks = 6;
scheduleParser.RULE_daterange = 7;
scheduleParser.RULE_names = 8;
scheduleParser.RULE_task = 9;
scheduleParser.RULE_dates = 10;
scheduleParser.RULE_times = 11;
scheduleParser.RULE_timeranges = 12;
scheduleParser.RULE_timerange = 13;

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

	ajusttask = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AjusttaskContext);
	    } else {
	        return this.getTypedRuleContext(AjusttaskContext,i);
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

	daterange() {
	    return this.getTypedRuleContext(DaterangeContext,0);
	};

	names() {
	    return this.getTypedRuleContext(NamesContext,0);
	};

	timerange() {
	    return this.getTypedRuleContext(TimerangeContext,0);
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

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(scheduleParser.NAME);
	    } else {
	        return this.getToken(scheduleParser.NAME, i);
	    }
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



class AjusttaskContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_ajusttask;
    }

	AJUST() {
	    return this.getToken(scheduleParser.AJUST, 0);
	};

	task() {
	    return this.getTypedRuleContext(TaskContext,0);
	};

	TO() {
	    return this.getToken(scheduleParser.TO, 0);
	};

	timerange() {
	    return this.getTypedRuleContext(TimerangeContext,0);
	};

	YEAR() {
	    return this.getToken(scheduleParser.YEAR, 0);
	};

	DATE() {
	    return this.getToken(scheduleParser.DATE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterAjusttask(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitAjusttask(this);
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
scheduleParser.AjusttaskContext = AjusttaskContext; 
scheduleParser.TasksContext = TasksContext; 
scheduleParser.DaterangeContext = DaterangeContext; 
scheduleParser.NamesContext = NamesContext; 
scheduleParser.TaskContext = TaskContext; 
scheduleParser.DatesContext = DatesContext; 
scheduleParser.TimesContext = TimesContext; 
scheduleParser.TimerangesContext = TimerangesContext; 
scheduleParser.TimerangeContext = TimerangeContext; 
