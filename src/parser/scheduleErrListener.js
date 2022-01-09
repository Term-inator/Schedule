import antlr4 from 'antlr4';

export default class scheduleListener extends antlr4.error.ErrorListener {
    constructor() {
        super()
        this.errors = []
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        // console.error("line " + line + ":" + column + " " + msg)
        this.errors.push("line " + line + ":" + column + " " + msg)
    }

    getErrors() {
        return this.errors
    }
}