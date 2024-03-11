import Bank from "../models/bank.module.js";

// GET /banks
const getBanks = async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.json(banks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /banks/:id
const getBankById = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await Bank.findByPk(id);
    if (bank) {
      res.json(bank);
    } else {
      res.status(404).json({ message: "Bank not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /banks
const createBank = async (req, res) => {
  try {
    await Bank.create(req.body);
    res.json({
      message: "Bank created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /banks/:id
const updateBank = async (req, res) => {
  try {
    await Bank.update(req.body, { where: { ID_Bank: req.params.id } });
    res.json({
      message: "Bank updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /banks/:id
const deleteBank = async (req, res) => {
  try {
    await Bank.destroy({ where: { ID_Bank: req.params.id } });
    res.json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getBanks,
  getBankById,
  createBank,
  updateBank,
  deleteBank,
};
