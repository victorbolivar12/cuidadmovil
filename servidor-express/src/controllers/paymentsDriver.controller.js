import PaymentDriver from "../models/paymentsDriver.module.js";

// GET /payments
const getPayments = async (req, res) => {
  try {
    const payments = await PaymentDriver.findAll();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /payments/:id
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentDriver.findByPk(id);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /payments
const createPayment = async (req, res) => {
  try {
    await PaymentDriver.create(req.body);
    res.json({ message: "Payment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /payments/:id
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentDriver.findByPk(id);
    if (payment) {
      await payment.update(req.body);
      res.json({ message: "Payment updated successfully" });
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /payments/:id
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentDriver.findByPk(id);
    if (payment) {
      await payment.destroy();
      res.json({ message: "Payment deleted successfully" });
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
