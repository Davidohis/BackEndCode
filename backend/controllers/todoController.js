const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoModel");

// @desc    Get todo
// @route   GET /api/todo
// @access  Private
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.user.id });

  res.status(200).json(todo);
});

// @desc    Set todo
// @route   POST /api/todo
// @access  Private
const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.label) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  if (!req.body.priority || !req.body.startDate || !req.body.dueDate) {
    res.status(400);
    throw new Error("Please add a field");
  }

  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    label: req.body.label,
    priority: req.body.priority,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    status: "Pending",
    user: req.user.id,
  });

  res.status(200).json(todo);
});

// @desc    Update todo
// @route   PUT /api/todo/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// @desc    Todo status
// @route   PUT /api/todo/status/:id
// @access  Private
const TodoStatus = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const TodoStatus = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(TodoStatus);
});

// @desc    Delete todo
// @route   DELETE /api/todo/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await todo.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
  TodoStatus,
};
