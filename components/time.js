/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
class TimeElement extends HTMLElement {
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
   * @see {@link TimeElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * List of non reflecting properties that can trigger the propertyChangedCallback lifecycle method
   *
   * @readonly
   * @static
   * @see {@link TimeElement#attributeChangedCallback|attributeChangedCallback}
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
    if (!TimeElement.observedNonReflectingProperties.includes(propertyName)) {
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
    #page {
      width: calc(100vw - 70px);
      height: 100vh;
      background-image:url("../assets/vitrine.jpeg");
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
      background: rgb(50, 50, 50, 0.9);
      color: silver;
      flex-grow: 1;
      padding: 10px;
      font-size: 18px;
      display: flex;
      justify-content: space-around;
    }

    .time-element {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px;
      min-width: 350px;
      font-weight: bold;
      font-size: 18px;
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

  _logoElement() {
    const element = document.createElement("img");
    element.src = "../assets/logo.jpg";
    element.className = "logo";

    return element;
  }

  _timeElement({ day, hours }) {
    const div = document.createElement("div");
    div.className = "time-element";

    const dayElement = document.createElement("span");
    const hoursElement = document.createElement("span");

    dayElement.innerText = day;
    hoursElement.innerText = hours;

    div.append(dayElement, hoursElement);

    return div;
  }

  _TimeTableElement() {
    const daysTime = [
      { day: "Maandag", hours: "Gesloten" },
      { day: "Dinsdag", hours: "Gesloten" },
      { day: "Woensdag", hours: "10:00-12:30, 14:00-18:00" },
      { day: "Donderdag", hours: "10:00-12:30, 14:00-18:00" },
      { day: "Vrijdag", hours: "10:00-12:30, 14:00-18:00" },
      { day: "Zaterdag", hours: "09:00-16:00" },
      { day: "Zondag en Feestdagen", hours: "Gesloten" },
    ];

    const hoursTable = document.createElement("div");

    daysTime.forEach((item) => {
      hoursTable.append(this._timeElement(item));
    });

    return hoursTable;
  }

  _descriptionElement() {
    const element = document.createElement("section");
    element.className = "description-block";
    element.append(this._TimeTableElement());

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
    content.id = "page";
    content.append(this._descriptionElement());
    content.append(this._logoElement());

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

customElements.define("mao-time", TimeElement);
