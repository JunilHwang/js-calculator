import { Component } from "./core";

const Operations = {
  EQUAL: "=",
  PLUS: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVISION: "/",
};

export class App extends Component {
  initState() {
    return {
      stack: [0],
      stackTop: 0,
    };
  }

  get lastStackValue() {
    const { stack, stackTop } = this.state;
    return stack[stackTop];
  }

  reset = () => {
    this.setState(this.initState());
  };

  handleNumberClick = (event) => {
    const value = Number(event.target.innerHTML.trim());
    this.setState({
      stack: [Number(`${this.lastStackValue}${value}`)],
    });
  };

  handleOperationClick = (event) => {
    const value = event.target.innerHTML.trim();
    this.preCalculate();
  };

  preCalculate(y) {
    if (this.state.stackTop === 0) return;

    const stack = [...this.state.stack];
    const operator = stack.pop();
    const x = stack.pop();
    this.setState({
      stack: [this.getResult(operator, x, y)],
      stackTop: 0,
    });
  }

  getResult(operator, x, y) {
    return {
      [Operations.PLUS]: x + y,
      [Operations.SUBTRACT]: x - y,
      [Operations.MULTIPLY]: x * y,
      [Operations.DIVISION]: x / y,
    }[operator];
  }

  get Numbers() {
    return Array(10)
      .fill(9)
      .map(
        (v, k) => `
            <button class="digit">${v - k}</button>
          `
      )
      .join("");
  }

  render() {
    return `
      <div class="calculator">
        <h1 id="total">${this.lastStackValue}</h1>
        <div class="digits flex">
          ${this.Numbers}
        </div>
        <div class="modifiers subgrid">
          <button class="modifier">AC</button>
        </div>
        <div class="operations subgrid">
          <button class="operation">/</button>
          <button class="operation">X</button>
          <button class="operation">-</button>
          <button class="operation">+</button>
          <button class="operation">=</button>
        </div>
      </div>
    `;
  }

  mounted() {
    this.addEvent("click", ".digit", this.handleNumberClick);
    this.addEvent("click", ".modifiers", this.reset);
    this.addEvent("click", ".operation", this.handleOperationClick);
  }
}
