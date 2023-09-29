const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller.js");

// Get all todos
router.get("/todos", todoController.getAll);

// Get todo by id
router.get("/todos/:id", todoController.getOne); // with params
router.get("/todos", todoController.getOne); // with body

// Create new todo
router.post("/todos/create-new", todoController.createNew);

// Update todo
// for sending id in params
// router.patch("/todos/update/:id", todoController.updateOne);
//for sending id in body
router.patch("/todos/update", todoController.updateOne);

router.put("/todos/updateTodoList", todoController.updateList);

// Delete single todo
router.delete("/todos/delete/:id", todoController.deleteOne);

// Delete completed todo
router.delete("/todos/delete-completed", todoController.deleteCompleted);

// Delete All todos
router.delete("/todos/delete-all", todoController.deleteAll);

module.exports = router;
