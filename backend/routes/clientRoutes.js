import express from "express";
import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  login,
} from "../controller/clientController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
router.use(auth);
router.get("/", getClients);
router.post("/", createClient);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;
