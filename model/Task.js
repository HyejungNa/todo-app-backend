const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false } // 스키마에서 애초에 설정으로 __v 빼주기 (.select("-__v") 사용하는대신에)
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
