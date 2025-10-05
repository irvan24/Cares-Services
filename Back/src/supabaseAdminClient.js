import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Configuration Supabase avec service key pour contourner RLS
const supabaseUrl = process.env.SUPABASE_URL || "your_supabase_url";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_KEY || "your_supabase_service_key";

// Utiliser le client normal si la clé de service n'est pas valide
const isServiceKeyValid =
  supabaseServiceKey &&
  !supabaseServiceKey.includes("8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K");

export const supabaseAdmin = isServiceKeyValid
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY);
