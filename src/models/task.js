import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
