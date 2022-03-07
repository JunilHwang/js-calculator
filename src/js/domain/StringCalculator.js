import { Operation } from "./Operation.js";

export class StringCalculator {
  #stack;
  #operation;

  constructor() {
    this.reset();
  }

  static of() {
    return new StringCalculator();
  }

  reset() {
    this.#stack = [];
    this.#operation = undefined;
  }

  push(number) {
    this.#stack.push(number);
  }

  set operation(operation) {
    if (operation === Operation.EQUALS.valueOf()) {
      return this.reset();
    }
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
