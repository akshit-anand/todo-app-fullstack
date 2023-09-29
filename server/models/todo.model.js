const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Completed", "Not Completed"],
    default: "Not Completed",
  },
  dateCreated: Date,
  // order: { type: Number, required: true },
});

var todo = mongoose.model("todos", todoSchema);

module.exports = todo;
