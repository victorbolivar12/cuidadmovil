import express from 'express';
import {
  getBanks,
  getBankById,
  createBank,
  updateBank,
  deleteBank,
} from '../controllers/bank.controller.js';

const router = express.Router();

// GET /banks
router.get('/', getBanks);

// GET /banks/:id
router.get('/:id', getBankById);

// POST /banks
router.post('/', createBank);

// PUT /banks/:id
router.put('/:id', updateBank);

// DELETE /banks/:id
router.delete('/:id', deleteBank);

export default router;
