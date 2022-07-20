import {
  BinarOperation,
  Expression,
  Identifier,
  Number,
  UnarOperation,
  Variable,
  ZeroOperation,
  Function,
} from "./nodes";
import Token from "./token";
import TokenType, { tokenTypeList } from "./token-type";
import { error } from "../utils";

class Parser {
  tokens: Token[];
  pos: number = 0;
  error: boolean = false;

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

  parseVariableOrNumber(): Expression | null {
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

    error(this.pos, "Ожидалась переменная или число");
    return null;
  }

  parseFormula(): Expression {
    let leftNode = this.parseVariableOrNumber() as Expression;
    let operator = this.match(
      tokenTypeList.ADD,
      tokenTypeList.SUB,
      tokenTypeList.MUL,
      tokenTypeList.DIV
    );
    while (operator !== null) {
      const rightNode = this.parseVariableOrNumber() as Expression;
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

  parseIdentifier(): Expression | null {
    const identifier = this.match(tokenTypeList.IDENTIFIER);
    if (identifier) {
      return new Identifier(identifier);
    }

    error(this.pos, "Ожидался идентификатор");
    return null;
  }

  parsePrint(): Expression | null {
    const operator = this.match(
      tokenTypeList.PRINT,
      tokenTypeList.PRINTVARS,
      tokenTypeList.PRINTFNS
    );

    if (operator !== null) {
      if (operator.type.name === tokenTypeList.PRINT.name) {
        const id = this.parseIdentifier() as Expression;
        return new UnarOperation(operator, id);
      }

      if (operator.type.name === tokenTypeList.PRINTVARS.name) {
        return new ZeroOperation(operator);
      }

      if (operator.type.name === tokenTypeList.PRINTFNS.name) {
        return new ZeroOperation(operator);
      }
    }

    error(this.pos, `Ожидался оператор`);
    return null;
  }

  parseFunction(): Expression | null {
    const operator = this.match(tokenTypeList.FUNCTION);

    if (operator) {
      const id = this.parseIdentifier() as Expression;

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

    error(this.pos, "Ожидалась функция");
    return null;
  }

  parseExpression(): Expression | null {
    if (this.match(tokenTypeList.FUNCTION) !== null) {
      this.pos -= 1;

      const fn = this.parseFunction();
      return fn;
    }

    if (this.match(tokenTypeList.VAR, tokenTypeList.LET) === null) {
      const printNode = this.parsePrint();
      return printNode;
    }

    this.pos -= 1;

    const variableNode = this.parseVariableOrNumber() as Variable;
    const assignOperator = this.match(tokenTypeList.ASSIGN);

    if (assignOperator !== null) {
      if (variableNode.variable.type.name === tokenTypeList.LET.name) {
        const rightFormulaNode = this.parseVariableOrNumber() as Expression;
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

    error(this.pos, "Ошибка присвоения переменной");
    return null;
  }

  parse(): Expression | null {
    while (this.pos < this.tokens.length) {
      const node = this.parseExpression();
      if (node) {
        return node;
      }
    }

    return null;
  }
}

export default Parser;
