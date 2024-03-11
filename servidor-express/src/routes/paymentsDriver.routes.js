import express from 'express';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/paymentsDriver.controller.js';

const router = express.Router();

// GET /payments
router.get('/', getPayments);

// GET /payments/:id
router.get('/:id', getPaymentById);

// POST /payments
router.post('/', createPayment);

// PUT /payments/:id
router.put('/:id', updatePayment);

// DELETE /payments/:id
router.delete('/:id', deletePayment);

export default router;
