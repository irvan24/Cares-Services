import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
  typescript: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      customerInfo,
      totalAmount,
      deliveryFee,
    }: {
      items: Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
        image?: string;
      }>;
      customerInfo: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
      };
      totalAmount: number;
      deliveryFee: number;
    } = body;

    // Vérifier les variables d'environnement
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured" },
        { status: 500 }
      );
    }

    // Créer les line items pour Stripe
    const lineItems = [
      ...items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convertir en centimes
        },
        quantity: item.quantity,
      })),
      // Ajouter les frais de livraison comme un item séparé
      ...(deliveryFee > 0
        ? [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: "Frais de livraison",
                },
                unit_amount: Math.round(deliveryFee * 100),
              },
              quantity: 1,
            },
          ]
        : []),
    ];

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerInfo.email,
      metadata: {
        customer_firstName: customerInfo.firstName,
        customer_lastName: customerInfo.lastName,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        customer_city: customerInfo.city,
        customer_postalCode: customerInfo.postalCode,
        customer_country: customerInfo.country,
        items: JSON.stringify(items),
      },
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/commande/annule`,
      locale: "fr",
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Erreur lors de la création de la session Stripe:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création de la session" },
      { status: 500 }
    );
  }
}
