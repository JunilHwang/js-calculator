import { Operation } from "./Operation";

export class StringCalculator {
  #stack;
  #lastOperation;

  constructor() {
    this.#stack = [0];
  }

  get stackTop() {
    return this.#stack[this.#stack.length - 1];
  }

  push(number) {
    this.#stack.push(number);
  }

  addOperation(operation) {
    if (this.#stack.length > 1) {
      this.#calculate();
    }
    this.#lastOperation = operation;
  }

  #calculate() {
    const y = this.#stack.pop();
    const x = this.#stack.pop();
    this.#stack.push(Operation.execute(this.#lastOperation, x, y));
  }
}
