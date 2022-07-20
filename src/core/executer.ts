import {
  BinarOperation,
  Expression,
  Identifier,
  Number,
  UnarOperation,
  Variable,
} from "./nodes";

interface IVariableScope {
  [key: string]: number | "NaN";
}

interface IFunctionsScope {
  [key: string]: BinarOperation;
}

class Executer {
  private node: Expression;

  private variables: IVariableScope = {};
  private functions: IFunctionsScope = {};

  constructor(node: Expression) {
    this.node = node;
  }

  getVariables() {
    return this.variables;
  }

  getFunctions() {
    return this.functions;
  }

  private getNumber(): number {
    const node = this.node as Number;
    return parseFloat(node.number.text);
  }
  private getIdentifier() {
    const node = this.node as Identifier;
    const name = node.identifier.text;

    const variable = this.variables[name];
    if (variable) {
      return variable;
    }

    const fn = this.functions[name];
    if (fn) {
      const value = this.run(fn.rightNode);
      return value;
    }
  }

  private print() {
    const node = this.node as UnarOperation;
    const operand = node.operand as Identifier;

    const name = operand.identifier.text;

    const variable = this.variables[name];
    if (variable) {
      const value = parseFloat(`${variable}`).toFixed(2);
      console.log(value);
    }

    const fn = this.functions[name];
    if (fn) {
      const result = this.run(fn.rightNode);
      const value = parseFloat(`${result}`).toFixed(2);
      console.log(value);
    }
  }
  private printVars() {
    const sortedVariables = Object.keys(this.variables)
      .sort()
      .reduce((obj: IVariableScope, key) => {
        obj[key] = this.variables[key];
        return obj;
      }, {});

    const variables = Object.keys(sortedVariables);
    variables.forEach((name) => {
      const variable = this.variables[name];

      console.log(variable);
    });
  }
  private printFns() {
    const sortedFunctions = Object.keys(this.variables)
      .sort()
      .reduce((obj: IFunctionsScope, key) => {
        obj[key] = this.functions[key];
        return obj;
      }, {});

    const functions = Object.keys(sortedFunctions);
    functions.forEach((name) => {
      const fn = this.functions[name];
      const result = this.run(fn.rightNode);
      const value = parseFloat(`${result}`).toFixed(2);

      console.log(value);
    });
  }

  private declareVar() {
    const node = this.node as UnarOperation;
    const id = node.operand as Variable;
    const name = id.identifier.text;

    this.variables[name] = "NaN";
  }
  private declareLet() {
    const node = this.node as BinarOperation;
    const id = node.leftNode as Identifier;
    const name = id.identifier.text;

    const result = this.run(node.rightNode);

    this.variables[name] = result;
  }
  private declareFn() {
    const node = this.node as BinarOperation;
    const id = node.leftNode as Identifier;
    const name = id.identifier.text;

    this.functions[name] = node;
  }

  private zeroOperation() {}
  private unarOperation() {}
  private binarOperation() {}

  run(node?: Expression): any {}
}

export default Executer;
