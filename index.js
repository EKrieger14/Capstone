import Navigo from "navigo";
import { camelCase } from "lodash";

import { header, nav, main, footer } from "./components";
import * as store from "./store";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;
  router.updatePageLinks();

  afterRender();
}

function afterRender() {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

render();

router.on("/", () => render(store.home)).resolve();

router
  .on({
    "/": () => render(),
    ":view": ({ data, params }) => {
      const view = data.view ? camelCase(data.view) : "home";
      if (view in store) {
        render(store[view]);
      }
    }
  })
  .resolve();
