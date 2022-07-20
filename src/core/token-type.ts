class TokenType {
  name: string;
  regex: string;

  constructor(name: string, regex: string) {
    this.name = name;
    this.regex = regex;
  }
}

export const tokenTypeList = {
  PRINT: new TokenType("PRINT", "\\bprint\\b"),
  FUNCTION: new TokenType("FUNCTION", "\\bfn\\b"),
  NUMBER: new TokenType("NUMBER", "[0-9]*[.,]?[0-9]+$"),
  VAR: new TokenType("VAR", "\\bvar\\b"),
  LET: new TokenType("LET", "\\blet\\b"),
  ASSIGN: new TokenType("ASSIGN", `\=`),
  ADD: new TokenType("ADD", "\\+"),
  SUB: new TokenType("SUB", "\\-"),
  MUL: new TokenType("MUL", "\\*"),
  DIV: new TokenType("DIV", "/"),
  PRINTVARS: new TokenType("PRINTVARS", "\\bprintvars\\b"),
  PRINTFNS: new TokenType("PRINTFNS", "\\bprintfns\\b"),
  SPACE: new TokenType("SPACE", "[ \\n\\t\\r]"),
  IDENTIFIER: new TokenType("IDENTIFIER", "[a-zA-Z_$][a-zA-Z_$0-9]*"),
};

export default TokenType;
