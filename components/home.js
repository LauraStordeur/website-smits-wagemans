/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
class HomeElement extends HTMLElement {
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
   * @see {@link HomeElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * List of non reflecting properties that can trigger the propertyChangedCallback lifecycle method
   *
   * @readonly
   * @static
   * @see {@link HomeElement#attributeChangedCallback|attributeChangedCallback}
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
    if (!HomeElement.observedNonReflectingProperties.includes(propertyName)) {
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
    div {
      width: calc(100vw - 70px);
      height: 100vh;
      background-image:url("../assets/pendant.jpeg");
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      overflow: auto;
    }

    .description-block {
      background: rgb(50, 50, 50, 0.9);
      color: silver;
      flex-grow: 1;
      padding: 10px;
      font-size: 18px;
    }

    .logo {
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

  _logoElement() {
    const element = document.createElement('img');
    element.src = "../assets/logo.jpg";
    element.className = "logo";

    return element;
  }

  _descriptionText() {
    return `
    Welkom bij Juweliers Smits-Wagemans.

    Voor een goede service en precisiewerk moet je bij Juweliers Smits-Wagemans zijn
    Als je langsgaat bij Juweliers Smits-Wagemans zal je man en vrouw samen achter de toonbank aantreffen.
    Reeds meer dan 30 jaar herstellen ze uurwerken in hun eigen atelier en ontwerpen ze unieke juwelen.
    Indien je dat wenst kunnen ze zelfs met jouw oud goud een nieuw design ontwerpen.

    Unieke creaties en veel meer
    Bij Juweliers Smits-Wagemans kan je naast unieke en eigen ontworpen creaties ook terecht
    voor uurwerken en traditionele gouden en zilveren juwelen van bekende merken als zijnde
    Casio, Festina, Nona etc. In hun eigen atelier worden de uurwerken en klokken met uiterste precisie
    hersteld. Aan de juwelen kan je onmiddellijk merken dat er veel passie en liefde voor het vak bijzit.

    Jarenlange ervaring
    Het is dus al sinds 1978 dat ze bij Juweliers Smits-Wagemans met professionele zorg de juwelen en
    uurwerken tot een unieke schittering brengen. Ze zijn gelegen vlakbij de kerk van Wezemaal in de
    Kerkstraat te Rotselaar. Ben je op zoek naar een uniek pareltje van een juweel of heb je nood aan
    een nieuw uurwerk, ga dan langs bij Juweliers Smits-Wagemans en schitter door het leven.
    `;
  }

  _descriptionElement() {
    const element = document.createElement("section");
    element.className = "description-block";
    element.innerText = this._descriptionText();

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

customElements.define("mao-home", HomeElement);
