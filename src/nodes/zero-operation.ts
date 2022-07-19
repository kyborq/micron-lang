import Token from "../token";
import Expression from "./expression";

class ZeroOperation extends Expression {
  operator: Token;

  constructor(operator: Token) {
    super();

    this.operator = operator;
  }
}

export default ZeroOperation;
