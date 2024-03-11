import express from "express";
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclerByIdDriver
} from "../controllers/vehicle.controller.js";

const router = express.Router();

// GET /vehicles
router.get("/", getVehicles);

// GET /vehicles/:id
router.get("/driver/:id", getVehiclerByIdDriver);

// GET /vehicles/:id
router.get("/:id", getVehicleById);

// POST /vehicles
router.post("/", createVehicle);

// PUT /vehicles/:id
router.put("/:id", updateVehicle);

// DELETE /vehicles/:id
router.delete("/:id", deleteVehicle);

export default router;
