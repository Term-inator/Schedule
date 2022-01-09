// Generated from d:\University\project\Schedule\src\parser\schedule.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class scheduleLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, WS=7, ID=8, ADD=9, DEL=10, 
		DELALL=11, RENAME=12, AJUST=13, TO=14, YEAR=15, WEEKDAY=16, NAME=17, DATE=18, 
		TIME=19, IDENTIFIER=20;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "WS", "ID", "ADD", "DEL", 
			"DELALL", "RENAME", "AJUST", "TO", "YEAR", "WEEKDAY", "NAME", "DATE", 
			"TIME", "IDENTIFIER", "CHINESE", "DIGIT", "LETTER"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "';'", "','", "'&'", "'('", "')'", "'-'", null, "'id'", "'add'", 
			"'del'", "'delall'", "'rename'", "'ajust'", "'to'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, "WS", "ID", "ADD", "DEL", "DELALL", 
			"RENAME", "AJUST", "TO", "YEAR", "WEEKDAY", "NAME", "DATE", "TIME", "IDENTIFIER"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public scheduleLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "schedule.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\26\u00a9\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\3\2"+
		"\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\6\b?\n\b\r\b\16\b@\3"+
		"\b\3\b\3\t\3\t\3\t\3\n\3\n\3\n\3\n\3\13\3\13\3\13\3\13\3\f\3\f\3\f\3\f"+
		"\3\f\3\f\3\f\3\r\3\r\3\r\3\r\3\r\3\r\3\r\3\16\3\16\3\16\3\16\3\16\3\16"+
		"\3\17\3\17\3\17\3\20\3\20\3\20\3\20\3\20\3\21\3\21\3\21\3\21\3\21\3\21"+
		"\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21\3\21"+
		"\3\21\3\21\5\21\u0082\n\21\3\22\3\22\3\22\5\22\u0087\n\22\3\22\3\22\3"+
		"\22\3\22\7\22\u008d\n\22\f\22\16\22\u0090\13\22\3\23\3\23\3\23\3\23\3"+
		"\23\3\23\3\24\3\24\3\24\3\24\3\24\3\24\3\25\3\25\6\25\u00a0\n\25\r\25"+
		"\16\25\u00a1\3\26\3\26\3\27\3\27\3\30\3\30\2\2\31\3\3\5\4\7\5\t\6\13\7"+
		"\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'\25"+
		")\26+\2-\2/\2\3\2\7\5\2\13\f\17\17\"\"\3\2\62;\3\2aa\3\2\u4e02\u9fa7\4"+
		"\2C\\c|\2\u00b4\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3"+
		"\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2"+
		"\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3"+
		"\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\3\61\3\2\2\2\5\63"+
		"\3\2\2\2\7\65\3\2\2\2\t\67\3\2\2\2\139\3\2\2\2\r;\3\2\2\2\17>\3\2\2\2"+
		"\21D\3\2\2\2\23G\3\2\2\2\25K\3\2\2\2\27O\3\2\2\2\31V\3\2\2\2\33]\3\2\2"+
		"\2\35c\3\2\2\2\37f\3\2\2\2!\u0081\3\2\2\2#\u0086\3\2\2\2%\u0091\3\2\2"+
		"\2\'\u0097\3\2\2\2)\u009f\3\2\2\2+\u00a3\3\2\2\2-\u00a5\3\2\2\2/\u00a7"+
		"\3\2\2\2\61\62\7=\2\2\62\4\3\2\2\2\63\64\7.\2\2\64\6\3\2\2\2\65\66\7("+
		"\2\2\66\b\3\2\2\2\678\7*\2\28\n\3\2\2\29:\7+\2\2:\f\3\2\2\2;<\7/\2\2<"+
		"\16\3\2\2\2=?\t\2\2\2>=\3\2\2\2?@\3\2\2\2@>\3\2\2\2@A\3\2\2\2AB\3\2\2"+
		"\2BC\b\b\2\2C\20\3\2\2\2DE\7k\2\2EF\7f\2\2F\22\3\2\2\2GH\7c\2\2HI\7f\2"+
		"\2IJ\7f\2\2J\24\3\2\2\2KL\7f\2\2LM\7g\2\2MN\7n\2\2N\26\3\2\2\2OP\7f\2"+
		"\2PQ\7g\2\2QR\7n\2\2RS\7c\2\2ST\7n\2\2TU\7n\2\2U\30\3\2\2\2VW\7t\2\2W"+
		"X\7g\2\2XY\7p\2\2YZ\7c\2\2Z[\7o\2\2[\\\7g\2\2\\\32\3\2\2\2]^\7c\2\2^_"+
		"\7l\2\2_`\7w\2\2`a\7u\2\2ab\7v\2\2b\34\3\2\2\2cd\7v\2\2de\7q\2\2e\36\3"+
		"\2\2\2fg\t\3\2\2gh\t\3\2\2hi\t\3\2\2ij\t\3\2\2j \3\2\2\2kl\7O\2\2lm\7"+
		"q\2\2m\u0082\7p\2\2no\7V\2\2op\7w\2\2p\u0082\7g\2\2qr\7Y\2\2rs\7g\2\2"+
		"s\u0082\7f\2\2tu\7V\2\2uv\7j\2\2vw\7w\2\2w\u0082\7t\2\2xy\7H\2\2yz\7t"+
		"\2\2z\u0082\7k\2\2{|\7U\2\2|}\7c\2\2}\u0082\7v\2\2~\177\7U\2\2\177\u0080"+
		"\7w\2\2\u0080\u0082\7p\2\2\u0081k\3\2\2\2\u0081n\3\2\2\2\u0081q\3\2\2"+
		"\2\u0081t\3\2\2\2\u0081x\3\2\2\2\u0081{\3\2\2\2\u0081~\3\2\2\2\u0082\""+
		"\3\2\2\2\u0083\u0087\t\4\2\2\u0084\u0087\5/\30\2\u0085\u0087\5+\26\2\u0086"+
		"\u0083\3\2\2\2\u0086\u0084\3\2\2\2\u0086\u0085\3\2\2\2\u0087\u008e\3\2"+
		"\2\2\u0088\u008d\t\4\2\2\u0089\u008d\5/\30\2\u008a\u008d\5+\26\2\u008b"+
		"\u008d\5-\27\2\u008c\u0088\3\2\2\2\u008c\u0089\3\2\2\2\u008c\u008a\3\2"+
		"\2\2\u008c\u008b\3\2\2\2\u008d\u0090\3\2\2\2\u008e\u008c\3\2\2\2\u008e"+
		"\u008f\3\2\2\2\u008f$\3\2\2\2\u0090\u008e\3\2\2\2\u0091\u0092\t\3\2\2"+
		"\u0092\u0093\t\3\2\2\u0093\u0094\7\61\2\2\u0094\u0095\t\3\2\2\u0095\u0096"+
		"\t\3\2\2\u0096&\3\2\2\2\u0097\u0098\t\3\2\2\u0098\u0099\t\3\2\2\u0099"+
		"\u009a\7<\2\2\u009a\u009b\t\3\2\2\u009b\u009c\t\3\2\2\u009c(\3\2\2\2\u009d"+
		"\u00a0\5/\30\2\u009e\u00a0\5-\27\2\u009f\u009d\3\2\2\2\u009f\u009e\3\2"+
		"\2\2\u00a0\u00a1\3\2\2\2\u00a1\u009f\3\2\2\2\u00a1\u00a2\3\2\2\2\u00a2"+
		"*\3\2\2\2\u00a3\u00a4\t\5\2\2\u00a4,\3\2\2\2\u00a5\u00a6\t\3\2\2\u00a6"+
		".\3\2\2\2\u00a7\u00a8\t\6\2\2\u00a8\60\3\2\2\2\n\2@\u0081\u0086\u008c"+
		"\u008e\u009f\u00a1\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}