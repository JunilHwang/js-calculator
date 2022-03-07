export class Component {
  $el;
  props;
  #state = {};

  constructor($el, props = {}) {
    this.$el = $el;
    this.props = props;
    this.#render();
  }

  get state() {
    return Object.entries(this.#state).reduce((state, [key, value]) => {
      Object.defineProperty(state, key, {
        get() {
          return value;
        },
      });
      return state;
    }, {});
  }

  setState(state) {
    this.#state = { ...state };
    this.#render();
  }

  #render() {
    requestAnimationFrame(() => {
      this.$el.innerHTML = this.render();
    });
  }

  render() {
    return "";
  }
}
