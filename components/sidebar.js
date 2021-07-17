/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
class SidebarElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });
  }

  /**
   * List of content attributes that can trigger the attributeChangedCallback lifecycle callback
   *
   * @static
   * @readonly
   * @see {@link SidebarElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return ["active-path"];
  }

  /**
   * List of non reflecting properties that can trigger the propertyChangedCallback lifecycle method
   *
   * @readonly
   * @static
   * @see {@link SidebarElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedNonReflectingProperties() {
    return ["iconList"];
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
      !SidebarElement.observedNonReflectingProperties.includes(propertyName)
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
   * iconList Property (Non Reflecting Attribute)
   *
   * @param {sting[]} iconList
   */
  set iconList(value) {
    this._setProperty("iconList", value);
  }

  /**
   * iconList Property (Non Reflecting Attribute)
   *
   * @param {sting[]} iconList
   */
  get iconList() {
    return this._iconList || ["home"];
  }

  _setActivePath(value) {
    if (this.iconList) {
      this.iconList.forEach(({icon}) => {
        const element = this.shadowRoot.getElementById(icon);
        if (element.icon === value) {
          element._setActive(true);
        } else {
          element._setActive(false);
        }
      });
    }
  }

  /**
   * Create the style element
   *
   * @method
   * @returns {HTMLStyleElement}
   */
  _createStyle() {
    const style = document.createElement("style");
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
      }

      .sidebar {
        height: 100vh;
        width: 70px;
        background: #212121;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `;

    return style;
  }

  /**
   * Create the icon elements for the navigation
   *
   * @method
   * @return {void}
   */
  _createIconList(content) {
    if (this.iconList) {
      this.iconList.forEach(({ icon, text }) => {
        const i = document.createElement("mao-icon");
        i.icon = icon;
        i.id = icon;
        i.text = text;
        i.addEventListener("click", () => this._navigate(icon));
        content.append(i);
      });
    }
  }

  /**
   *Sends custom event to tell parent component to navigate or display a certain page
   *
   * @param {string} path
   */
  _navigate(path) {
    this._sendCustomEvent("navigate", path);
  }

  /**
   * Create the content
   *
   * @method
   * @returns {HTMLElement}
   */
  _createContent() {
    const content = document.createElement("section");
    content.className = "sidebar";

    this._createIconList(content);
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

customElements.define("mao-sidebar", SidebarElement);
