// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import scheduleListener from './scheduleListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0016\u009d\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0007\u0002&\n\u0002\f\u0002\u000e\u0002)\u000b\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0005\u00043\n\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005<\n\u0005\u0003",
    "\u0005\u0003\u0005\u0005\u0005@\n\u0005\u0003\u0005\u0005\u0005C\n\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0005\u0006K\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007T\n\u0007\u0003\u0007",
    "\u0003\u0007\u0005\u0007X\n\u0007\u0003\u0007\u0005\u0007[\n\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0005",
    "\bd\n\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\tk\n\t\u0003\n",
    "\u0003\n\u0003\n\u0003\n\u0005\nq\n\n\u0005\ns\n\n\u0003\n\u0003\n\u0003",
    "\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0005",
    "\f\u0084\n\f\u0003\r\u0003\r\u0003\r\u0003\r\u0005\r\u008a\n\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000e\u0091",
    "\n\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010\u009b\n\u0010\u0003",
    "\u0010\u0002\u0002\u0011\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e\u0002\u0002\u0002\u00a4\u0002\'\u0003",
    "\u0002\u0002\u0002\u0004*\u0003\u0002\u0002\u0002\u0006.\u0003\u0002",
    "\u0002\u0002\b6\u0003\u0002\u0002\u0002\nF\u0003\u0002\u0002\u0002\f",
    "O\u0003\u0002\u0002\u0002\u000ec\u0003\u0002\u0002\u0002\u0010j\u0003",
    "\u0002\u0002\u0002\u0012r\u0003\u0002\u0002\u0002\u0014w\u0003\u0002",
    "\u0002\u0002\u0016\u0083\u0003\u0002\u0002\u0002\u0018\u0089\u0003\u0002",
    "\u0002\u0002\u001a\u0090\u0003\u0002\u0002\u0002\u001c\u0092\u0003\u0002",
    "\u0002\u0002\u001e\u009a\u0003\u0002\u0002\u0002 &\u0005\u0004\u0003",
    "\u0002!&\u0005\u0006\u0004\u0002\"&\u0005\b\u0005\u0002#&\u0005\n\u0006",
    "\u0002$&\u0005\f\u0007\u0002% \u0003\u0002\u0002\u0002%!\u0003\u0002",
    "\u0002\u0002%\"\u0003\u0002\u0002\u0002%#\u0003\u0002\u0002\u0002%$",
    "\u0003\u0002\u0002\u0002&)\u0003\u0002\u0002\u0002\'%\u0003\u0002\u0002",
    "\u0002\'(\u0003\u0002\u0002\u0002(\u0003\u0003\u0002\u0002\u0002)\'",
    "\u0003\u0002\u0002\u0002*+\u0007\u000b\u0002\u0002+,\u0005\u0010\t\u0002",
    ",-\u0007\u0003\u0002\u0002-\u0005\u0003\u0002\u0002\u0002.2\u0007\f",
    "\u0002\u0002/0\u0007\n\u0002\u000203\u0005\u000e\b\u000213\u0005\u0010",
    "\t\u00022/\u0003\u0002\u0002\u000221\u0003\u0002\u0002\u000234\u0003",
    "\u0002\u0002\u000245\u0007\u0003\u0002\u00025\u0007\u0003\u0002\u0002",
    "\u00026B\u0007\r\u0002\u000278\u0007\u0011\u0002\u00028C\u0005\u0018",
    "\r\u00029C\u0005\u0014\u000b\u0002:<\u0005\u0014\u000b\u0002;:\u0003",
    "\u0002\u0002\u0002;<\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002",
    "=C\u0005\u0016\f\u0002>@\u0005\u0014\u000b\u0002?>\u0003\u0002\u0002",
    "\u0002?@\u0003\u0002\u0002\u0002@A\u0003\u0002\u0002\u0002AC\u0005\u001a",
    "\u000e\u0002B7\u0003\u0002\u0002\u0002B9\u0003\u0002\u0002\u0002B;\u0003",
    "\u0002\u0002\u0002B?\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002",
    "DE\u0007\u0003\u0002\u0002E\t\u0003\u0002\u0002\u0002FJ\u0007\u000e",
    "\u0002\u0002GK\u0007\u0013\u0002\u0002HI\u0007\n\u0002\u0002IK\u0007",
    "\u0016\u0002\u0002JG\u0003\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002",
    "KL\u0003\u0002\u0002\u0002LM\u0007\u0013\u0002\u0002MN\u0007\u0003\u0002",
    "\u0002N\u000b\u0003\u0002\u0002\u0002OS\u0007\u000f\u0002\u0002PT\u0005",
    "\u0012\n\u0002QR\u0007\n\u0002\u0002RT\u0007\u0016\u0002\u0002SP\u0003",
    "\u0002\u0002\u0002SQ\u0003\u0002\u0002\u0002TU\u0003\u0002\u0002\u0002",
    "UW\u0007\u0010\u0002\u0002VX\u0007\u0011\u0002\u0002WV\u0003\u0002\u0002",
    "\u0002WX\u0003\u0002\u0002\u0002XZ\u0003\u0002\u0002\u0002Y[\u0007\u0014",
    "\u0002\u0002ZY\u0003\u0002\u0002\u0002Z[\u0003\u0002\u0002\u0002[\\",
    "\u0003\u0002\u0002\u0002\\]\u0005\u001c\u000f\u0002]^\u0007\u0003\u0002",
    "\u0002^\r\u0003\u0002\u0002\u0002_`\u0007\u0016\u0002\u0002`a\u0007",
    "\u0004\u0002\u0002ad\u0005\u000e\b\u0002bd\u0007\u0016\u0002\u0002c",
    "_\u0003\u0002\u0002\u0002cb\u0003\u0002\u0002\u0002d\u000f\u0003\u0002",
    "\u0002\u0002ef\u0005\u0012\n\u0002fg\u0007\u0005\u0002\u0002gh\u0005",
    "\u0010\t\u0002hk\u0003\u0002\u0002\u0002ik\u0005\u0012\n\u0002je\u0003",
    "\u0002\u0002\u0002ji\u0003\u0002\u0002\u0002k\u0011\u0003\u0002\u0002",
    "\u0002lm\u0007\u0011\u0002\u0002ms\u0005\u0018\r\u0002np\u0005\u0014",
    "\u000b\u0002oq\u0005\u001e\u0010\u0002po\u0003\u0002\u0002\u0002pq\u0003",
    "\u0002\u0002\u0002qs\u0003\u0002\u0002\u0002rl\u0003\u0002\u0002\u0002",
    "rn\u0003\u0002\u0002\u0002st\u0003\u0002\u0002\u0002tu\u0005\u001a\u000e",
    "\u0002uv\u0007\u0013\u0002\u0002v\u0013\u0003\u0002\u0002\u0002wx\u0007",
    "\u0006\u0002\u0002xy\u0007\u0011\u0002\u0002yz\u0007\u0014\u0002\u0002",
    "z{\u0007\u0004\u0002\u0002{|\u0007\u0011\u0002\u0002|}\u0007\u0014\u0002",
    "\u0002}~\u0007\u0007\u0002\u0002~\u0015\u0003\u0002\u0002\u0002\u007f",
    "\u0080\u0007\u0013\u0002\u0002\u0080\u0081\u0007\u0004\u0002\u0002\u0081",
    "\u0084\u0005\u0016\f\u0002\u0082\u0084\u0007\u0013\u0002\u0002\u0083",
    "\u007f\u0003\u0002\u0002\u0002\u0083\u0082\u0003\u0002\u0002\u0002\u0084",
    "\u0017\u0003\u0002\u0002\u0002\u0085\u0086\u0007\u0014\u0002\u0002\u0086",
    "\u0087\u0007\u0004\u0002\u0002\u0087\u008a\u0005\u0018\r\u0002\u0088",
    "\u008a\u0007\u0014\u0002\u0002\u0089\u0085\u0003\u0002\u0002\u0002\u0089",
    "\u0088\u0003\u0002\u0002\u0002\u008a\u0019\u0003\u0002\u0002\u0002\u008b",
    "\u008c\u0005\u001c\u000f\u0002\u008c\u008d\u0007\u0004\u0002\u0002\u008d",
    "\u008e\u0005\u001a\u000e\u0002\u008e\u0091\u0003\u0002\u0002\u0002\u008f",
    "\u0091\u0005\u001c\u000f\u0002\u0090\u008b\u0003\u0002\u0002\u0002\u0090",
    "\u008f\u0003\u0002\u0002\u0002\u0091\u001b\u0003\u0002\u0002\u0002\u0092",
    "\u0093\u0007\u0015\u0002\u0002\u0093\u0094\u0007\b\u0002\u0002\u0094",
    "\u0095\u0007\u0015\u0002\u0002\u0095\u001d\u0003\u0002\u0002\u0002\u0096",
    "\u0097\u0007\u0012\u0002\u0002\u0097\u0098\u0007\u0004\u0002\u0002\u0098",
    "\u009b\u0005\u001e\u0010\u0002\u0099\u009b\u0007\u0012\u0002\u0002\u009a",
    "\u0096\u0003\u0002\u0002\u0002\u009a\u0099\u0003\u0002\u0002\u0002\u009b",
    "\u001f\u0003\u0002\u0002\u0002\u0014%\'2;?BJSWZcjpr\u0083\u0089\u0090",
    "\u009a"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class scheduleParser extends antlr4.Parser {

    static grammarFileName = "schedule.g4";
    static literalNames = [ null, "';'", "','", "'&'", "'('", "')'", "'-'", 
                            null, "'id'", "'add'", "'del'", "'delall'", 
                            "'rename'", "'ajust'", "'to'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, "WS", 
                             "ID", "ADD", "DEL", "DELALL", "RENAME", "AJUST", 
                             "TO", "YEAR", "WEEKDAY", "NAME", "DATE", "TIME", 
                             "IDENTIFIER" ];
    static ruleNames = [ "program", "addtasks", "deltasks", "delalltasks", 
                         "renametask", "ajusttask", "identifiers", "tasks", 
                         "task", "daterange", "names", "dates", "timeranges", 
                         "timerange", "weekdays" ];

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
	        this.state = 37;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << scheduleParser.ADD) | (1 << scheduleParser.DEL) | (1 << scheduleParser.DELALL) | (1 << scheduleParser.RENAME) | (1 << scheduleParser.AJUST))) !== 0)) {
	            this.state = 35;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case scheduleParser.ADD:
	                this.state = 30;
	                this.addtasks();
	                break;
	            case scheduleParser.DEL:
	                this.state = 31;
	                this.deltasks();
	                break;
	            case scheduleParser.DELALL:
	                this.state = 32;
	                this.delalltasks();
	                break;
	            case scheduleParser.RENAME:
	                this.state = 33;
	                this.renametask();
	                break;
	            case scheduleParser.AJUST:
	                this.state = 34;
	                this.ajusttask();
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 39;
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
	        this.state = 40;
	        this.match(scheduleParser.ADD);
	        this.state = 41;
	        this.tasks();
	        this.state = 42;
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
	        this.state = 44;
	        this.match(scheduleParser.DEL);
	        this.state = 48;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case scheduleParser.ID:
	            this.state = 45;
	            this.match(scheduleParser.ID);
	            this.state = 46;
	            this.identifiers();
	            break;
	        case scheduleParser.T__3:
	        case scheduleParser.YEAR:
	            this.state = 47;
	            this.tasks();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 50;
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
	        this.state = 52;
	        this.match(scheduleParser.DELALL);
	        this.state = 64;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 53;
	            this.match(scheduleParser.YEAR);
	            this.state = 54;
	            this.dates();
	            break;

	        case 2:
	            this.state = 55;
	            this.daterange();
	            break;

	        case 3:
	            this.state = 57;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===scheduleParser.T__3) {
	                this.state = 56;
	                this.daterange();
	            }

	            this.state = 59;
	            this.names();
	            break;

	        case 4:
	            this.state = 61;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===scheduleParser.T__3) {
	                this.state = 60;
	                this.daterange();
	            }

	            this.state = 63;
	            this.timeranges();
	            break;

	        }
	        this.state = 66;
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
	        this.state = 68;
	        this.match(scheduleParser.RENAME);
	        this.state = 72;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case scheduleParser.NAME:
	            this.state = 69;
	            this.match(scheduleParser.NAME);
	            break;
	        case scheduleParser.ID:
	            this.state = 70;
	            this.match(scheduleParser.ID);
	            this.state = 71;
	            this.match(scheduleParser.IDENTIFIER);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 74;
	        this.match(scheduleParser.NAME);
	        this.state = 75;
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
	        this.state = 77;
	        this.match(scheduleParser.AJUST);
	        this.state = 81;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case scheduleParser.T__3:
	        case scheduleParser.YEAR:
	            this.state = 78;
	            this.task();
	            break;
	        case scheduleParser.ID:
	            this.state = 79;
	            this.match(scheduleParser.ID);
	            this.state = 80;
	            this.match(scheduleParser.IDENTIFIER);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 83;
	        this.match(scheduleParser.TO);
	        this.state = 85;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===scheduleParser.YEAR) {
	            this.state = 84;
	            this.match(scheduleParser.YEAR);
	        }

	        this.state = 88;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===scheduleParser.DATE) {
	            this.state = 87;
	            this.match(scheduleParser.DATE);
	        }

	        this.state = 90;
	        this.timerange();
	        this.state = 91;
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



	identifiers() {
	    let localctx = new IdentifiersContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, scheduleParser.RULE_identifiers);
	    try {
	        this.state = 97;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 93;
	            this.match(scheduleParser.IDENTIFIER);
	            this.state = 94;
	            this.match(scheduleParser.T__1);
	            this.state = 95;
	            this.identifiers();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 96;
	            this.match(scheduleParser.IDENTIFIER);
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



	tasks() {
	    let localctx = new TasksContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, scheduleParser.RULE_tasks);
	    try {
	        this.state = 104;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 99;
	            this.task();
	            this.state = 100;
	            this.match(scheduleParser.T__2);
	            this.state = 101;
	            this.tasks();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 103;
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



	task() {
	    let localctx = new TaskContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, scheduleParser.RULE_task);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case scheduleParser.YEAR:
	            this.state = 106;
	            this.match(scheduleParser.YEAR);
	            this.state = 107;
	            this.dates();
	            break;
	        case scheduleParser.T__3:
	            this.state = 108;
	            this.daterange();
	            this.state = 110;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===scheduleParser.WEEKDAY) {
	                this.state = 109;
	                this.weekdays();
	            }

	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 114;
	        this.timeranges();
	        this.state = 115;
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



	daterange() {
	    let localctx = new DaterangeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, scheduleParser.RULE_daterange);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 117;
	        this.match(scheduleParser.T__3);
	        this.state = 118;
	        this.match(scheduleParser.YEAR);
	        this.state = 119;
	        this.match(scheduleParser.DATE);
	        this.state = 120;
	        this.match(scheduleParser.T__1);
	        this.state = 121;
	        this.match(scheduleParser.YEAR);
	        this.state = 122;
	        this.match(scheduleParser.DATE);
	        this.state = 123;
	        this.match(scheduleParser.T__4);
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
	    this.enterRule(localctx, 20, scheduleParser.RULE_names);
	    try {
	        this.state = 129;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 125;
	            this.match(scheduleParser.NAME);
	            this.state = 126;
	            this.match(scheduleParser.T__1);
	            this.state = 127;
	            this.names();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 128;
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



	dates() {
	    let localctx = new DatesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, scheduleParser.RULE_dates);
	    try {
	        this.state = 135;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 131;
	            this.match(scheduleParser.DATE);
	            this.state = 132;
	            this.match(scheduleParser.T__1);
	            this.state = 133;
	            this.dates();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 134;
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



	timeranges() {
	    let localctx = new TimerangesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, scheduleParser.RULE_timeranges);
	    try {
	        this.state = 142;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 137;
	            this.timerange();
	            this.state = 138;
	            this.match(scheduleParser.T__1);
	            this.state = 139;
	            this.timeranges();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 141;
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
	        this.state = 144;
	        this.match(scheduleParser.TIME);
	        this.state = 145;
	        this.match(scheduleParser.T__5);
	        this.state = 146;
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



	weekdays() {
	    let localctx = new WeekdaysContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, scheduleParser.RULE_weekdays);
	    try {
	        this.state = 152;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 148;
	            this.match(scheduleParser.WEEKDAY);
	            this.state = 149;
	            this.match(scheduleParser.T__1);
	            this.state = 150;
	            this.weekdays();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 151;
	            this.match(scheduleParser.WEEKDAY);
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


}

scheduleParser.EOF = antlr4.Token.EOF;
scheduleParser.T__0 = 1;
scheduleParser.T__1 = 2;
scheduleParser.T__2 = 3;
scheduleParser.T__3 = 4;
scheduleParser.T__4 = 5;
scheduleParser.T__5 = 6;
scheduleParser.WS = 7;
scheduleParser.ID = 8;
scheduleParser.ADD = 9;
scheduleParser.DEL = 10;
scheduleParser.DELALL = 11;
scheduleParser.RENAME = 12;
scheduleParser.AJUST = 13;
scheduleParser.TO = 14;
scheduleParser.YEAR = 15;
scheduleParser.WEEKDAY = 16;
scheduleParser.NAME = 17;
scheduleParser.DATE = 18;
scheduleParser.TIME = 19;
scheduleParser.IDENTIFIER = 20;

scheduleParser.RULE_program = 0;
scheduleParser.RULE_addtasks = 1;
scheduleParser.RULE_deltasks = 2;
scheduleParser.RULE_delalltasks = 3;
scheduleParser.RULE_renametask = 4;
scheduleParser.RULE_ajusttask = 5;
scheduleParser.RULE_identifiers = 6;
scheduleParser.RULE_tasks = 7;
scheduleParser.RULE_task = 8;
scheduleParser.RULE_daterange = 9;
scheduleParser.RULE_names = 10;
scheduleParser.RULE_dates = 11;
scheduleParser.RULE_timeranges = 12;
scheduleParser.RULE_timerange = 13;
scheduleParser.RULE_weekdays = 14;

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

	ID() {
	    return this.getToken(scheduleParser.ID, 0);
	};

	identifiers() {
	    return this.getTypedRuleContext(IdentifiersContext,0);
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

	timeranges() {
	    return this.getTypedRuleContext(TimerangesContext,0);
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


	ID() {
	    return this.getToken(scheduleParser.ID, 0);
	};

	IDENTIFIER() {
	    return this.getToken(scheduleParser.IDENTIFIER, 0);
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

	TO() {
	    return this.getToken(scheduleParser.TO, 0);
	};

	timerange() {
	    return this.getTypedRuleContext(TimerangeContext,0);
	};

	task() {
	    return this.getTypedRuleContext(TaskContext,0);
	};

	ID() {
	    return this.getToken(scheduleParser.ID, 0);
	};

	IDENTIFIER() {
	    return this.getToken(scheduleParser.IDENTIFIER, 0);
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



class IdentifiersContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_identifiers;
    }

	IDENTIFIER() {
	    return this.getToken(scheduleParser.IDENTIFIER, 0);
	};

	identifiers() {
	    return this.getTypedRuleContext(IdentifiersContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterIdentifiers(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitIdentifiers(this);
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

	timeranges() {
	    return this.getTypedRuleContext(TimerangesContext,0);
	};

	NAME() {
	    return this.getToken(scheduleParser.NAME, 0);
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

	weekdays() {
	    return this.getTypedRuleContext(WeekdaysContext,0);
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



class WeekdaysContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = scheduleParser.RULE_weekdays;
    }

	WEEKDAY() {
	    return this.getToken(scheduleParser.WEEKDAY, 0);
	};

	weekdays() {
	    return this.getTypedRuleContext(WeekdaysContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.enterWeekdays(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof scheduleListener ) {
	        listener.exitWeekdays(this);
		}
	}


}




scheduleParser.ProgramContext = ProgramContext; 
scheduleParser.AddtasksContext = AddtasksContext; 
scheduleParser.DeltasksContext = DeltasksContext; 
scheduleParser.DelalltasksContext = DelalltasksContext; 
scheduleParser.RenametaskContext = RenametaskContext; 
scheduleParser.AjusttaskContext = AjusttaskContext; 
scheduleParser.IdentifiersContext = IdentifiersContext; 
scheduleParser.TasksContext = TasksContext; 
scheduleParser.TaskContext = TaskContext; 
scheduleParser.DaterangeContext = DaterangeContext; 
scheduleParser.NamesContext = NamesContext; 
scheduleParser.DatesContext = DatesContext; 
scheduleParser.TimerangesContext = TimerangesContext; 
scheduleParser.TimerangeContext = TimerangeContext; 
scheduleParser.WeekdaysContext = WeekdaysContext; 
