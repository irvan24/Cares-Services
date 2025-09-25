import express from 'express'
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orders.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', authenticate, createOrder)
router.get('/', authenticate, getUserOrders)
router.get('/:id', authenticate, getOrderById)
router.patch('/:id', authenticate, updateOrderStatus) // admin ou staff
router.delete('/:id', authenticate, cancelOrder)

export default router