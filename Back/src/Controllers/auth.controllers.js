import { supabase } from '../supabaseClient.js'

/**
 * POST /auth/register
 */
export const register = async (req, res) => {
  const { email, password, full_name } = req.body

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      return res.status(400).json({ error: authError.message })
    }

    const userId = authData.user.id

    const { error: dbError } = await supabase
      .from('users') // Assure-toi que la table s’appelle bien "users"
      .insert([{ id: userId, full_name }])

    if (dbError) {
      return res.status(500).json({ error: dbError.message })
    }

    res.status(201).json({
      message: 'Inscription réussie',
      user: {
        id: userId,
        email: authData.user.email,
        full_name
      }
    })
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

/**
 * POST /auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    res.status(200).json({
      message: 'Connexion réussie',
      user: data.user,
      session: data.session
    })
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' })
  }
}