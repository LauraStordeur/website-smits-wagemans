class WatchesElement extends HTMLElement {
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
      background-image:url("static/assets/clock.jpg");
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

    @media screen and (max-width: 600px) {
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
    img.src = `/static/assets/${filename}`;
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
    element.src = "static/assets/logo.jpg";
    element.className = "logo";

    return element;
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

customElements.define("watches-component", WatchesElement);
