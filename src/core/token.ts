import TokenType from "./token-type";

class Token {
  type: TokenType;
  text: string;

  constructor(type: TokenType, text: string) {
    this.type = type;
    this.text = text;
  }
}

export default Token;
