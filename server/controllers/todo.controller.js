const todo = require("../models/todo.model.js");

const todoController = {
  //get all todos
  getAll: async (req, res) => {
    try {
      await todo.find().then((todo) => res.send(todo));
    } catch (error) {
      res.send(err);
    }
  },

  //get one todo
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      await todo.findById(id).then((todo) => res.send(todo));
    } catch (error) {
      res.send(error);
    }
  },

  //create new todo
  createNew: async (req, res) => {
    try {
      const newTodo = new todo({
        name: req.body.name,
        status: req.body.status,
        dateCreated: Date.now(),
      });
      await newTodo.save(newTodo).then((todo) => res.send(todo));
    } catch (error) {
      res.send(error);
    }
  },

  //update todo text
  updateOne: async (req, res) => {
    try {
      const id = req.body.id;
      await todo
        .findByIdAndUpdate(id, {
          name: req.body.name,
          status: req.body.status,
        })
        .then((todo) => res.send(todo));
    } catch (error) {
      res.send(error);
    }
  },

  updateList: async (req, res) => {
    const updatedTodoList = req.body.updatedTodoList;
    // console.log(updatedTodoList);

    try {
      // // Iterate through the updatedTodoList and update each todo in the MongoDB database
      // for (const updatedTodo of updatedTodoList) {
      //   const todoId = updatedTodo._id;
      //   const todo = await todo.find((todo) => todo._id === todoId);
      //   if (todo) {
      //     todo.order = i + 1;
      //   }
      // }
      // for (let i = 0; i < updatedTodoList.length; i++) {
      //   const todoId = updatedTodoList[i];
      //   const todo = await todo.find((todo) => todo.id === todoId);
      //   if (todo) {
      //     todo.order = i + 1;
      //   }
      // }
      res.status(200).json({ message: "Todo list updated successfully" });
    } catch (error) {
      console.error("Error updating todo list:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  //delete todo
  deleteOne: async (req, res) => {
    try {
      const id = req.params.id;
      await todo
        .findByIdAndDelete(id)
        .then(() => res.send({ message: "todo deleted successfully" }));
    } catch (error) {
      console.log(error);
      res.send(
        { message: "Something went wrong!! todo was not deleted" },
        error
      );
    }
  },

  deleteCompleted: async (req, res) => {
    try {
      await todo
        .deleteMany({
          _id: req.body.id,
        })
        .then(() => {
          res
            .status(200)
            .json({ message: "All todos was deleted Successfully" });
        });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!!!" });
      console.error(error);
    }
  },

  deleteAll: async (req, res) => {
    try {
      await todo.deleteMany().then(() => {
        res.status(200).json({ message: "All todos was deleted Successfully" });
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!!!" });
      console.error(error);
    }
  },
};

module.exports = todoController;
