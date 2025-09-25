import express from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)

router.post('/', authenticate, createProduct)      // admin
router.patch('/:id', authenticate, updateProduct)  // admin
router.delete('/:id', authenticate, deleteProduct) // admin

export default router