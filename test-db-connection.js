// Script de test pour la connexion à la base de données
// À exécuter dans le terminal : node test-db-connection.js

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL || "your_supabase_url";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "your_supabase_anon_key";

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  console.log("🔍 Test de connexion à la base de données...\n");

  try {
    // Test 1: Vérifier la connexion de base
    console.log("1️⃣ Test de connexion Supabase...");
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Erreur de connexion:", error.message);
      return;
    }

    console.log("✅ Connexion Supabase réussie!");

    // Test 2: Vérifier la table users
    console.log("\n2️⃣ Test de la table users...");
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .limit(5);

    if (usersError) {
      console.error("❌ Erreur table users:", usersError.message);
    } else {
      console.log("✅ Table users accessible!");
      console.log(`📊 Nombre d'utilisateurs trouvés: ${users?.length || 0}`);
      if (users && users.length > 0) {
        console.log("👥 Utilisateurs existants:");
        users.forEach((user) => {
          console.log(`   - ${user.email} (${user.role || "sans rôle"})`);
        });
      }
    }

    // Test 3: Vérifier la table products
    console.log("\n3️⃣ Test de la table products...");
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .limit(5);

    if (productsError) {
      console.error("❌ Erreur table products:", productsError.message);
    } else {
      console.log("✅ Table products accessible!");
      console.log(`📦 Nombre de produits trouvés: ${products?.length || 0}`);
      if (products && products.length > 0) {
        console.log("🛍️ Produits existants:");
        products.forEach((product) => {
          console.log(`   - ${product.name} (${product.price}€)`);
        });
      }
    }

    // Test 4: Vérifier la table categories
    console.log("\n4️⃣ Test de la table categories...");
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .limit(5);

    if (categoriesError) {
      console.error("❌ Erreur table categories:", categoriesError.message);
    } else {
      console.log("✅ Table categories accessible!");
      console.log(
        `🏷️ Nombre de catégories trouvées: ${categories?.length || 0}`
      );
      if (categories && categories.length > 0) {
        console.log("📂 Catégories existantes:");
        categories.forEach((category) => {
          console.log(`   - ${category.name}`);
        });
      }
    }

    // Test 5: Tester l'authentification
    console.log("\n5️⃣ Test d'authentification...");
    const { data: authTest, error: authError } =
      await supabase.auth.signInWithPassword({
        email: "admin@careservice.com",
        password: "admin123",
      });

    if (authError) {
      console.log("⚠️ Utilisateur admin non trouvé ou mot de passe incorrect");
      console.log("💡 Vous devez créer un utilisateur admin dans Supabase");
    } else {
      console.log("✅ Authentification admin réussie!");
      console.log(`👤 Utilisateur connecté: ${authTest.user?.email}`);
    }

    // Résumé
    console.log("\n📋 Résumé des tests:");
    console.log("==================");
    console.log(`🔗 URL Supabase: ${supabaseUrl}`);
    console.log(`🔑 Clé API: ${supabaseKey.substring(0, 20)}...`);
    console.log("✅ Connexion de base: OK");
    console.log(usersError ? "❌ Table users: ERREUR" : "✅ Table users: OK");
    console.log(
      productsError ? "❌ Table products: ERREUR" : "✅ Table products: OK"
    );
    console.log(
      categoriesError
        ? "❌ Table categories: ERREUR"
        : "✅ Table categories: OK"
    );
    console.log(
      authError ? "⚠️ Auth admin: NON CONFIGURÉ" : "✅ Auth admin: OK"
    );
  } catch (error) {
    console.error("❌ Erreur générale:", error.message);
    console.log("\n🔧 Vérifiez vos variables d'environnement:");
    console.log("   - SUPABASE_URL");
    console.log("   - SUPABASE_ANON_KEY");
  }
}

// Fonction pour créer un utilisateur admin de test
async function createAdminUser() {
  console.log("\n🔧 Création d'un utilisateur admin de test...");

  try {
    // Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: "admin@careservice.com",
      password: "admin123",
    });

    if (authError) {
      console.error("❌ Erreur création auth:", authError.message);
      return;
    }

    console.log("✅ Utilisateur créé dans Supabase Auth");

    // Créer l'utilisateur dans la table users
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        full_name: "Administrateur",
        role: "admin",
        email: "admin@careservice.com",
      },
    ]);

    if (dbError) {
      console.error("❌ Erreur insertion table users:", dbError.message);
      return;
    }

    console.log("✅ Utilisateur admin créé avec succès!");
    console.log("📧 Email: admin@careservice.com");
    console.log("🔑 Mot de passe: admin123");
  } catch (error) {
    console.error("❌ Erreur création admin:", error.message);
  }
}

// Exécuter les tests
async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--create-admin")) {
    await createAdminUser();
  } else {
    await testDatabaseConnection();
  }
}

main().catch(console.error);
