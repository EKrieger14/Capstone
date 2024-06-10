import { Router } from "express";
import Expense from "../models/Expense.js";

const router = Router();

// Add expense
router.post("/", async (request, response) => {
  try {
    const newExpense = new Expense(request.body);

    const data = await newExpense.save();

    response.json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all expenses
router.get("/", async (request, response) => {
  try {
    const query = request.query;

    const data = await Expense.find(query).sort({ createdAt: -1 });

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Get expense by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Expense.findById(request.params.id);

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Delete expense
router.delete("/:id", async (request, response) => {
  try {
    const data = await Expense.findByIdAndDelete(request.params.id, {});

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Update expense
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Expense.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          title: body.title,
          amount: body.amount,
          date: body.date,
          description: body.description
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    response.json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
