import express from 'express'
import {
  getAllCategories,
  createCategory,
  deleteCategory
} from '../controllers/categories.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', getAllCategories)
router.post('/', authenticate, createCategory)      // admin
router.delete('/:id', authenticate, deleteCategory) // admin

export default router