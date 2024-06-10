import { Router } from "express";
import Income from "../models/Income.js";

const router = Router();

// Add income
router.post("/", async (request, response) => {
  try {
    const newIncome = new Income(request.body);

    const data = await newIncome.save();

    response.json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all incomes
router.get("/", async (request, response) => {
  try {
    const query = request.query;

    const data = await Income.find(query).sort({ createdAt: -1 });

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Get income by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Income.findById(request.params.id);

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Delete income
router.delete("/:id", async (request, response) => {
  try {
    const data = await Income.findByIdAndDelete(request.params.id, {});

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Update income
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Income.findByIdAndUpdate(
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
