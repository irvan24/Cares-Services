// Script de test pour l'authentification admin
// À exécuter dans la console du navigateur sur la page admin/login

async function testAdminAuth() {
  const API_URL = "http://localhost:3001";

  console.log("🧪 Test d'authentification admin...");

  try {
    // Test de connexion
    const loginResponse = await fetch(`${API_URL}/auth/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@careservice.com",
        password: "admin123",
      }),
    });

    const loginData = await loginResponse.json();
    console.log("📝 Réponse de connexion:", loginData);

    if (loginData.success) {
      console.log("✅ Connexion réussie !");

      // Test de vérification du token
      const verifyResponse = await fetch(`${API_URL}/auth/admin/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: loginData.token,
        }),
      });

      const verifyData = await verifyResponse.json();
      console.log("🔍 Réponse de vérification:", verifyData);

      if (verifyData.success) {
        console.log("✅ Token valide !");
      } else {
        console.log("❌ Token invalide");
      }
    } else {
      console.log("❌ Échec de la connexion:", loginData.error);
    }
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
  }
}

// Exécuter le test
testAdminAuth();
