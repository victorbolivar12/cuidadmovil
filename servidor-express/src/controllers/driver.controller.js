import DriverModel from "../models/driver.module.js";

// GET /drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.findAll();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /drivers/:id
const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await DriverModel.findByPk(id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: "Driver not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /drivers
const createDriver = async (req, res) => {
  try {
    await DriverModel.create(req.body);
    res.json({
      message: "Driver created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /drivers/:id
const updateDriver = async (req, res) => {
  try {
    await DriverModel.update(req.body, { where: { ID_Driver: req.params.id } });
    res.json({
      message: "Driver updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /drivers/:id
const deleteDriver = async (req, res) => {
  try {
    await DriverModel.destroy({ where: { ID_Driver: req.params.id } });
    res.json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
};
