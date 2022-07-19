import BinarOperation from "./nodes/binar-operation";
import Expression from "./nodes/expression";
import Function from "./nodes/function";
import Identifier from "./nodes/identifier";
import Number from "./nodes/number";
import UnarOperation from "./nodes/unar-operation";
import Variable from "./nodes/variable";
import ZeroOperation from "./nodes/zero-operation";
import Token from "./token";
import TokenType, { tokenTypeList } from "./token-type";

class Parser {
  tokens: Token[];
  pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  match(...expected: TokenType[]): Token | null {
    if (this.pos < this.tokens.length) {
      const currentToken = this.tokens[this.pos];

      if (expected.find((type) => type.name === currentToken.type.name)) {
        this.pos += 1;
        return currentToken;
      }
    }

    return null;
  }

  parseVariableOrNumber(): Expression {
    // console.log(this.tokens);
    const number = this.match(tokenTypeList.NUMBER);
    if (number) {
      return new Number(number);
    }

    const variable = this.match(tokenTypeList.VAR, tokenTypeList.LET);
    const identifier = this.match(tokenTypeList.IDENTIFIER);
    if (variable && identifier) {
      return new Variable(variable, identifier);
    }

    if (identifier) {
      return new Identifier(identifier);
    }

    throw new Error("Ожидалась переменная или число " + this.pos);
  }

  parseFormula(): Expression {
    let leftNode = this.parseVariableOrNumber();
    let operator = this.match(
      tokenTypeList.ADD,
      tokenTypeList.SUB,
      tokenTypeList.MUL,
      tokenTypeList.DIV
    );
    while (operator !== null) {
      const rightNode = this.parseVariableOrNumber();
      leftNode = new BinarOperation(operator, leftNode, rightNode);
      operator = this.match(
        tokenTypeList.ADD,
        tokenTypeList.SUB,
        tokenTypeList.MUL,
        tokenTypeList.DIV
      );
    }
    return leftNode;
  }

  parseIdentifier(): Expression {
    const identifier = this.match(tokenTypeList.IDENTIFIER);
    if (identifier) {
      return new Identifier(identifier);
    }

    throw new Error("Ожидалась переменная");
  }

  parsePrint() {
    const operator = this.match(
      tokenTypeList.PRINT,
      tokenTypeList.PRINTVARS,
      tokenTypeList.PRINTFNS
    );

    if (operator !== null) {
      if (operator.type.name === tokenTypeList.PRINT.name) {
        const id = this.parseIdentifier();
        return new UnarOperation(operator, id);
      }

      if (operator.type.name === tokenTypeList.PRINTVARS.name) {
        return new ZeroOperation(operator);
      }

      if (operator.type.name === tokenTypeList.PRINTFNS.name) {
        return new ZeroOperation(operator);
      }
    }

    throw new Error(
      `Ожидается унарный оператор ${operator?.text} на ${this.pos} позиции`
    );
  }

  parseFunction(): Expression {
    const operator = this.match(tokenTypeList.FUNCTION);

    if (operator) {
      const id = this.parseIdentifier();

      const node = new Function(operator, id);
      const assignOperator = this.match(tokenTypeList.ASSIGN);
      if (assignOperator !== null) {
        const rightFormulaNode = this.parseFormula();
        const binaryNode = new BinarOperation(
          assignOperator,
          node,
          rightFormulaNode
        );
        return binaryNode;
      }
    }

    throw new Error("asdfasdf");
  }

  parseExpression(): Expression {
    if (this.match(tokenTypeList.FUNCTION) !== null) {
      this.pos -= 1;

      const fn = this.parseFunction();
      return fn;
    }

    // this.pos -= 1;

    if (this.match(tokenTypeList.VAR, tokenTypeList.LET) === null) {
      const printNode = this.parsePrint();
      return printNode;
    }

    this.pos -= 1;

    const variableNode = this.parseVariableOrNumber() as Variable;
    const assignOperator = this.match(tokenTypeList.ASSIGN);

    if (assignOperator !== null) {
      if (variableNode.variable.type.name === tokenTypeList.LET.name) {
        const rightFormulaNode = this.parseVariableOrNumber();
        const binaryNode = new BinarOperation(
          assignOperator,
          variableNode,
          rightFormulaNode
        );
        return binaryNode;
      }
    }

    if (variableNode.variable.type.name === tokenTypeList.VAR.name) {
      const unarNode = new UnarOperation(variableNode.variable, variableNode);
      return unarNode;
    }

    throw new Error("Ошибка присвоения переменной");
  }

  parse(): Expression {
    // const nodes: Expression[] = [];
    let node = new Expression();

    while (this.pos < this.tokens.length) {
      // nodes.push(this.parseExpression());
      node = this.parseExpression();
    }

    return node;
  }
}

export default Parser;
