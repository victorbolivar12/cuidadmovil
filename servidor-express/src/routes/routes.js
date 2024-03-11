import express from 'express'
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getIdClientbyIduser,
    getIdDiverbyIduser
} from './../controllers/user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id',getUserById)
router.get('/costumer/:id',getIdClientbyIduser)
router.get('/driver/:id',getIdDiverbyIduser)
router.post('/', createUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)

export default router