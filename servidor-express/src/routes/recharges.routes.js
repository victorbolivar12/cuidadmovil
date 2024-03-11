import express from "express";
import {
  getRecharges,
  getRechargeById,
  createRecharge,
  updateRecharge,
  deleteRecharge,
} from "../controllers/recharges.controller.js";

const router = express.Router();

// GET /recharges
router.get("/", getRecharges);

// GET /recharges/:id
router.get("/:id", getRechargeById);

// POST /recharges
router.post("/", createRecharge);

// PUT /recharges/:id
router.put("/:id", updateRecharge);

// DELETE /recharges/:id
router.delete("/:id", deleteRecharge);

export default router;
