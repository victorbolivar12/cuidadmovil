import RechargeModel from "../models/recharges.module.js"
import CustomerModel from "../models/customer.module.js";
// GET /recharges
const getRecharges = async (req, res) => {
  try {
    const recharges = await RechargeModel.findAll();
    res.json(recharges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /recharges/:id
const getRechargeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recharge = await RechargeModel.findByPk(id);
    if (recharge) {
      res.json(recharge);
    } else {
      res.status(404).json({ message: "Recharge not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /recharges
const createRecharge = async (req, res) => {
  try {

    const newRecharge = await RechargeModel.create(req.body);

    const customerId = req.body.CustomerID;

    const customer = await CustomerModel.findByPk(customerId);

    // Verificar si el cliente existe
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Actualizar el saldo del cliente
    const newBalance = parseFloat(customer.Balance) + parseFloat(req.body.Amount);
    await CustomerModel.update({ Balance: newBalance }, { where: { ID_Client: customerId } });

    res.json({
      message: "Recharge created successfully",
      recharge: newRecharge,
      newBalance: newBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// PUT /recharges/:id
const updateRecharge = async (req, res) => {
  try {
    await RechargeModel.update(req.body, { where: { ID_Recharge: req.params.id } });
    res.json({
      message: "Recharge updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /recharges/:id
const deleteRecharge = async (req, res) => {
  try {
    await RechargeModel.destroy({ where: { ID_Recharge: req.params.id } });
    res.json({
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getRecharges,
  getRechargeById,
  createRecharge,
  updateRecharge,
  deleteRecharge,
};
