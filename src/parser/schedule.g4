grammar schedule;

WS : [ \t\r\n]+ -> skip ;

program:
    ( addtasks | deltasks | delalltasks | renametask | ajusttask )*
    ;

addtasks:
    ADD tasks ';'
    ;

deltasks:
    DEL tasks ';'
    ;

delalltasks:
    DELALL ( YEAR dates | daterange | daterange? names | daterange? timerange ) ';'
    ;

renametask:
    RENAME NAME NAME ';'
    ;

ajusttask:
    AJUST task TO YEAR? DATE? timerange ';'
    ;

tasks:
    task ';' tasks | task
    ;

daterange:
    '(' YEAR DATE ',' YEAR DATE ')'
    ;

names:
    NAME ',' names | NAME
    ;

task:
    YEAR dates times NAME
    ;

dates:
    DATE ',' dates | DATE
    ;

times:
    timerange ',' timeranges | timerange
    ;

timeranges:
    timerange ',' timeranges | timerange
    ;

timerange:
    TIME '-' TIME
    ;

ADD:
    'add'
    ;

DEL:
    'del'
    ;

DELALL:
    'delall'
    ;

RENAME:
    'rename'
    ;

AJUST:
    'ajust'
    ;

TO:
    'to'
    ;

YEAR:
    [0-9][0-9][0-9][0-9]
    ;

NAME:
    ([_] | LETTER | CHINESE) ([_] | LETTER | CHINESE | DIGIT)*
    ;

DATE:
    [0-9][0-9]? '/' [0-9][0-9]?
    ;

TIME:
    [0-9][0-9]? ':' [0-9][0-9]?
    ;

fragment CHINESE: [\u4e00-\u9fa5];

fragment DIGIT: [0-9];

fragment LETTER: [a-zA-Z] ;
