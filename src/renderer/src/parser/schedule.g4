grammar schedule;

// Lexer rules
ID: [a-zA-Z_]+[a-zA-Z0-9_]*;
ALPHANUM: [a-zA-Z0-9]+;
DIGIT: [0-9];
WS: [ \t\r\n]+ -> skip;

// Parser rules
program: statement+;

statement: assignment
        | arrayAssignment
        | functionCall
        | functionDeclaration
        | builtInFunction
        ;

builtInFunction: createFunction
                | removeFunction
                | updateFunction
                | deleteFunction
                | selectFunction
                | printFunction
                ;

assignment: typeName ID '=' value ';';

arrayAssignment: arrayType ID '=' arrayValue ';';

functionCall: ID '(' (arguments)? ')' ';';

arguments: argument (',' argument)*;

argument: value | arrayValue;

functionDeclaration: typeName ID '(' (parameters)? ')' '{' statement+ '}';

parameters: parameter (',' parameter)*;

parameter: typeName ID;

typeName: 'string' | 'date' | 'day' | 'time' | 'task';

arrayType: typeName '[]';

value: task
    | dateLiteral
    | dayLiteral
    | timeLiteral
    | stringLiteral
    ;

arrayValue: '[' (value (',' value)*)? ']';

stringLiteral: '"' ( ~('\r' | '\n' | '"' | '\\') | '\\' . )* '"';

dateLiteral: DIGIT DIGIT DIGIT DIGIT '/' DIGIT DIGIT '/' DIGIT DIGIT;

timeLiteral: DIGIT DIGIT ':' DIGIT DIGIT;

dayLiteral: 'Mon' | 'Tue' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';

time: DIGIT DIGIT ':' DIGIT DIGIT;

timeRange: time '-' time;

task: time stringLiteral;

createFunction: 'create' '(' arrayValue ')' ';';

removeFunction: 'remove' '(' arrayValue ')' ';';

updateFunction: 'update' '(' arrayValue ',' stringLiteral ',' value ')' ';';

deleteFunction: 'delete' '(' arrayValue ')' ';';

selectFunction: 'select' '(' (stringLiteral ',' value (',' stringLiteral ',' value)*)? ')' ';' | 'select' '(' ')' ';';

printFunction: 'print' '(' arrayValue ')' ';';
