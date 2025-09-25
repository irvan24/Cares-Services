import fetch from "node-fetch";

// Configuration N8n
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/reservation";
const N8N_API_KEY = process.env.N8N_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MzhhOTRkYS1lZWI4LTQ5MWItYWE4MC0yODg0NDViM2NkYjYiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU4MzMxMjMwfQ.dp3Pi6-7cqk1jkkSVk0JSKPKoTp8LWux_N8_n38Zgr4";

// Fonction pour envoyer les données vers N8n
const sendToN8n = async (reservationData) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Ajouter l'autorisation seulement si la clé est définie
    if (N8N_API_KEY) {
      headers.Authorization = `Bearer ${N8N_API_KEY}`;
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error(
        `N8n webhook failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi vers N8n:", error);
    throw error;
  }
};

// Contrôleur pour créer une réservation
export const createReservation = async (req, res) => {
  try {
    const {
      vehicle,
      selectedPlan,
      clientInfo,
      selectedDate,
      selectedTime,
      timestamp,
      totalPrice,
    } = req.body;

    // Validation des données
    if (
      !vehicle ||
      !selectedPlan ||
      !clientInfo ||
      !selectedDate ||
      !selectedTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Données manquantes pour la réservation",
      });
    }

    // Préparer les données pour N8n dans le format attendu
    const reservationData = {
      prenom: clientInfo.prenom,
      nom: clientInfo.nom,
      email: clientInfo.email,
      telephone: clientInfo.telephone,
      vehicule: vehicle,
      formule: selectedPlan,
      prix: totalPrice,
      adresse: clientInfo.adresse,
      codePostal: clientInfo.codePostal,
      ville: clientInfo.ville,
      commentaires: clientInfo.commentaires || "",
      rappel: clientInfo.rappel || false,
      submittedAt: timestamp || new Date().toISOString(),
    };

    // Envoyer vers N8n
    const n8nResponse = await sendToN8n(reservationData);

    // Réponse de succès
    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: {
        reservationId: n8nResponse.id || Date.now().toString(),
        status: "confirmed",
        clientInfo: {
          name: `${clientInfo.prenom} ${clientInfo.nom}`,
          email: clientInfo.email,
          phone: clientInfo.telephone,
        },
        service: {
          vehicle: vehicle,
          plan: selectedPlan,
          price: totalPrice,
        },
        schedule: {
          date: selectedDate,
          time: selectedTime,
        },
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);

    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la réservation",
      error: error.message,
    });
  }
};

// Contrôleur pour récupérer les réservations (optionnel)
export const getReservations = async (req, res) => {
  try {
    // Ici vous pourriez récupérer depuis une base de données
    // Pour l'instant, on retourne un message
    res.status(200).json({
      success: true,
      message: "Liste des réservations",
      data: [],
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des réservations",
      error: error.message,
    });
  }
};
