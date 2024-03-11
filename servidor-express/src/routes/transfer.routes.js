import express from "express";
import {
  getTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer,
  getTransferByIdDriver,
  getTransferByIdUser
} from "../controllers/transfer.controller.js";

const router = express.Router();

// GET /transfers
router.get("/", getTransfers);

// GET /transfers/:id
router.get("/:id", getTransferById);

// GET /transfers/user/:id
router.get("/user/:id", getTransferByIdUser);

// GET /transfers/driver/:id
router.get("/driver/:id", getTransferByIdDriver);

// POST /transfers
router.post("/", createTransfer);

// PUT /transfers/:id
router.put("/:id", updateTransfer);

// DELETE /transfers/:id
router.delete("/:id", deleteTransfer);

export default router;
