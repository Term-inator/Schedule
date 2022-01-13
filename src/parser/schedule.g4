grammar schedule;

WS : [ \t\r\n]+ -> skip ;

program:
    ( addtasks | deltasks | delalltasks | renametask | ajusttask )*
    ;

addtasks:
    ADD tasks ';'
    ;

deltasks:
    DEL ( ID IDENTIFIER | tasks ) ';'
    ;

delalltasks:
    DELALL ( YEAR dates | daterange | daterange? names | daterange? timeranges | ID identifiers ) ';'
    ;

renametask:
    RENAME ( NAME | ID IDENTIFIER ) NAME ';'
    ;

ajusttask:
    AJUST ( task | ID IDENTIFIER ) TO YEAR? DATE? timerange ';'
    ;

identifiers:
    IDENTIFIER ',' identifiers | IDENTIFIER
    ;

tasks:
    task '&' tasks | task
    ;

task:
    ( YEAR dates | daterange weekdays? ) timeranges NAME 
    ;

daterange:
    '(' YEAR DATE ',' YEAR DATE ')'
    ;

names:
    NAME ',' names | NAME
    ;

dates:
    DATE ',' dates | DATE
    ;

timeranges:
    timerange ',' timeranges | timerange
    ;

timerange:
    TIME '-' TIME
    ;


weekdays:
    WEEKDAY ',' weekdays | WEEKDAY
    ;

ID: 'id' ;

ADD: 'add' ;

DEL: 'del' ;

DELALL: 'delall' ;

RENAME: 'rename' ;

AJUST: 'ajust' ;

TO: 'to' ;

YEAR: [0-9][0-9][0-9][0-9] ;

WEEKDAY: 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun' ;

NAME:
    ( [_] | LETTER | CHINESE ) ( [_] | LETTER | CHINESE | DIGIT )*
    ;

DATE: [0-9][0-9] '/' [0-9][0-9] ;

TIME: [0-9][0-9] ':' [0-9][0-9] ;

IDENTIFIER: [#]( LETTER | DIGIT )+ ;

fragment CHINESE: [\u4e00-\u9fa5];

fragment DIGIT: [0-9];

fragment LETTER: [a-zA-Z] ;
