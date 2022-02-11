const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    todo: String,
    isDeleted: { type: Boolean, default: false },
    todoId: String,
    userId: String,
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("todo", TodoSchema);
export default TodoModel;
