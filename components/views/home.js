import html from "html-literal";

export default state => html`
  <h2 id="homeTitle">View Transactions</h2>
  <section id="chart-container">
    <canvas id="chart"></canvas>
  </section>
  <section></section>
  <h3>
    Daily Stock: In todays market, the top gainer is ${state.info.company} with
    a ${state.info.gains} increase!
  </h3>
`;
