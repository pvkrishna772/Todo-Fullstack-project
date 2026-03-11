import pool from "../config/db.js";

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "INSERT INTO todos (text, user_id) VALUES ($1, $2) RETURNING *",
      [text, userId]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};


export const getTodo = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1",
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const updateResult = await pool.query(
      "UPDATE todos SET text=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
      [text, id, userId]
    );

    if (updateResult.rows.length === 0) {
      return res.status(403).json({ message: "not allowed" });
    }

    res.json(updateResult.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};


export const partialUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      "UPDATE todos SET completed = NOT completed WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "todo not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ message: "not allowed" });
    }

    res.json({ message: "deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};
