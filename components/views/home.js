import html from "html-literal";

export default state => html`
  <section id="jumbotron">
    <h2>SavvyCoders Fullstack Capstone Project</h2>
  </section>
  <h3>
    In todays market, the top gainer is ${state.info.company} with a
    ${state.info.gains} increase!
  </h3>
`;
