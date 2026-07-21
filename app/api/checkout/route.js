import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const origin = req.headers.get("origin") || "https://linkstimeco.com";

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Dimple Dial Watch",
            description:
              "Handcrafted automatic golf watch. Your ball, built into the dial. Lifetime guarantee.",
          },
          unit_amount: 50000,
        },
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
    return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return Response.json({ clientSecret: session.client_secret });
}
