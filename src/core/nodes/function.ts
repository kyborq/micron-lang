import Token from "../token";
import Expression from "./expression";

class Function extends Expression {
  fn: Token;
  identifier: Expression;

  constructor(fn: Token, identifier: Expression) {
    super();

    this.fn = fn;
    this.identifier = identifier;
  }
}

export default Function;
