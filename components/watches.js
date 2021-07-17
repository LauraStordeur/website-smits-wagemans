/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
class WatchesElement extends HTMLElement {
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
   * @see {@link WatchesElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * List of non reflecting properties that can trigger the propertyChangedCallback lifecycle method
   *
   * @readonly
   * @static
   * @see {@link WatchesElement#attributeChangedCallback|attributeChangedCallback}
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
      !WatchesElement.observedNonReflectingProperties.includes(propertyName)
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
      background-image:url("../assets/clock.jpg");
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
      background: rgb(128, 85, 0, 0.6);
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
      { filename: "jaguar.jpg", link: "https://jaguarswisswatches.com/en-GB" },
      { filename: "festina.png", link: "https://festina.com/en-GB" },
      { filename: "candino.jpg", link: "https://www.candino.com/en/" },
      { filename: "lotus.png", link: "https://lotus-watches.com/en-GB" },
      { filename: "calypso.jpg", link: "https://www.calypso-watch.com/en/" },
      { filename: "seiko.png", link: "https://www.seikowatches.com/" },
      {
        filename: "jacobjensen.png",
        link: "https://jacobjensendesign.com/watches",
      },
      {
        filename: "boccia.jpg",
        link: "https://www.boccia.com/collections/mens-watches",
      },
      { filename: "lorus.png", link: "http://www.loruswatches.com/" },
      { filename: "royal.jpg", link: "https://royallondonwatches.com/" },
      {
        filename: "casio.jpeg",
        link: "https://www.casio-europe.com/euro/products/watches/",
      },
      {
        filename: "pontiac.jpg",
        link: "http://www.pontiac.watch/en/about-en.php",
      },
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

customElements.define("mao-watch", WatchesElement);
