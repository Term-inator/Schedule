// Generated from d:\University\project\Schedule\src\parser\schedule.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class scheduleParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, WS=7, ID=8, ADD=9, DEL=10, 
		DELALL=11, RENAME=12, AJUST=13, TO=14, YEAR=15, WEEKDAY=16, NAME=17, DATE=18, 
		TIME=19, IDENTIFIER=20;
	public static final int
		RULE_program = 0, RULE_addtasks = 1, RULE_deltasks = 2, RULE_delalltasks = 3, 
		RULE_renametask = 4, RULE_ajusttask = 5, RULE_identifiers = 6, RULE_tasks = 7, 
		RULE_task = 8, RULE_daterange = 9, RULE_names = 10, RULE_dates = 11, RULE_timeranges = 12, 
		RULE_timerange = 13, RULE_weekdays = 14;
	private static String[] makeRuleNames() {
		return new String[] {
			"program", "addtasks", "deltasks", "delalltasks", "renametask", "ajusttask", 
			"identifiers", "tasks", "task", "daterange", "names", "dates", "timeranges", 
			"timerange", "weekdays"
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

	@Override
	public String getGrammarFileName() { return "schedule.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public scheduleParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgramContext extends ParserRuleContext {
		public List<AddtasksContext> addtasks() {
			return getRuleContexts(AddtasksContext.class);
		}
		public AddtasksContext addtasks(int i) {
			return getRuleContext(AddtasksContext.class,i);
		}
		public List<DeltasksContext> deltasks() {
			return getRuleContexts(DeltasksContext.class);
		}
		public DeltasksContext deltasks(int i) {
			return getRuleContext(DeltasksContext.class,i);
		}
		public List<DelalltasksContext> delalltasks() {
			return getRuleContexts(DelalltasksContext.class);
		}
		public DelalltasksContext delalltasks(int i) {
			return getRuleContext(DelalltasksContext.class,i);
		}
		public List<RenametaskContext> renametask() {
			return getRuleContexts(RenametaskContext.class);
		}
		public RenametaskContext renametask(int i) {
			return getRuleContext(RenametaskContext.class,i);
		}
		public List<AjusttaskContext> ajusttask() {
			return getRuleContexts(AjusttaskContext.class);
		}
		public AjusttaskContext ajusttask(int i) {
			return getRuleContext(AjusttaskContext.class,i);
		}
		public ProgramContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_program; }
	}

	public final ProgramContext program() throws RecognitionException {
		ProgramContext _localctx = new ProgramContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_program);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(37);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << ADD) | (1L << DEL) | (1L << DELALL) | (1L << RENAME) | (1L << AJUST))) != 0)) {
				{
				setState(35);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case ADD:
					{
					setState(30);
					addtasks();
					}
					break;
				case DEL:
					{
					setState(31);
					deltasks();
					}
					break;
				case DELALL:
					{
					setState(32);
					delalltasks();
					}
					break;
				case RENAME:
					{
					setState(33);
					renametask();
					}
					break;
				case AJUST:
					{
					setState(34);
					ajusttask();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(39);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AddtasksContext extends ParserRuleContext {
		public TerminalNode ADD() { return getToken(scheduleParser.ADD, 0); }
		public TasksContext tasks() {
			return getRuleContext(TasksContext.class,0);
		}
		public AddtasksContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_addtasks; }
	}

	public final AddtasksContext addtasks() throws RecognitionException {
		AddtasksContext _localctx = new AddtasksContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_addtasks);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(40);
			match(ADD);
			setState(41);
			tasks();
			setState(42);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DeltasksContext extends ParserRuleContext {
		public TerminalNode DEL() { return getToken(scheduleParser.DEL, 0); }
		public TerminalNode ID() { return getToken(scheduleParser.ID, 0); }
		public IdentifiersContext identifiers() {
			return getRuleContext(IdentifiersContext.class,0);
		}
		public TasksContext tasks() {
			return getRuleContext(TasksContext.class,0);
		}
		public DeltasksContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_deltasks; }
	}

	public final DeltasksContext deltasks() throws RecognitionException {
		DeltasksContext _localctx = new DeltasksContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_deltasks);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(44);
			match(DEL);
			setState(48);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ID:
				{
				setState(45);
				match(ID);
				setState(46);
				identifiers();
				}
				break;
			case T__3:
			case YEAR:
				{
				setState(47);
				tasks();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(50);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DelalltasksContext extends ParserRuleContext {
		public TerminalNode DELALL() { return getToken(scheduleParser.DELALL, 0); }
		public TerminalNode YEAR() { return getToken(scheduleParser.YEAR, 0); }
		public DatesContext dates() {
			return getRuleContext(DatesContext.class,0);
		}
		public DaterangeContext daterange() {
			return getRuleContext(DaterangeContext.class,0);
		}
		public NamesContext names() {
			return getRuleContext(NamesContext.class,0);
		}
		public TimerangeContext timerange() {
			return getRuleContext(TimerangeContext.class,0);
		}
		public DelalltasksContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_delalltasks; }
	}

	public final DelalltasksContext delalltasks() throws RecognitionException {
		DelalltasksContext _localctx = new DelalltasksContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_delalltasks);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(52);
			match(DELALL);
			setState(64);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				{
				setState(53);
				match(YEAR);
				setState(54);
				dates();
				}
				break;
			case 2:
				{
				setState(55);
				daterange();
				}
				break;
			case 3:
				{
				setState(57);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__3) {
					{
					setState(56);
					daterange();
					}
				}

				setState(59);
				names();
				}
				break;
			case 4:
				{
				setState(61);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__3) {
					{
					setState(60);
					daterange();
					}
				}

				setState(63);
				timerange();
				}
				break;
			}
			setState(66);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RenametaskContext extends ParserRuleContext {
		public TerminalNode RENAME() { return getToken(scheduleParser.RENAME, 0); }
		public List<TerminalNode> NAME() { return getTokens(scheduleParser.NAME); }
		public TerminalNode NAME(int i) {
			return getToken(scheduleParser.NAME, i);
		}
		public TerminalNode ID() { return getToken(scheduleParser.ID, 0); }
		public TerminalNode IDENTIFIER() { return getToken(scheduleParser.IDENTIFIER, 0); }
		public RenametaskContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_renametask; }
	}

	public final RenametaskContext renametask() throws RecognitionException {
		RenametaskContext _localctx = new RenametaskContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_renametask);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(68);
			match(RENAME);
			setState(72);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NAME:
				{
				setState(69);
				match(NAME);
				}
				break;
			case ID:
				{
				setState(70);
				match(ID);
				setState(71);
				match(IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(74);
			match(NAME);
			setState(75);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AjusttaskContext extends ParserRuleContext {
		public TerminalNode AJUST() { return getToken(scheduleParser.AJUST, 0); }
		public TerminalNode TO() { return getToken(scheduleParser.TO, 0); }
		public TimerangeContext timerange() {
			return getRuleContext(TimerangeContext.class,0);
		}
		public TaskContext task() {
			return getRuleContext(TaskContext.class,0);
		}
		public TerminalNode ID() { return getToken(scheduleParser.ID, 0); }
		public TerminalNode IDENTIFIER() { return getToken(scheduleParser.IDENTIFIER, 0); }
		public TerminalNode YEAR() { return getToken(scheduleParser.YEAR, 0); }
		public TerminalNode DATE() { return getToken(scheduleParser.DATE, 0); }
		public AjusttaskContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ajusttask; }
	}

	public final AjusttaskContext ajusttask() throws RecognitionException {
		AjusttaskContext _localctx = new AjusttaskContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_ajusttask);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(77);
			match(AJUST);
			setState(81);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__3:
			case YEAR:
				{
				setState(78);
				task();
				}
				break;
			case ID:
				{
				setState(79);
				match(ID);
				setState(80);
				match(IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(83);
			match(TO);
			setState(85);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==YEAR) {
				{
				setState(84);
				match(YEAR);
				}
			}

			setState(88);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==DATE) {
				{
				setState(87);
				match(DATE);
				}
			}

			setState(90);
			timerange();
			setState(91);
			match(T__0);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifiersContext extends ParserRuleContext {
		public TerminalNode IDENTIFIER() { return getToken(scheduleParser.IDENTIFIER, 0); }
		public IdentifiersContext identifiers() {
			return getRuleContext(IdentifiersContext.class,0);
		}
		public IdentifiersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifiers; }
	}

	public final IdentifiersContext identifiers() throws RecognitionException {
		IdentifiersContext _localctx = new IdentifiersContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_identifiers);
		try {
			setState(97);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(93);
				match(IDENTIFIER);
				setState(94);
				match(T__1);
				setState(95);
				identifiers();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(96);
				match(IDENTIFIER);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TasksContext extends ParserRuleContext {
		public TaskContext task() {
			return getRuleContext(TaskContext.class,0);
		}
		public TasksContext tasks() {
			return getRuleContext(TasksContext.class,0);
		}
		public TasksContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tasks; }
	}

	public final TasksContext tasks() throws RecognitionException {
		TasksContext _localctx = new TasksContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_tasks);
		try {
			setState(104);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(99);
				task();
				setState(100);
				match(T__2);
				setState(101);
				tasks();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(103);
				task();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TaskContext extends ParserRuleContext {
		public TimerangesContext timeranges() {
			return getRuleContext(TimerangesContext.class,0);
		}
		public TerminalNode NAME() { return getToken(scheduleParser.NAME, 0); }
		public TerminalNode YEAR() { return getToken(scheduleParser.YEAR, 0); }
		public DatesContext dates() {
			return getRuleContext(DatesContext.class,0);
		}
		public DaterangeContext daterange() {
			return getRuleContext(DaterangeContext.class,0);
		}
		public WeekdaysContext weekdays() {
			return getRuleContext(WeekdaysContext.class,0);
		}
		public TaskContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_task; }
	}

	public final TaskContext task() throws RecognitionException {
		TaskContext _localctx = new TaskContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_task);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(112);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case YEAR:
				{
				setState(106);
				match(YEAR);
				setState(107);
				dates();
				}
				break;
			case T__3:
				{
				setState(108);
				daterange();
				setState(110);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WEEKDAY) {
					{
					setState(109);
					weekdays();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(114);
			timeranges();
			setState(115);
			match(NAME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DaterangeContext extends ParserRuleContext {
		public List<TerminalNode> YEAR() { return getTokens(scheduleParser.YEAR); }
		public TerminalNode YEAR(int i) {
			return getToken(scheduleParser.YEAR, i);
		}
		public List<TerminalNode> DATE() { return getTokens(scheduleParser.DATE); }
		public TerminalNode DATE(int i) {
			return getToken(scheduleParser.DATE, i);
		}
		public DaterangeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_daterange; }
	}

	public final DaterangeContext daterange() throws RecognitionException {
		DaterangeContext _localctx = new DaterangeContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_daterange);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(117);
			match(T__3);
			setState(118);
			match(YEAR);
			setState(119);
			match(DATE);
			setState(120);
			match(T__1);
			setState(121);
			match(YEAR);
			setState(122);
			match(DATE);
			setState(123);
			match(T__4);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NamesContext extends ParserRuleContext {
		public TerminalNode NAME() { return getToken(scheduleParser.NAME, 0); }
		public NamesContext names() {
			return getRuleContext(NamesContext.class,0);
		}
		public NamesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_names; }
	}

	public final NamesContext names() throws RecognitionException {
		NamesContext _localctx = new NamesContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_names);
		try {
			setState(129);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(125);
				match(NAME);
				setState(126);
				match(T__1);
				setState(127);
				names();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(128);
				match(NAME);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DatesContext extends ParserRuleContext {
		public TerminalNode DATE() { return getToken(scheduleParser.DATE, 0); }
		public DatesContext dates() {
			return getRuleContext(DatesContext.class,0);
		}
		public DatesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dates; }
	}

	public final DatesContext dates() throws RecognitionException {
		DatesContext _localctx = new DatesContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_dates);
		try {
			setState(135);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(131);
				match(DATE);
				setState(132);
				match(T__1);
				setState(133);
				dates();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(134);
				match(DATE);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimerangesContext extends ParserRuleContext {
		public TimerangeContext timerange() {
			return getRuleContext(TimerangeContext.class,0);
		}
		public TimerangesContext timeranges() {
			return getRuleContext(TimerangesContext.class,0);
		}
		public TimerangesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timeranges; }
	}

	public final TimerangesContext timeranges() throws RecognitionException {
		TimerangesContext _localctx = new TimerangesContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_timeranges);
		try {
			setState(142);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(137);
				timerange();
				setState(138);
				match(T__1);
				setState(139);
				timeranges();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(141);
				timerange();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimerangeContext extends ParserRuleContext {
		public List<TerminalNode> TIME() { return getTokens(scheduleParser.TIME); }
		public TerminalNode TIME(int i) {
			return getToken(scheduleParser.TIME, i);
		}
		public TimerangeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_timerange; }
	}

	public final TimerangeContext timerange() throws RecognitionException {
		TimerangeContext _localctx = new TimerangeContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_timerange);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(144);
			match(TIME);
			setState(145);
			match(T__5);
			setState(146);
			match(TIME);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class WeekdaysContext extends ParserRuleContext {
		public TerminalNode WEEKDAY() { return getToken(scheduleParser.WEEKDAY, 0); }
		public WeekdaysContext weekdays() {
			return getRuleContext(WeekdaysContext.class,0);
		}
		public WeekdaysContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_weekdays; }
	}

	public final WeekdaysContext weekdays() throws RecognitionException {
		WeekdaysContext _localctx = new WeekdaysContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_weekdays);
		try {
			setState(152);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(148);
				match(WEEKDAY);
				setState(149);
				match(T__1);
				setState(150);
				weekdays();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(151);
				match(WEEKDAY);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\26\u009d\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\3\2\3\2\3\2\3\2\3"+
		"\2\7\2&\n\2\f\2\16\2)\13\2\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\5\4\63\n\4"+
		"\3\4\3\4\3\5\3\5\3\5\3\5\3\5\5\5<\n\5\3\5\3\5\5\5@\n\5\3\5\5\5C\n\5\3"+
		"\5\3\5\3\6\3\6\3\6\3\6\5\6K\n\6\3\6\3\6\3\6\3\7\3\7\3\7\3\7\5\7T\n\7\3"+
		"\7\3\7\5\7X\n\7\3\7\5\7[\n\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\5\bd\n\b\3\t"+
		"\3\t\3\t\3\t\3\t\5\tk\n\t\3\n\3\n\3\n\3\n\5\nq\n\n\5\ns\n\n\3\n\3\n\3"+
		"\n\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\f\3\f\3\f\3\f\5\f\u0084\n"+
		"\f\3\r\3\r\3\r\3\r\5\r\u008a\n\r\3\16\3\16\3\16\3\16\3\16\5\16\u0091\n"+
		"\16\3\17\3\17\3\17\3\17\3\20\3\20\3\20\3\20\5\20\u009b\n\20\3\20\2\2\21"+
		"\2\4\6\b\n\f\16\20\22\24\26\30\32\34\36\2\2\2\u00a4\2\'\3\2\2\2\4*\3\2"+
		"\2\2\6.\3\2\2\2\b\66\3\2\2\2\nF\3\2\2\2\fO\3\2\2\2\16c\3\2\2\2\20j\3\2"+
		"\2\2\22r\3\2\2\2\24w\3\2\2\2\26\u0083\3\2\2\2\30\u0089\3\2\2\2\32\u0090"+
		"\3\2\2\2\34\u0092\3\2\2\2\36\u009a\3\2\2\2 &\5\4\3\2!&\5\6\4\2\"&\5\b"+
		"\5\2#&\5\n\6\2$&\5\f\7\2% \3\2\2\2%!\3\2\2\2%\"\3\2\2\2%#\3\2\2\2%$\3"+
		"\2\2\2&)\3\2\2\2\'%\3\2\2\2\'(\3\2\2\2(\3\3\2\2\2)\'\3\2\2\2*+\7\13\2"+
		"\2+,\5\20\t\2,-\7\3\2\2-\5\3\2\2\2.\62\7\f\2\2/\60\7\n\2\2\60\63\5\16"+
		"\b\2\61\63\5\20\t\2\62/\3\2\2\2\62\61\3\2\2\2\63\64\3\2\2\2\64\65\7\3"+
		"\2\2\65\7\3\2\2\2\66B\7\r\2\2\678\7\21\2\28C\5\30\r\29C\5\24\13\2:<\5"+
		"\24\13\2;:\3\2\2\2;<\3\2\2\2<=\3\2\2\2=C\5\26\f\2>@\5\24\13\2?>\3\2\2"+
		"\2?@\3\2\2\2@A\3\2\2\2AC\5\34\17\2B\67\3\2\2\2B9\3\2\2\2B;\3\2\2\2B?\3"+
		"\2\2\2CD\3\2\2\2DE\7\3\2\2E\t\3\2\2\2FJ\7\16\2\2GK\7\23\2\2HI\7\n\2\2"+
		"IK\7\26\2\2JG\3\2\2\2JH\3\2\2\2KL\3\2\2\2LM\7\23\2\2MN\7\3\2\2N\13\3\2"+
		"\2\2OS\7\17\2\2PT\5\22\n\2QR\7\n\2\2RT\7\26\2\2SP\3\2\2\2SQ\3\2\2\2TU"+
		"\3\2\2\2UW\7\20\2\2VX\7\21\2\2WV\3\2\2\2WX\3\2\2\2XZ\3\2\2\2Y[\7\24\2"+
		"\2ZY\3\2\2\2Z[\3\2\2\2[\\\3\2\2\2\\]\5\34\17\2]^\7\3\2\2^\r\3\2\2\2_`"+
		"\7\26\2\2`a\7\4\2\2ad\5\16\b\2bd\7\26\2\2c_\3\2\2\2cb\3\2\2\2d\17\3\2"+
		"\2\2ef\5\22\n\2fg\7\5\2\2gh\5\20\t\2hk\3\2\2\2ik\5\22\n\2je\3\2\2\2ji"+
		"\3\2\2\2k\21\3\2\2\2lm\7\21\2\2ms\5\30\r\2np\5\24\13\2oq\5\36\20\2po\3"+
		"\2\2\2pq\3\2\2\2qs\3\2\2\2rl\3\2\2\2rn\3\2\2\2st\3\2\2\2tu\5\32\16\2u"+
		"v\7\23\2\2v\23\3\2\2\2wx\7\6\2\2xy\7\21\2\2yz\7\24\2\2z{\7\4\2\2{|\7\21"+
		"\2\2|}\7\24\2\2}~\7\7\2\2~\25\3\2\2\2\177\u0080\7\23\2\2\u0080\u0081\7"+
		"\4\2\2\u0081\u0084\5\26\f\2\u0082\u0084\7\23\2\2\u0083\177\3\2\2\2\u0083"+
		"\u0082\3\2\2\2\u0084\27\3\2\2\2\u0085\u0086\7\24\2\2\u0086\u0087\7\4\2"+
		"\2\u0087\u008a\5\30\r\2\u0088\u008a\7\24\2\2\u0089\u0085\3\2\2\2\u0089"+
		"\u0088\3\2\2\2\u008a\31\3\2\2\2\u008b\u008c\5\34\17\2\u008c\u008d\7\4"+
		"\2\2\u008d\u008e\5\32\16\2\u008e\u0091\3\2\2\2\u008f\u0091\5\34\17\2\u0090"+
		"\u008b\3\2\2\2\u0090\u008f\3\2\2\2\u0091\33\3\2\2\2\u0092\u0093\7\25\2"+
		"\2\u0093\u0094\7\b\2\2\u0094\u0095\7\25\2\2\u0095\35\3\2\2\2\u0096\u0097"+
		"\7\22\2\2\u0097\u0098\7\4\2\2\u0098\u009b\5\36\20\2\u0099\u009b\7\22\2"+
		"\2\u009a\u0096\3\2\2\2\u009a\u0099\3\2\2\2\u009b\37\3\2\2\2\24%\'\62;"+
		"?BJSWZcjpr\u0083\u0089\u0090\u009a";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}