import TransferModel from "../models/transfer.module.js";
import CustomerModel from "../models/customer.module.js";
import DriverModel from "../models/driver.module.js";
import VehicleModel from "../models/vehicle.module.js";

// GET /transfers
const getTransfers = async (req, res) => {
  try {
    const transfers = await TransferModel.findAll({
      include: [
        { model: CustomerModel, attributes: ['Name'] },
        { model: DriverModel, attributes: ['Name'] },
        { model: VehicleModel, attributes: ['Model'] }
      ]
    });
    res.json(transfers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /transfers/:id
const getTransferById = async (req, res) => {
  try {
    const { id } = req.params;
    const transfer = await TransferModel.findByPk(id);
    if (transfer) {
      res.json(transfer);
    } else {
      res.status(404).json({ message: "Transfer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTransferByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const transfers = await TransferModel.findAll({ where: { CustomerID: id }, include: [
      { model: CustomerModel, attributes: ['Name'] },
      { model: DriverModel, attributes: ['Name'] },
      { model: VehicleModel, attributes: ['Model'] }
    ] });
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

const getTransferByIdDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const transfers = await TransferModel.findAll({ where: { DriverID: id }, include: [
      { model: CustomerModel, attributes: ['Name'] },
      { model: DriverModel, attributes: ['Name'] },
      { model: VehicleModel, attributes: ['Model'] }
    ] });
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


// POST /transfers
const createTransfer = async (req, res) => {
  try {
    await TransferModel.create(req.body);
    res.json({
      message: "Transfer created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /transfers/:id
const updateTransfer = async (req, res) => {
  try {
    await TransferModel.update(req.body, { where: { ID_Transfer: req.params.id } });
    res.json({
      message: "Transfer updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /transfers/:id
const deleteTransfer = async (req, res) => {
  try {
    await TransferModel.destroy({ where: { ID_Transfer: req.params.id } });
    res.json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer,
  getTransferByIdUser,
  getTransferByIdDriver
};
