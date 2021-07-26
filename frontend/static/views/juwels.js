/**
 * The porphyrio-my-new-atom web component
 *
 * @class ComponentElement
 * @extends {HTMLElement}
 */
 class JuwelsElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    this._render();
  }

  disconnectedCallback() {
    this.shadowRoot.innerHTML = "";
  }

  _createStyle() {
    const style = document.createElement("style");
    style.textContent = `
    * {
    box-sizing: border-box;
  }
    .page {
      width: calc(100vw - 250px);
      height: 100vh;
      background-image:url("static/assets/jewelry.jpg");
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
      background: rgb(255, 102, 102, 0.2);
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
      height: 180px;
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

    @media only screen and (max-width: 600px) {
      .logo {
        width: 100%;
      }
      .description-block {
        width: 100%;
      }
      .page {
        width: 100vw;
      }
    }
    `;

    return style;
  }

  _brandElement({ filename, link }) {
    const a = document.createElement("a");
    a.href = link;
    const img = document.createElement("img");
    img.src = `static/assets/${filename}`;
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
    element.src = "static/assets/logo.jpg";
    element.className = "logo";

    return '';
  }


  _descriptionElement() {
    const element = document.createElement("section");
    element.className = "description-block";
    element.append(this._brandElements());

    return element;
  }

  _createContent() {
    const content = document.createElement("div");
    content.className = "page";
    content.append(this._logoElement());
    content.append(this._descriptionElement());

    return content;
  }

  _render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._createStyle(), this._createContent());
  }
}

customElements.define("juwels-component", JuwelsElement);
