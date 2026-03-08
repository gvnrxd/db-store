const express = require("express");
const router = express.Router();
const db = require("../db");

// GET users
router.get("/", async (req, res, next) => {
  const limit = req.query.limit || 10;
  try {
    const result = await db.query(
      "SELECT id, username, first_name, role, created_at FROM users LIMIT $1",
      [limit],
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET users by ID
router.get("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT id, username, first_name, role, created_at FROM users WHERE id = $1",
      [req.params.id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST users (Should require admin perms)
router.post("/", async (req, res, next) => {
  const { username, password_hash, first_name, last_name } = req.body || {};
  if (!username || !password_hash || !first_name || !last_name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await db.query(
      "INSERT INTO users (username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, password_hash, first_name, last_name],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Username already taken" });
    }
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE users by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await db.query("DELETE FROM users WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE user info by ID
router.patch("/:id", async (req, res, next) => {
  const userId = req.params.id;

  const allowedFields = ["username", "first_name", "last_name", "role"];
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
  values.push(userId);

  try {
    const result = await db.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = $${index} RETURNING id, username, first_name, last_name, role, created_at`,
      values,
    );

    if (result.rows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET users cart by ID
router.get("/:id/cart", async (req, res, next) => {
  const userId = req.params.id;

  try {
    // Check if user exists
    const user = await db.query("SELECT id FROM users WHERE id = $1", [userId]);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get cart items
    const result = await db.query(
      `SELECT cart_items.*
       FROM cart_items
       JOIN carts ON cart_items.cart_id = carts.id
       WHERE carts.user_id = $1`,
      [userId],
    );

    if (result.rowCount === 0) {
      return res.json({ message: "User cart is empty" });
    }

    res.json(result.rows); // empty array is valid
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a product ( by productID ) to a users cart ( by userId )
router.post("/:id/cart", async (req, res) => {
  const userId = req.params.id;
  const { product_id, quantity } = req.body || {};

  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if user exists
    const user = await db.query("SELECT id FROM users WHERE id = $1", [userId]);

    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if cart exists
    const cart = await db.query("SELECT id FROM carts WHERE user_id = $1", [
      userId,
    ]);

    let cartId;

    if (cart.rowCount === 0) {
      const newCart = await db.query(
        `INSERT INTO carts (user_id)
         VALUES ($1)
         RETURNING id`,
        [userId],
      );

      cartId = newCart.rows[0].id;
    } else {
      cartId = cart.rows[0].id;
    }

    // Add item to cart
    const result = await db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [cartId, product_id, quantity],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a product from the users cart
router.delete("/:id/cart/:productId", async (req, res, next) => {
  const userId = req.params.id;
  const productId = req.params.productId;

  const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

  if (user.rowCount === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const product = await db.query(
    "SELECT cart_items.* FROM cart_items JOIN carts ON cart_items.cart_id = carts.id WHERE carts.user_id = $1 AND cart_items.product_id = $2",
    [userId, productId],
  );

  if (product.rowCount === 0) {
    return res.status(400).json({ message: "Product not found in cart" });
  }
  try {
    const result = await db.query(
      `DELETE FROM cart_items USING carts WHERE cart_items.cart_id = carts.id AND carts.user_id = $1 AND cart_items.product_id = $2`,
      [userId, productId],
    );

    res.status(200).json({ message: "Product deleted from cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a product in a users cart
router.patch("/:id/carts/:productId", async (req, res, next) => {
  const userId = req.params.id;
  const productId = req.params.productId;
  const { quantity } = req.body || {};

  if (quantity === undefined) {
    return res.status(400).json({ message: "Quantity is required" });
  }

  const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);

  if (user.rowCount === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const product = await db.query(
    "SELECT cart_items.* FROM cart_items JOIN carts ON cart_items.cart_id = carts.id WHERE carts.user_id = $1 AND cart_items.product_id = $2",
    [userId, productId],
  );

  if (product.rowCount === 0) {
    return res.status(400).json({ message: "Product not found in cart" });
  }

  try {
    const result = await db.query(
      `UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *`,
      [quantity, product.rows[0].id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
