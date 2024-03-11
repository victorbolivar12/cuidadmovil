import VehicleModel from "../models/vehicle.module.js";

// GET /vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleModel.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /vehicles/:id
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleModel.findByPk(id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVehiclerByIdDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const transfers = await VehicleModel.findAll({ where: { DriverID: id } });
    if (transfers.length > 0) {
      res.json(transfers);
    } else {
      res.status(404).json({ message: "Transfers not found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /vehicles
const createVehicle = async (req, res) => {
  try {
    await VehicleModel.create(req.body);
    res.json({
      message: "Vehicle created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /vehicles/:id
const updateVehicle = async (req, res) => {
  try {
    await VehicleModel.update(req.body, { where: { ID_Vehicle: req.params.id } });
    res.json({
      message: "Vehicle updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /vehicles/:id
const deleteVehicle = async (req, res) => {
  try {
    await VehicleModel.destroy({ where: { ID_Vehicle: req.params.id } });
    res.json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclerByIdDriver
};
