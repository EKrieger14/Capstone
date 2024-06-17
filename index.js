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

  afterRender(state);
}

function afterRender(state) {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "expense") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        title: inputList.title.value,
        amount: inputList.amount.value,
        date: inputList.date.value,
        description: inputList.description.value
      };

      console.log("request Body", requestData);

      axios
        .post(`${process.env.EXPENSE_TRACKER_API_URL}/expenses`, requestData)
        .then(response => {
          store.expense.expenses.push(response.data);
          router.navigate("/expense");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }

  if (state.view === "income") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        title: inputList.title.value,
        amount: inputList.amount.value,
        date: inputList.date.value,
        description: inputList.description.value
      };

      console.log("request Body", requestData);

      axios
        .post(`${process.env.EXPENSE_TRACKER_API_URL}/incomes`, requestData)
        .then(response => {
          store.income.incomes.push(response.data);
          router.navigate("/income");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }
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

      case "expense":
        axios
          .get(`${process.env.EXPENSE_TRACKER_API_URL}/expenses`)
          .then(response => {
            console.log("response", response);
            store.expense.expenses = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;

      case "income":
        axios
          .get(`${process.env.EXPENSE_TRACKER_API_URL}/incomes`)
          .then(response => {
            console.log("response", response);
            store.income.incomes = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
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
