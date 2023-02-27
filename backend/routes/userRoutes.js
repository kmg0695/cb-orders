import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  authUser,
  createUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", authUser);

router.post("/register", createUser);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
