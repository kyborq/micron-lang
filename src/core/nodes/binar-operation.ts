import Token from "../token";
import Expression from "./expression";

class BinarOperation extends Expression {
  operator: Token;
  leftNode: Expression;
  rightNode: Expression;

  constructor(operator: Token, leftNode: Expression, rightNode: Expression) {
    super();

    this.operator = operator;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

export default BinarOperation;
