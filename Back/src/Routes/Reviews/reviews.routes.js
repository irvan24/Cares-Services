import express from 'express'
import {
  createReview,
  getProductReviews,
  deleteReview
} from '../controllers/reviews.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/product/:productId', getProductReviews)
router.post('/product/:productId', authenticate, createReview)
router.delete('/:id', authenticate, deleteReview)

export default router