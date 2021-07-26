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
      background-image:url("static/assets/vitrine.jpeg");
      background-size: auto;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      overflow: auto;
      font-family: 'Quicksand', sans-serif;
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
      background: rgb(50, 50, 50, 0.7);
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

    .logo {
      display: none;
      flex-grow: 1;
      max-width: 450px;
      background-color: black;
    }

    @media only screen and (max-width: 600px) {
      .logo {
        display: block;
        width: 250px;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .description-block {
        width: 100vw;
        padding: 15px;
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
    element.src = "static/assets/smitsLogo.png";
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

  _announcementsElement() {
    const text = "We zijn op jaarlijks verlof vanaf 12 augustus tot en met 28 september 2021.";

    const element = document.createElement("div");
    element.className = "announcements";
    element.innerText = text;

    return element;
  }

  _descriptionElement() {
    const element = document.createElement("section");
    element.className = "description-block";
    element.append(this._TimeTableElement());

    return element;
  }

  _createContent() {
    const content = document.createElement("div");
    content.id = "page";
    content.append( this._announcementsElement(), this._descriptionElement());
    content.append(this._logoElement());

    return content;
  }

  _render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._createStyle(), this._createContent());
  }
}

customElements.define("uren-component", TimeElement);
