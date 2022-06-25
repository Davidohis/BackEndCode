const express = require("express");
const router = express.Router();
const {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
  TodoStatus,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTodo).post(protect, setTodo);
router.route("/:id").delete(protect, deleteTodo).put(protect, updateTodo);
router.route("/status/:id").put(protect, TodoStatus);

module.exports = router;
