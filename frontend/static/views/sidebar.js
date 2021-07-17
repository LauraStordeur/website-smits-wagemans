class SidebarComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.addEventListener("click", this._handleEvents.bind(this));
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

  _toggleMenu() {
    const navStyle = this.shadowRoot.getElementById("nav").style;
    const navDisplay = navStyle.display;

    navStyle.display = navDisplay === "none" || !navDisplay ? "flex" : "none";
  }

  _handleEvents(event) {
    if (event.path[0].id === "menu") {
      this._toggleMenu();
    }
  }

  _createStyle() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        --primary-color: #330000;
        --light-text-color: #eeeeee;
        --primary-hover: #550000;
        --primary-active: #650000;
        font-family: 'Quicksand', sans-serif;
        font-size: 24px;
        box-sizing: border-box;
      }
      .nav {
        display: none;
        background: var(--primary-color);
        width: 100vw;
        flex-direction: column;
        top: 51px;
        position: fixed;
      }

      .nav-link {
        width: 100%;
        padding: 15px;
        text-decoration: none;
        color: var(--light-text-color);
        font-weight: 500;
      }

      .nav-link:hover {
        background-color: var(--primary-hover);
      }

      .nav-link:active {
        background-color: var(--primary-active);
      }

      .menu {
        width: 100%;
        padding: 15px;
        text-align: left;
        border: none;
        background: var(--primary-color);
        color: var(--light-text-color);
        font-weight: 500;
        font-size: 24px;
        position: fixed;
      }

      @media screen and (min-width: 600px) {
        :host {
          display: inline-block;
        }

        .menu {
          display: none;
        }

        .nav {
          display: flex;
          width: 250px;
          height: 100vh;
          position: initial;
        }
      }

    `;

    return style;
  }

  _createContent() {
    const content = document.createElement("section");
    content.innerHTML = `
    <button id="menu" class="menu">Menu</button>
    <nav class="nav" id="nav">
      <a href="/" class="nav-link" data-link>Over ons</a>
      <a href="/uren" class="nav-link" data-link>Openingsuren</a>
      <a href="/juwelen" class="nav-link" data-link>Juwelen merken</a>
      <a href="/uurwerken" class="nav-link" data-link>Uurwerken merken</a>
      <a href="/contact" class="nav-link" data-link>Ons bereiken</a>
    </nav>`;

    return content;
  }

  _render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(this._createStyle(), this._createContent());
  }
}

customElements.define("sidebar-component", SidebarComponent);
