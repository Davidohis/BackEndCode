const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a text value"],
    },
    description: {
      type: String,
      required: [true, "Please add a text value"],
    },
    label: {
      type: String,
      required: [true, "Please add a text value"],
    },
    priority: {
      type: String,
      required: [true, "Please add a  value"],
    },
    startDate: {
      type: String,
      required: [true, "Please add a  value"],
    },
    dueDate: {
      type: String,
      required: [true, "Please add a  value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
