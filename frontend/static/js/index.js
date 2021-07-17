const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: "<home-component></home-component>" },
    { path: "/juwelen", view: "<juwels-component></juwels-component>" },
    { path: "/uren", view: "<uren-component></uren-component>" },
    { path: "/uurwerken", view: "<watches-component></watches-component>" },
    { path: "/contact", view: "<contact-component></contact-component>" },
  ];

  // test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => {
    return potentialMatch.isMatch;
  });

  // default or 404 route
  if (!match) {
    match = {
      route: route[0],
      isMatch: true,
    };
  }

  const view = match.route.view;

  const app = document.querySelector("#app");
  app.innerHTML = view;
};

window.addEventListener("popstate", () => router());

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });

  router();
});
