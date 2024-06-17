import html from "html-literal";

export default state => html`
  <section id="expense">
    <form id="expense" method="POST" action="">
      <h2>Add Expense</h2>
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
      <input type="submit" name="submit" value="Submit Expense" />
    </form>
    <div id="expenseTable">
      <h2>View Expenses</h2>
      <table id="expenses">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Amount</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
        </tr>
        ${state.expenses
          .map(expense => {
            return `<tr><td>${expense.title}</td><td>${expense.amount}</td><td>${expense.date}</td><td>${expense.description}</td></tr>`;
          })
          .join("")}
      </table>
    </div>
  </section>
`;
