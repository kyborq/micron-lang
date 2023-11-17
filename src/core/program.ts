import Interpreter from "./interpreter";
import Lexer from "./lexer";
import Parser from "./parser";

class Program {
  private lexer: Lexer;
  private parser: Parser;
  private code: string;
  private interpreter: Interpreter;

  constructor(code: string) {
    this.lexer = new Lexer();
    this.parser = new Parser();
    this.interpreter = new Interpreter();
    this.code = code;
  }

  public execute() {
    const tokens = this.lexer.tokenize(this.code);
    const nodes = this.parser.parse(tokens);
    const output = this.interpreter.run(nodes);

    return {
      variables: [],
      functions: [],
      output: output,
    };
  }
}

export default Program;
