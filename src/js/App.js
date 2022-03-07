import { Component } from "./core";

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

  handleNumberClick = (event) => {
    const value = Number(event.target.innerHTML.trim());
    this.setState({
      stack: [Number(`${this.lastStackValue}${value}`)],
    });
  };

  mounted() {
    this.addEvent("click", ".digit", this.handleNumberClick);
  }

  render() {
    return `
      <div class="calculator">
        <h1 id="total">${this.lastStackValue}</h1>
        <div class="digits flex">
          ${Array(10)
            .fill(9)
            .map(
              (v, k) => `
            <button class="digit">${v - k}</button>
          `
            )
            .join("")}
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
}
