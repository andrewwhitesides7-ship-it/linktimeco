// app/api/checkout/route.js
// Same as before, only the custom_fields dropdown changed to the new offer:
// pick a ball make/model, or send in your own (free prepaid label).

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
          key: "ballchoice",
          label: { type: "custom", custom: "Which ball goes in your dial?" },
          type: "dropdown",
          dropdown: {
            options: [
              {
                label: "I'll send in my own ball (free prepaid label)",
                value: "own_ball",
              },
              { label: "Titleist Pro V1", value: "prov1" },
              { label: "Titleist Pro V1x", value: "prov1x" },
              { label: "Titleist AVX", value: "avx" },
              { label: "TaylorMade TP5", value: "tp5" },
              { label: "TaylorMade TP5x", value: "tp5x" },
              { label: "Callaway Chrome Soft", value: "chromesoft" },
              { label: "Callaway Chrome Tour", value: "chrometour" },
              { label: "Bridgestone Tour B", value: "tourb" },
              { label: "Srixon Z-Star", value: "zstar" },
              { label: "Not sure yet, help me pick", value: "undecided" },
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
