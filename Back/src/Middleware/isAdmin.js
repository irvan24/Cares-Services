import { supabase } from '../supabaseClient.js'

export const isAdmin = async (req, res, next) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', userId)
    .single()

  if (error || !data?.is_admin) {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' })
  }

  next()
}