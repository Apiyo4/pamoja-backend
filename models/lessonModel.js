const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    topic: {
      type: String,
      required: [true, "Please add a topic"],
    },
    course: {
      type: String,
      required: [true, "Please add a course"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    // comments:{
    //     type: [String],
    //     default: []
    // },
    isTaught: {
      type: Boolean,
      default: false,
    },
    teachId: {
      type: String,
    },
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

module.exports = mongoose.model("Lesson", lessonSchema);
