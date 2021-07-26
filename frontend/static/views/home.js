class HomeComponent extends HTMLElement {
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

  _logoElement() {
    const logo = document.createElement("img");
    logo.src = "/static/assets/smitsLogo.png";
    logo.className = "logo";

    const element = document.createElement("div");
    element.className = "images";
    element.append(this._pictureElement(), logo);

    return element;
  }

  _pictureElement() {
    const element = document.createElement("img");
    element.src = "/static/assets/smile.jpeg";
    element.className = "picture";

    return element;
  }

  _descriptionText() {
    return `
    Welkom bij Juweliers Smits-Wagemans.

    Voor een goede service en precisiewerk moet je bij Juweliers Smits-Wagemans zijn.
    Als je langsgaat bij Juweliers Smits-Wagemans zal je man en vrouw samen achter de toonbank aantreffen.
    Reeds meer dan 30 jaar herstellen ze uurwerken in hun eigen atelier en ontwerpen ze unieke juwelen.
    Indien je dat wenst kunnen ze zelfs met jouw oud goud een nieuw design ontwerpen Unieke creaties en veel meer.

    Bij Juweliers Smits-Wagemans kan je naast unieke en eigen ontworpen creaties ook terecht
    voor uurwerken en traditionele gouden en zilveren juwelen van bekende merken als zijnde
    Casio, Festina, Nona etc. In hun eigen atelier worden de uurwerken en klokken met uiterste precisie hersteld.
    Aan de juwelen kan je onmiddellijk merken dat er veel passie en liefde voor het vak bijzit.

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

  _createStyle() {
    const style = document.createElement("style");
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      .container {
        padding-top: 10px;
      }
      :host {
        --text-color-purple: #73264d;
      }

      .logo {
        display: block;
        width: 100%;
        background-color: black;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .picture {
        width: 100%;
      }
      .description-block {
        background: rgb(50, 50, 50, 0.3);
        color: var(--text-color-purple);
        flex-grow: 1;
        padding: 10px;
        font-size: 18px;
      }

      @media screen and (min-width: 600px) {
        .picture {
          height: auto;
          width: 800px;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
        .container {
          width: 100%;
          height: 100vh;
          background-image:url("/static/assets/pendant.jpeg");
          background-size: cover;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          overflow: auto;
        }
        .logo {
          display: none;
        }
        .description-block {
          color: silver;
          background: rgb(50, 50, 50, 0.8);
        }
        .images {
          padding: 0;
          width: calc(100vw - 250px);
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-evenly;
        }
      }
    `;

    return style;
  }

  _createContent() {
    const content = document.createElement("div");
    content.className = "container";
    content.append(this._logoElement(), this._descriptionElement());

    return content;
  }

  _render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._createStyle(), this._createContent());
  }
}

customElements.define("home-component", HomeComponent);
