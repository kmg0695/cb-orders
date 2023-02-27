import User from "../models/User.js";
import mongoose from "mongoose";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser && (await foundUser.matchPassword(password))) {
      const { _id, name, isAdmin, isAccountant } = foundUser;
      res.json({
        _id,
        name,
        email,
        isAdmin,
        isAccountant,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectId) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      user.isAdmin = req.body.isAdmin;
      user.isAccountant = req.body.isAccountant;
      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.remove();
      res.json({ message: "User removed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      isAccountant: req.body.isAccountant,
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
