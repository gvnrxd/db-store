const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all products
router.get("/", async (req, res, next) => {
  const limit = req.query.limit || 10;

  try {
    const result = await db.query(`SELECT * FROM products LIMIT $1`, [limit]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const result = await db.query(`SELECT * FROM products WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a product by Id
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await db.query(`DELETE FROM products WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(204).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "Internal server error" });
  }
});

// POST a product by Id
router.post("/", async (req, res, next) => {
  const { name, description, price } = req.body || {};

  if (!name || !description || !price) {
    res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await db.query(
      `INSERT INTO PRODUCTS (name, description, price) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, price],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    if (err.code === "23505") {
      res.status(409).json({ message: "Product name already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE a product by Id
router.patch("/:id", async (req, res, next) => {
  const productId = req.params.id;
  const allowedFields = ["name", "description", "price"];
  const updates = [];
  const values = [];

  let index = 1;

  for (const key of Object.keys(req.body)) {
    if (allowedFields.includes(key)) {
      updates.push(`${key} = $${index}`);
      values.push(req.body[key]);
      index++;
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }
  values.push(productId);

  try {
    const result = await db.query(
      `UPDATE products
       SET ${updates.join(", ")}
       WHERE id = $${index}
       RETURNING *`,
      values,
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
