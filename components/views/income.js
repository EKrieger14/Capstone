import html from "html-literal";

export default state => html`
  <section id="income">
    <form id="income" method="POST" action="">
      <h2>Add Income</h2>
      <div>
        <label for="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Title"
          required
        />
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Enter Amount"
          required
        />
      </div>
      <div>
        <label for="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Enter Date"
          required
        />
      </div>
      <div>
        <label for="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Enter Description"
          required
        />
      </div>
      <input type="submit" name="submit" value="Submit Income" />
    </form>
    <div id="incomeTable">
      <h2>View Incomes</h2>
      <table id="incomes">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Amount</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
        </tr>
        ${state.incomes
          .map(income => {
            return `<tr><td>${income.title}</td><td>${income.amount}</td><td>${income.date}</td><td>${income.description}</td></tr>`;
          })
          .join("")}
      </table>
    </div>
  </section>
`;
