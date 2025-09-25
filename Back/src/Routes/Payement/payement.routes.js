import express from 'express'
import {
  initiateCheckout,
  handleWebhook
} from '../controllers/payments.controller.js'

const router = express.Router()

router.post('/checkout', initiateCheckout)
router.post('/webhook', handleWebhook)

export default router