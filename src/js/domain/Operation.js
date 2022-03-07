export class Operation {
  static PLUS = new Operation("+", (x, y) => x + y);
  static SUBTRACT = new Operation("-", (x, y) => x - y);
  static MULTIPLY = new Operation("*", (x, y) => x * y);
  static DIVISION = new Operation("/", (x, y) => x / y);
  static EQUALS = new Operation("=");

  operator;
  operation;

  constructor(operator, operation) {
    this.operator = operator;
    this.operation = operation;
  }

  static execute(operator, x, y) {
    return Object.values(Operation)
      .find((v) => v.operator === operator)
      .operation(x, y);
  }

  valueOf() {
    return this.operator;
  }

  toString() {
    return this.valueOf();
  }
}
