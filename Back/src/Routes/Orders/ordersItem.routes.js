import express from 'express'
import { getOrderItems } from '../controllers/orderItems.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/:orderId/items', authenticate, getOrderItems)

export default router