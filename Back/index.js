
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zyebqychwmpgksozmoxd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Test : récupérer tous les produits
async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.error('Erreur:', error.message)
  } else {
    console.log('Produits:', data)
  }
}

fetchProducts()
