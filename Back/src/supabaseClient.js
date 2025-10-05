import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL || "your_supabase_url";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "your_supabase_anon_key";

export const supabase = createClient(supabaseUrl, supabaseKey);
