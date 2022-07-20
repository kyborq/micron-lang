import Token from "../token";
import Expression from "./expression";

class UnarOperation {
  operator: Token;
  operand: Expression;

  constructor(operator: Token, operand: Expression) {
    this.operator = operator;
    this.operand = operand;
  }
}

export default UnarOperation;
