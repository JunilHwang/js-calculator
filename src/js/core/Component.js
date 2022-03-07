export class Component {
  $el;
  props;
  #state;

  constructor($el, props = {}) {
    this.$el = $el;
    this.props = props;
    this.#state = this.initState();
    this.#render();
  }

  initState() {
    return {};
  }

  get state() {
    return Object.entries(this.#state).reduce((state, [key, value]) => {
      Object.defineProperty(state, key, {
        value,
        writable: false,
      });
      return state;
    }, {});
  }

  setState(state) {
    this.#state = { ...this.#state, ...state };
    this.#render();
  }

  #render() {
    requestAnimationFrame(() => {
      this.beforeMount();
      this.$el.innerHTML = this.render().trim();
      this.mounted();
    });
  }

  render() {
    throw new Error(
      `${this.constructor.name} class에 render method가 필요합니다.`
    );
  }

  beforeMount() {}

  mounted() {}

  addEvent(eventType, selector, eventListener) {
    this.$el
      .querySelectorAll(selector)
      .forEach(($target) => $target.addEventListener(eventType, eventListener));
  }

  toString() {
    return this.render();
  }
}
