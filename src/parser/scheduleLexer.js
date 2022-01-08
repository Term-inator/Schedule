// Generated from schedule.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002\u000fa\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003",
    "\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007",
    "\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t",
    "\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\f\u0006\fF\n\f\r\f\u000e\fG\u0003\r\u0006\rK\n\r\r\r\u000e",
    "\rL\u0003\r\u0003\r\u0006\rQ\n\r\r\r\u000e\rR\u0003\u000e\u0006\u000e",
    "V\n\u000e\r\u000e\u000e\u000eW\u0003\u000e\u0003\u000e\u0006\u000e\\",
    "\n\u000e\r\u000e\u000e\u000e]\u0003\u000f\u0003\u000f\u0002\u0002\u0010",
    "\u0003\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t",
    "\u0011\n\u0013\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0002",
    "\u0003\u0002\u0003\u0003\u00022;\u0002d\u0002\u0003\u0003\u0002\u0002",
    "\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002",
    "\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002",
    "\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002",
    "\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002",
    "\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002\u0002",
    "\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002\u0002",
    "\u0002\u0003\u001f\u0003\u0002\u0002\u0002\u0005!\u0003\u0002\u0002",
    "\u0002\u0007#\u0003\u0002\u0002\u0002\t%\u0003\u0002\u0002\u0002\u000b",
    "\'\u0003\u0002\u0002\u0002\r)\u0003\u0002\u0002\u0002\u000f-\u0003\u0002",
    "\u0002\u0002\u00111\u0003\u0002\u0002\u0002\u00138\u0003\u0002\u0002",
    "\u0002\u0015?\u0003\u0002\u0002\u0002\u0017E\u0003\u0002\u0002\u0002",
    "\u0019J\u0003\u0002\u0002\u0002\u001bU\u0003\u0002\u0002\u0002\u001d",
    "_\u0003\u0002\u0002\u0002\u001f \u0007=\u0002\u0002 \u0004\u0003\u0002",
    "\u0002\u0002!\"\u0007*\u0002\u0002\"\u0006\u0003\u0002\u0002\u0002#",
    "$\u0007.\u0002\u0002$\b\u0003\u0002\u0002\u0002%&\u0007+\u0002\u0002",
    "&\n\u0003\u0002\u0002\u0002\'(\u0007/\u0002\u0002(\f\u0003\u0002\u0002",
    "\u0002)*\u0007c\u0002\u0002*+\u0007f\u0002\u0002+,\u0007f\u0002\u0002",
    ",\u000e\u0003\u0002\u0002\u0002-.\u0007f\u0002\u0002./\u0007g\u0002",
    "\u0002/0\u0007n\u0002\u00020\u0010\u0003\u0002\u0002\u000212\u0007f",
    "\u0002\u000223\u0007g\u0002\u000234\u0007n\u0002\u000245\u0007c\u0002",
    "\u000256\u0007n\u0002\u000267\u0007n\u0002\u00027\u0012\u0003\u0002",
    "\u0002\u000289\u0007t\u0002\u00029:\u0007g\u0002\u0002:;\u0007p\u0002",
    "\u0002;<\u0007c\u0002\u0002<=\u0007o\u0002\u0002=>\u0007g\u0002\u0002",
    ">\u0014\u0003\u0002\u0002\u0002?@\u0005\u001d\u000f\u0002@A\u0005\u001d",
    "\u000f\u0002AB\u0005\u001d\u000f\u0002BC\u0005\u001d\u000f\u0002C\u0016",
    "\u0003\u0002\u0002\u0002DF\u000b\u0002\u0002\u0002ED\u0003\u0002\u0002",
    "\u0002FG\u0003\u0002\u0002\u0002GE\u0003\u0002\u0002\u0002GH\u0003\u0002",
    "\u0002\u0002H\u0018\u0003\u0002\u0002\u0002IK\u0005\u001d\u000f\u0002",
    "JI\u0003\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002LJ\u0003\u0002\u0002",
    "\u0002LM\u0003\u0002\u0002\u0002MN\u0003\u0002\u0002\u0002NP\u00071",
    "\u0002\u0002OQ\u0005\u001d\u000f\u0002PO\u0003\u0002\u0002\u0002QR\u0003",
    "\u0002\u0002\u0002RP\u0003\u0002\u0002\u0002RS\u0003\u0002\u0002\u0002",
    "S\u001a\u0003\u0002\u0002\u0002TV\u0005\u001d\u000f\u0002UT\u0003\u0002",
    "\u0002\u0002VW\u0003\u0002\u0002\u0002WU\u0003\u0002\u0002\u0002WX\u0003",
    "\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002Y[\u0007<\u0002\u0002Z\\",
    "\u0005\u001d\u000f\u0002[Z\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002",
    "\u0002][\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^\u001c\u0003",
    "\u0002\u0002\u0002_`\t\u0002\u0002\u0002`\u001e\u0003\u0002\u0002\u0002",
    "\b\u0002GLRW]\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class scheduleLexer extends antlr4.Lexer {

    static grammarFileName = "schedule.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "';'", "'('", "','", "')'", "'-'", "'add'", 
                         "'del'", "'delall'", "'rename'" ];
	static symbolicNames = [ null, null, null, null, null, null, "ADD", "DEL", 
                          "DELALL", "RENAME", "YEAR", "NAME", "DATE", "TIME" ];
	static ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", "ADD", "DEL", 
                      "DELALL", "RENAME", "YEAR", "NAME", "DATE", "TIME", 
                      "DIGIT" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

scheduleLexer.EOF = antlr4.Token.EOF;
scheduleLexer.T__0 = 1;
scheduleLexer.T__1 = 2;
scheduleLexer.T__2 = 3;
scheduleLexer.T__3 = 4;
scheduleLexer.T__4 = 5;
scheduleLexer.ADD = 6;
scheduleLexer.DEL = 7;
scheduleLexer.DELALL = 8;
scheduleLexer.RENAME = 9;
scheduleLexer.YEAR = 10;
scheduleLexer.NAME = 11;
scheduleLexer.DATE = 12;
scheduleLexer.TIME = 13;



