const mongoose = require("mongoose");

const bugSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    course: {
      type: String,
      required: [true, "Please add a course"],
    },
    // comments:{
    //     type: [String],
    //     default: []
    // }
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
