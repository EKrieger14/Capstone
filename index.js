import Navigo from "navigo";
import { camelCase } from "lodash";
import axios from "axios";

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

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? camelCase(params.data.view)
        : "home";

    switch (view) {
      case "home":
        axios
          .get(
            `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
          )
          .then(response => {
            store.home.info = {
              company: response.data.top_gainers[0].ticker,
              gains: response.data.top_gainers[0].change_percentage
            };

            console.log("Stock Data:", response.data);
            done();
          })

          .catch(err => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? camelCase(params.data.view)
        : "home";

    render(store[view]);
  }
});

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
