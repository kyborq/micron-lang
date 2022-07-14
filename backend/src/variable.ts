export type ValueType = number | "NaN";

class Variable {
  name: string;
  value: ValueType;

  constructor(name: string, value: ValueType) {
    this.name = name;
    this.value = value;
  }

  getVariable() {
    return {
      name: this.name,
      value: this.value,
    };
  }
}

export default Variable;
