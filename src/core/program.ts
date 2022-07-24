import Lexer from "./lexer";
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
import Parser from "./parser";
import Token from "./token";
import { tokenTypeList } from "./token-type";
import { error } from "../utils";
import Executer from "./executer";

interface IScope {
  [key: string]: number | "NaN";
}

interface IFunctionsScope {
  [key: string]: BinarOperation;
}

class Program {
  tokens: Token[];
  history: string[];

  variables: IScope = {};
  functions: IFunctionsScope = {};

  constructor() {
    this.tokens = [];
    this.history = [];
  }

  execute(command: string) {
    const lexer = new Lexer(command);
    const tokens = lexer.tokenize();

    if (tokens) {
      const parser = new Parser(tokens);
      const node = parser.parse();

      if (node) {
        this.run(node);
        // const executer = new Executer(node);
        // executer.run();
      }
    }
  }

  getVarFromNode(node: Expression): number | "NaN" {
    const id = node as Identifier;
    const name = id.identifier.text;
    const value = this.variables[name];

    return value;
  }

  printVariables() {
    const sortedVariables = Object.keys(this.variables)
      .sort()
      .reduce((obj: IScope, key) => {
        obj[key] = this.variables[key];
        return obj;
      }, {});

    const vars = Object.keys(sortedVariables);
    vars.forEach((variable) => {
      const value = parseFloat(`${this.variables[variable]}`).toFixed(2);
      console.log(`${variable}:${value}`);
    });
  }

  printFunctions() {
    const sortedFunctions = Object.keys(this.functions)
      .sort()
      .reduce((obj: IFunctionsScope, key) => {
        obj[key] = this.functions[key];
        return obj;
      }, {});

    const fns = Object.keys(sortedFunctions);
    fns.forEach((f) => {
      const n = this.functions[f] as BinarOperation;
      const result = this.run(n.rightNode);
      const value = parseFloat(`${result}`).toFixed(2);
      console.log(`${f}:${value}`);
    });
  }

  run(node: Expression): any {
    if (node instanceof Number) {
      return parseFloat(node.number.text);
    }

    if (node instanceof UnarOperation) {
      switch (node.operator.type.name) {
        case tokenTypeList.VAR.name: {
          const id = node.operand as Variable;
          this.variables[id.identifier.text] = "NaN";
          return;
        }
        case tokenTypeList.PRINT.name: {
          const id = node.operand as Identifier;
          const name = id.identifier.text;

          if (Object.keys(this.variables).includes(name)) {
            const value = parseFloat(`${this.variables[name]}`).toFixed(2);
            console.log(value);
          }

          if (Object.keys(this.functions).includes(name)) {
            const n = this.functions[name] as BinarOperation;
            const result = this.run(n.rightNode);
            const value = parseFloat(`${result}`).toFixed(2);
            console.log(value);
          }

          return;
        }
      }
    }

    if (node instanceof ZeroOperation) {
      switch (node.operator.type.name) {
        case tokenTypeList.PRINTVARS.name: {
          this.printVariables();
          return;
        }
        case tokenTypeList.PRINTFNS.name: {
          this.printFunctions();
          return;
        }
      }
    }

    if (node instanceof Identifier) {
      const name = node.identifier.text;

      if (Object.keys(this.variables).includes(name)) {
        const n = this.variables[name] as number;
        return n;
      } else if (Object.keys(this.functions).includes(name)) {
        const n = this.functions[name] as BinarOperation;
        const result = this.run(n.rightNode);
        return result;
      }

      error(0, `Переменная ${node.identifier.text} не обнаружена`);
      return;
    }

    if (node instanceof BinarOperation) {
      switch (node.operator.type.name) {
        case tokenTypeList.ADD.name: {
          if (
            this.getVarFromNode(node.leftNode) !== "NaN" ||
            this.getVarFromNode(node.rightNode) !== "NaN"
          ) {
            return this.run(node.leftNode) + this.run(node.rightNode);
          } else {
            return "NaN";
          }
        }
        case tokenTypeList.SUB.name: {
          if (
            this.getVarFromNode(node.leftNode) !== "NaN" ||
            this.getVarFromNode(node.rightNode) !== "NaN"
          ) {
            return this.run(node.leftNode) - this.run(node.rightNode);
          } else {
            return "NaN";
          }
        }
        case tokenTypeList.MUL.name: {
          if (
            this.getVarFromNode(node.leftNode) !== "NaN" ||
            this.getVarFromNode(node.rightNode) !== "NaN"
          ) {
            return this.run(node.leftNode) * this.run(node.rightNode);
          } else {
            return "NaN";
          }
        }
        case tokenTypeList.DIV.name: {
          if (
            this.getVarFromNode(node.leftNode) !== "NaN" ||
            this.getVarFromNode(node.rightNode) !== "NaN"
          ) {
            return this.run(node.leftNode) / this.run(node.rightNode);
          } else {
            return "NaN";
          }
        }
        case tokenTypeList.ASSIGN.name:
          const result = this.run(node.rightNode);
          const currentNode = node.leftNode;
          if (currentNode instanceof Variable) {
            this.variables[currentNode.identifier.text] = result;
            return result;
          }
          if (currentNode instanceof Function) {
            const id = currentNode.identifier as Identifier;
            if (!Object.keys(this.variables).includes(id.identifier.text)) {
              this.functions[id.identifier.text] = node;
            } else {
              error(0, "Идентификатор уже существует");
              return;
            }
            return result;
          }
      }
    }
  }
}

export default Program;
