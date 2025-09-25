import { supabase } from '../supabaseClient.js'

/**
 * GET /products
 * Public – Liste tous les produits
 */
export const getAllProducts = async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

/**
 * GET /products/:id
 * Public – Récupère un produit par ID
 */
export const getProductById = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return res.status(404).json({ error: 'Produit introuvable' })
  res.json(data)
}

/**
 * POST /products
 * Admin – Crée un nouveau produit
 */
export const createProduct = async (req, res) => {
  const { name, description, price, image_url, stock, category_id } = req.body

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, description, price, image_url, stock, category_id }])
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

/**
 * PATCH /products/:id
 * Admin – Met à jour un produit
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params
  const updates = req.body

  const { error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)

  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Produit mis à jour' })
}

/**
 * DELETE /products/:id
 * Admin – Supprime un produit
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Produit supprimé' })
}