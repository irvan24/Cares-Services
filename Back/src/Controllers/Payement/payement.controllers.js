// Contrôleur pour les paiements
import { supabase } from "../../supabaseClient.js";

// Initier un checkout
export const initiateCheckout = async (req, res) => {
  try {
    const { amount, currency = "EUR", orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Amount and orderId are required",
      });
    }

    // Ici vous pouvez intégrer Stripe, PayPal, ou autre service de paiement
    // Pour l'instant, nous simulons un checkout
    const checkoutSession = {
      id: `cs_${Date.now()}`,
      url: `https://checkout.example.com/session/${Date.now()}`,
      amount: amount,
      currency: currency,
      orderId: orderId,
    };

    res.status(200).json({
      success: true,
      message: "Checkout session created",
      data: checkoutSession,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      success: false,
      message: "Error creating checkout session",
      error: error.message,
    });
  }
};

// Gérer les webhooks de paiement
export const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log("Payment webhook received:", { type, data });

    // Traiter différents types d'événements de paiement
    switch (type) {
      case "payment.succeeded":
        // Mettre à jour le statut de la commande
        await updateOrderStatus(data.orderId, "paid");
        break;

      case "payment.failed":
        // Mettre à jour le statut de la commande
        await updateOrderStatus(data.orderId, "failed");
        break;

      default:
        console.log("Unhandled webhook event type:", type);
    }

    res.status(200).json({
      success: true,
      message: "Webhook processed",
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({
      success: false,
      message: "Error processing webhook",
      error: error.message,
    });
  }
};

// Fonction utilitaire pour mettre à jour le statut d'une commande
const updateOrderStatus = async (orderId, status) => {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: status })
      .eq("id", orderId);

    if (error) {
      console.error("Error updating order status:", error);
    } else {
      console.log(`Order ${orderId} status updated to ${status}`);
    }
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
  }
};
