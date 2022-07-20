import Token from "./token";
import { tokenTypeList } from "./token-type";
import { error, spaces } from "../utils";

class Lexer {
  command: string;
  tokens: Token[];
  pos: number;
  error: boolean;

  constructor(command: string) {
    this.command = command;
    this.tokens = [];
    this.pos = 0;
    this.error = false;
  }

  tokenize(): Token[] | null {
    while (this.nextToken()) {}

    this.tokens = this.tokens.filter(
      (t) => t.type.name !== tokenTypeList.SPACE.name
    );

    return !this.error ? this.tokens : null;
  }

  nextToken(): boolean {
    if (this.pos >= this.command.length) {
      return false;
    }

    const tokenTypeValues = Object.values(tokenTypeList);

    for (let i = 0; i < tokenTypeValues.length; i++) {
      const tokenType = tokenTypeValues[i];
      const regex = new RegExp(`^${tokenType.regex}`);
      const result = this.command.substring(this.pos).match(regex);

      if (result && result[0]) {
        const token = new Token(tokenType, result[0]);
        this.pos += result[0].length;
        this.tokens.push(token);
        return true;
      }
    }

    error(this.pos, "Ошибка синтаксиса");
    this.error = true;
    return false;
  }
}

export default Lexer;
