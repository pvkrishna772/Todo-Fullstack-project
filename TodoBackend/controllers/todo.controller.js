
import pool from "../config/db.js";

export const createTodo = async (req,res) => {
  try{
    const { text } = req.body;
    const userId = req.user.id;

    const [result] = await pool.query(
      "INSERT INTO todos (text, user_id) VALUES (?, ?)",
      [text, userId]
    );

    res.status(201).json({
      id: result.insertId,
      text,
      user_id: userId
    });

  }catch(err){
    console.error(err);
    res.status (500).json({message:"server error"});
  }
};

export const getTodo = async (req,res) => {
  try{
    const userId = req.user.id;

    const [rows] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ?",
      [userId]
    );

    res.json(rows);

  }catch(err){
    console.error(err);
    res.status(500).json({message:"server error"});
  }
};


export const updateTodo = async (req,res) => {
  try{
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const [result] = await pool.query(
      "UPDATE todos SET text=?  WHERE id=? AND user_id=?",
      [text,  id,  userId]
    );

    if(result.affectedRows === 0){
      return res.status(403).json({message:"not allowed"});
    }

    const [rows] = await pool.query(
  "SELECT * FROM todos WHERE id=? AND user_id=?",
  [id, userId]
);

    res.json(rows[0]);

  }catch(err){
    console.error(err);
    res.status(500).json({message:"server error"});
  }
};

export const partialUpdate = async(req,res) =>{

  try{
    const {id} = req.params;
    
    const userId = req.user.id;

    const [result] = await pool.query("UPDATE todos SET completed = NOT completed WHERE id =? AND user_id =?",[id,userId]);

    if(result.affectedRows===0){
      return res.status(404).json({message:"todo not found"});
    }

    const[rows] = await pool.query("SELECT * FROM todos WHERE id =? AND user_id =?",[id,userId]);
    res.json(rows[0]);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"server error"});
  }
};


export const deleteTodo = async (req,res) => {
  try{
    const { id } = req.params;
    const userId = req.user.id;

    const [result] = await pool.query(
      "DELETE FROM todos WHERE id=? AND user_id=?",
      [id, userId]
    );

    if(result.affectedRows === 0){
      return res.status(403).json({message:"not allowed"});
    }

    res.json({message:"deleted"});

  }catch(err){
    console.error(err);
    res.status(500).json({message:"server error"});
  }
};

