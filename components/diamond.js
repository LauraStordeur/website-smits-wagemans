/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
class DiamondElement extends HTMLElement {
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
   * @see {@link DiamondElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * List of non reflecting properties that can trigger the propertyChangedCallback lifecycle method
   *
   * @readonly
   * @static
   * @see {@link DiamondElement#attributeChangedCallback|attributeChangedCallback}
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
      !DiamondElement.observedNonReflectingProperties.includes(propertyName)
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
    style.textContent = `
    .page {
      width: calc(100vw - 70px);
      height: 100vh;
      background-image:url("../assets/jewelry.jpg");
      background-size: auto;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      overflow: auto;
    }

    .description-block {
      background: rgb(255, 102, 102, 0.5);
      color: silver;
      flex-grow: 1;
      padding: 10px;
      font-size: 18px;
    }

    .brand-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .brand-item {
      height: 120px;
      display: block;
      margin: 5px;
      background: white;
      padding: 2px;
    }

    .logo {
      flex-grow: 1;
      max-width: 550px;
      background-color: black;
    }

    @media only screen and (max-width: 500px) {
      .logo {
        width: 100%;
      }
    }
    `;

    return style;
  }

  _brandElement({ filename, link }) {
    const a = document.createElement("a");
    a.href = link;
    const img = document.createElement("img");
    img.src = `../assets/${filename}`;
    img.className = "brand-item";

    a.append(img);
    return a;
  }

  _brandElements() {
    const brandFiles = [
      { filename: "orage.jpg", link: "http://www.orage.be/" },
      { filename: "fjf.png", link: "https://www.fjf-jewellery.com/" },
      { filename: "pertutti.png", link: "https://www.diamantipertutti.com/" },
      { filename: "ferarri.png", link: "https://www.ferrarifirenze.com/" },
      {
        filename: "auro.jpg",
        link: "https://www.vdbvr.com/en/collections/111/aurodesign",
      },
      { filename: "dulci.jpg", link: "https://www.dulcinea.be/" },
    ];

    const container = document.createElement("div");
    container.className = "brand-container";
    brandFiles.forEach((brand) => {
      container.append(this._brandElement(brand));
    });

    return container;
  }

  _logoElement() {
    const element = document.createElement("img");
    element.src = "../assets/logo.jpg";
    element.className = "logo";

    return element;
  }

  _descriptionText() {
    return `

    `;
  }

  _descriptionElement() {
    const element = document.createElement("section");
    element.className = "description-block";
    element.append(this._brandElements());

    return element;
  }

  /**
   * Create the content
   *
   * @method
   * @returns {HTMLElement}
   */
  _createContent() {
    const content = document.createElement("div");
    content.className = "page";
    content.append(this._logoElement());
    content.append(this._descriptionElement());

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

customElements.define("mao-diamond", DiamondElement);
