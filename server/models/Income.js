import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 30,
    validate: /^[A-Za-z0-9 ]*$/
  },
  amount: {
    type: Number,
    required: true,
    maxLength: 20
  },
  date: {
    type: Date,
    required: true,
    maxLength: 20
  },
  description: {
    type: String,
    required: true,
    maxLength: 20,
    validate: /^[A-Za-z0-9 ]*$/
  }
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;
