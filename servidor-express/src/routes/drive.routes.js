import express from "express";
import {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller.js";

const router = express.Router();

// GET /drivers
router.get("/", getDrivers);

// GET /drivers/:id
router.get("/:id", getDriverById);

// POST /drivers
router.post("/", createDriver);

// PUT /drivers/:id
router.put("/:id", updateDriver);

// DELETE /drivers/:id
router.delete("/:id", deleteDriver);

export default router;
