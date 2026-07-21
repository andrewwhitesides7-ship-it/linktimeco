import Stripe from "stripe";

export async function POST(req) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json(
        { error: "STRIPE_SECRET_KEY is not set in this deployment." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = req.headers.get("origin") || "https://linkstimeco.com";

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
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
            unit_amount: 40000,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: ["US"] },
      custom_fields: [
        {
          key: "dialoption",
          label: { type: "custom", custom: "Dial option" },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "Build it from my ball (we email a label)",
                value: "customball",
              },
              { label: "Use one of your golf balls", value: "houseball" },
            ],
          },
        },
      ],
      return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Checkout session error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
