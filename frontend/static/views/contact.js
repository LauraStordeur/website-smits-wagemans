class ContactElement extends HTMLElement {
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
    #page {
      width: calc(100vw - 250px);
      height: 100vh;
      background-image:url("static/assets/toog.jpeg");
      background-size: auto;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      overflow: auto;
      font-family: 'Quicksand', sans-serif;
      font-weight: bold;
      font-size: 24px;
    }

    .announcements {
      width: 100%;
      padding: 25px;
      margin: 65px 15px 25px 15px;
      background-color: #660000;
      color: silver;
      border-radius: 15px;
      font-weight: bold;
      font-family: 'Quicksand', sans-serif;
    }

    .description-block {
      background: rgb(50, 50, 50, 0.9);
      color: silver;
      flex-grow: 1;
      padding: 10px;
      font-size: 18px;
      width: calc(100vw - 250px);
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

    .map {
      width: 550px;
    }

    .logo {
      flex-grow: 1;
      max-width: 550px;
      background-color: black;
    }

    .link-wrapper {
      padding: 15px 65px;
      cursor: pointer;
      font-family: 'Quicksand', sans-serif;
      font-weight: bold;
      font-size: 18px;
      background-color: #800000;
      color: silver;
      margin-top: 15px;
    }

    .link {
      padding: 15px;
      text-decoration: none;
      color: var(--light-text-color);
    }
    @media only screen and (max-width: 600px) {
      .logo {
        width: 100vw;
      }
      .description-block {
        width: 100vw;
        display: flex;
        flex-direction: column;
        padding: 15px;
      }
      .map {
        width: 100%;
        display: block;
      }
      #page {
        width: 100vw;
      }
    }
    `;

    return style;
  }

  _logoElement() {
    const element = document.createElement("img");
    element.src = "static/assets/logo.jpg";
    element.className = "logo";

    return element;
  }

  _announcementsElement() {
    const text =
      "We zijn gesloten vanaf 15 augustus tot en met 28 september 2021.";

    const element = document.createElement("div");
    element.className = "announcements";
    element.innerText = text;

    return element;
  }

  _addressBlock() {
    const element = document.createElement("div");
    const link =
      "https://www.google.be/maps/place/Smits+%2F+Boudewijn/@50.9485963,4.7560517,16.5z/data=!4m5!3m4!1s0x47c15db79abe56ad:0x8f879ab78a2e837e!8m2!3d50.9477084!4d4.7545586";
    element.innerHTML = `
    <p>
      <div>
      <h4> Telefoon nummer: <a href="tel:016582170" class="link">016/58 21 70 </a></h4>
        Kerkstraat 17,</br>
        3111 Wezemaal,</br>
        België
      </div>
      <div class="link-wrapper">
        <a href="${link}"  class="link"> Plan uw rit!</a>
      </div>
    </p>
    `;

    return element;
  }

  _map() {
    const element = document.createElement("img");
    element.src = "/static/assets/access.PNG";
    element.className = "map";

    return element;
  }

  _descriptionElement() {
    const element = document.createElement("section");
    element.className = "description-block";
    element.append(this._addressBlock(), this._map());

    return element;
  }

  _createContent() {
    const content = document.createElement("div");
    content.id = "page";
    content.append(this._announcementsElement(), this._descriptionElement());
    content.append(this._logoElement());

    return content;
  }

  _render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._createStyle(), this._createContent());
  }
}

customElements.define("contact-component", ContactElement);
