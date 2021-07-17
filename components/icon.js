class IconElement extends HTMLElement {
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
   * @see {@link ComponentElement#attributeChangedCallback|attributeChangedCallback}
   */
  static get observedAttributes() {
    return ["icon", "text"];
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

  get icon() {
    return this.getAttribute("icon") || "home";
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  get text() {
    return this.getAttribute("text") || "home";
  }

  set text(value) {
    this.setAttribute("text", value);
  }

  _showDetail(event) {
    console.log(event);
  }

  _setActive(value) {
    const icon = this.shadowRoot.getElementById("icon");
    if (icon) {
      if (!!value === true) {
        icon.classList.add("active");
      } else {
        icon.classList.remove("active");
      }
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
      .icon {
        padding: 8px;
        background: #999999;
        margin: 12px 0;
        border-radius: 50px;
        width: 40px;
        height: 40px;
        left:0;
      }

      .icon:hover {
        background: #ececf9;
        box-shadow: rgb(230, 255, 255, 035) 0px 5px 15px;
      }

      .hidden {
        position: relative;
        color: #212121;
        text-shadow: -2px -2px 8px rgba(150, 150, 150, 1);
        font-size: 24px;
        min-width: 250px;
        height: 30px;
        align-content: center;
        left: 75;
        bottom: 55;
        display: none;
        padding: 25px;
        background-image: url("../assets/sign.png");
        background-repeat: no-repeat;
        background-size: 100% 60px;
        justify-content: center;
      }

      .text {
        width: 100%;
        text-align: center;
        line-height: 10px;
      }

      @keyframes show {
        from {
          transform: rotate(30deg);
          left: 60;
          bottom: 0;
          opacity: 0;
        }
        to {
          transform: rotate(0deg);
          left: 75;
          bottom: 55;
          opacity: 1;
        }
      }

      div:hover .hidden {
        display: block;
        animation-name: show;
        animation-duration: 0.6s;
      }

      .icon:active {
        background: #ffffff;
      }

      .active {
        background: #ffffff;
      }
    `;

    return style;
  }

  /**
   * Create the content
   *
   * @method
   * @returns {HTMLElement}
   */
  _createContent() {
    const content = document.createElement("div");
    content.id = "icon";
    content.className = "icon";
    content.innerHTML = `
      <img src="./assets/${this.icon}.png" alt="icon" width="40">
    `;
    content.append(this._createDetail());

    return content;
  }

  _createDetail() {
    const detail = document.createElement("div");
    detail.className = "hidden";

    const span = document.createElement("div");
    span.className = "text";
    span.innerText = this.text;

    detail.append(span);

    return detail;
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

    if( this.icon === "home") {
      this._setActive(true);
    }
  }
}

customElements.define("mao-icon", IconElement);
