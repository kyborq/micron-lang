import Token from "../token";
import Expression from "./expression";

class Variable extends Expression {
  variable: Token;
  identifier: Token;

  constructor(variable: Token, identifier: Token) {
    super();
    this.variable = variable;
    this.identifier = identifier;
  }
}

export default Variable;
