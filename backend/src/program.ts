import Parser from "./parser";
import Variable from "./variable";

class Program {
  variables: Variable[];
  functions: any[];
  history: string[];

  constructor() {
    this.variables = [];
    this.functions = [];
    this.history = [];
  }

  printVariable(variable: Variable) {
    // print <id>
    const findedVariable = this.variables.find((v) => v.name === variable.name);
    if (findedVariable) {
      console.log(findedVariable.value);
    }
  }

  printVariables() {
    // printvars
    this.variables.forEach((v) => {
      console.log(`${v.name}:${v.value}`);
    });
  }

  printFunctions() {
    // printfns
  }

  execute(command: string) {
    this.history.push(command);

    const parser = new Parser();
    parser.parse(command);
  }
}

export default Program;
