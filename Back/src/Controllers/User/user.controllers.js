import { supabase } from '../supabaseClient.js'

/**
 * GET /users/me
 */
export const getCurrentUser = async (req, res) => {
  const user = req.user

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

/**
 * PATCH /users/me
 */
export const updateCurrentUser = async (req, res) => {
  const user = req.user
  const updates = req.body

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Profil mis à jour' })
}

/**
 * PATCH /users/me/avatar
 */
export const updateAvatar = async (req, res) => {
  const user = req.user
  const { avatar_url } = req.body

  const { error } = await supabase
    .from('users')
    .update({ avatar_url })
    .eq('id', user.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Avatar mis à jour' })
}

/**
 * DELETE /users/me
 */
export const deleteCurrentUser = async (req, res) => {
  const user = req.user

  // Supprimer dans la table users
  await supabase.from('users').delete().eq('id', user.id)

  // Supprimer dans Supabase Auth
  const { error } = await supabase.auth.admin.deleteUser(user.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Utilisateur supprimé' })
}

/**
 * GET /users
 */
export const getAllUsers = async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

/**
 * GET /users/:id
 */
export const getUserById = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return res.status(404).json({ error: 'Utilisateur introuvable' })
  res.json(data)
}

/**
 * DELETE /users/:id
 */
export const deleteUserById = async (req, res) => {
  const { id } = req.params

  await supabase.from('users').delete().eq('id', id)

  const { error } = await supabase.auth.admin.deleteUser(id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Utilisateur supprimé' })
}