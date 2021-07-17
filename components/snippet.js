/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
class SnippetElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this._addEventListeners();
  }

  /**
   * List of content attributes that can trigger the attributeChangedCallback lifecycle callback
   *
   * @static
   * @readonly
   * @see {@link SnippetElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * List of non reflecting properties that can trigger the propertyChangedCallback lifecycle method
   *
   * @readonly
   * @static
   * @see {@link SnippetElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedNonReflectingProperties() {
    return [];
  }

  /**
   * Lifecycle callback that is triggered when a content attribute is set or changed
   *
   * @method
   * @param {string} attributeName - The content attribute name
   * @param {string} oldValue - The previous value of the content attribute
   * @param {string} newValue - The current value of the content attribute
   */
  attributeChangedCallback() {
    if (!this.isConnected) {
      return;
    }

    this._render();
  }

  /**
   * Lifecycle callback that is triggered when a content attribute is set or changed
   *
   * @method
   * @param {string} attributeName - The content attribute name
   * @param {string} oldValue - The previous value of the content attribute
   * @param {string} newValue - The current value of the content attribute
   */
  _propertyChangedCallback() {
    if (!this.isConnected) {
      return;
    }

    this._render();
  }

  /**
   * Set an IDL attribute (DOM property) without reflecting to a content attribute
   *
   * @method
   * @param {string} propertyName
   * @param {*} value
   * @returns {void}
   */
  _setProperty(propertyName, value) {
    if (
      !SnippetElement.observedNonReflectingProperties.includes(propertyName)
    ) {
      return;
    }

    const privatePropertyName = `_${propertyName}`;
    const oldValue = this[privatePropertyName];

    this[privatePropertyName] = value;
    this._propertyChangedCallback(propertyName, oldValue, value);
  }

  /**
   * Lifecycle callback that is triggered when the host element is appended to the DOM
   *
   * @method
   */
  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    this._render();
  }

  /**
   * Lifecycle callback that is triggered when the host element is removed from the DOM
   *
   * @method
   */
  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }

  /**
   * Dispatch a custom event from the host element
   *
   * @method
   * @param {string} type
   * @param {*} [data={}]
   */
  _sendCustomEvent(type, data = {}) {
    this.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        detail: data,
      })
    );
  }

  /**
   * Create the style element
   *
   * @method
   * @returns {HTMLStyleElement}
   */
  _createStyle() {
    const style = document.createElement("style");
    style.textContent = ``;

    return style;
  }

  /**
   * Create the content
   *
   * @method
   * @returns {HTMLElement}
   */
  _createContent() {
    const content = document.createElement("section");
    content.textContent = "Hey it works!";

    return content;
  }

  /**
   * Add event listeners that need to be proxied
   * (click, focus, blur and input events do not need to be proxied)
   *
   * @method
   */
  _addEventListeners() {
    // ...
  }

  /**
   * Render the element
   *
   * @method
   * @returns {void}
   */
  _render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._createStyle(), this._createContent());
  }
}

customElements.define("new-component", SnippetElement);
