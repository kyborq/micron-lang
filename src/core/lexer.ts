import Token from "./token";

class Lexer {
  private position: number;

  constructor() {
    this.position = 0;
  }

  public tokenize(code: string): Token[] {
    return [];
  }
}

export default Lexer;
