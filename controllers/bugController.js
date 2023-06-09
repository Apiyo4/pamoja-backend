const Bug = require("../models/bugModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const asyncHandler = require("express-async-handler");

const getBugs = asyncHandler(async (req, res) => {
  const bugs = await Bug.find().populate('comments');
  res.status(200).json(bugs);
});
const setBug = asyncHandler(async (req, res) => {
  const { title, description, course } = req.body;
  if (!title || !description || !course) {
    res.status(400);
    throw new Error("Please add new fields");
  }
  const bug = await Bug.create({
    title,
    description,
    course,
    user: req.user.id,
  });

  const user = await User.findById(bug.user);
  user.credits += 5;
  await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
  });
  res.status(200).json(bug);
});
const deleteBug = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  if (bug.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  if (!bug) {
    res.status(400);
    throw new Error("Bug not found");
  }
  await bug.remove();
  res.status(200).json({ id: req.params });
});
const updateBug = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const bug = await Bug.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (!bug) {
    res.status(400);
    throw new Error("Bug not found");
  }

  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  
  await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
  });
  res.status(200).json(updatedBug);
});

const addComment = asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id).populate('comments');
  const poster = await User.findById(req.body.userId);
  const comment = new Comment({
    comment: req.body.comment,
    userAvatar: poster.avatarUrl,
    username: poster.name
  });
  poster.credits += 2;
  console.log('i ran')
  bug.comments.push(comment);
  await comment.save();
  await bug.save();
  await poster.save();
  res.status(201).send(comment);
});

module.exports = { getBugs, setBug, updateBug, deleteBug, addComment };
