import { Component } from "./core";
import { Operation, StringCalculator } from "./domain";

export class App extends Component {
  calculator = StringCalculator.of();

  initState() {
    return {
      currentValue: 0,
      inputNumber: true,
    };
  }

  reset = () => {
    this.calculator = StringCalculator.of();
    this.setState(this.initState());
  };

  handleNumberClick = (event) => {
    const value = Number(event.target.innerHTML.trim());
    this.setState({
      currentValue: this.nextCurrentValue(value),
      inputNumber: true,
    });
  };

  nextCurrentValue(value) {
    const { inputNumber } = this.state;
    if (inputNumber) return Number(`${this.state.currentValue}${value}`);
    return value;
  }

  handleOperationClick = (event) => {
    const value = event.target.innerHTML.trim();
    const { calculator, state } = this;
    const isEquals = value === Operation.EQUALS.valueOf();
    calculator.push(state.currentValue);

    this.setState({
      inputNumber: false,
      currentValue: this.calculator.execute(),
    });

    if (isEquals) return;
    calculator.operation = value;
  };

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
        <h1 id="total">${this.state.currentValue}</h1>
        <div class="digits flex">
          ${this.Numbers}
        </div>
        <div class="modifiers subgrid">
          <button class="modifier">AC</button>
        </div>
        <div class="operations subgrid">
          <button class="operation">${Operation.DIVISION}</button>
          <button class="operation">${Operation.MULTIPLY}</button>
          <button class="operation">${Operation.SUBTRACT}</button>
          <button class="operation">${Operation.PLUS}</button>
          <button class="operation">${Operation.EQUALS}</button>
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
