const mongoose = require("mongoose");
const User = require("../models/user");


const createUser = async (req, res) => {
  const user = await User.create(req.body);

  const safeUser = user.toObject();
  delete safeUser.password;

  return res.status(201).json(safeUser);
};

// Get All Users
const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  return res.status(200).json(users);
};

// Get Single User by ID
const getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json(user);
};

// Update User
const updateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const { firstName, lastName, email, phone, password, role, status } = req.body;

  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (password !== undefined) user.password = password;
  if (role !== undefined) user.role = role;
  if (status !== undefined) user.status = status;

  await user.save();

  const safeUser = user.toObject();
  delete safeUser.password;

  return res.status(200).json(safeUser);
};

// Delete User
const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    message: "User deleted successfully",
  });
};



module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};



