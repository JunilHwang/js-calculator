import { Operation } from "./Operation.js";

export class StringCalculator {
  #stack;
  #operation;

  constructor() {
    this.#stack = [];
  }

  static of() {
    return new StringCalculator();
  }

  push(number) {
    this.#stack.push(number);
  }

  set operation(operation) {
    this.#operation = operation;
  }

  execute() {
    const [x, y] = this.#stack;
    if (y === undefined) {
      return x;
    }
    const result = Operation.execute(this.#operation, x, y);
    this.#stack = [result];
    return result;
  }
}
