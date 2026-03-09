import express from "express";
import {protect} from "../middleware/auth.middleware.js";
import {createTodo, getTodo, updateTodo,deleteTodo,partialUpdate} from "../controllers/todo.controller.js";


const router = express.Router();
router.post("/", protect, createTodo);
router.get("/", protect, getTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);
router.patch("/:id/toggle",protect, partialUpdate);





export default router;