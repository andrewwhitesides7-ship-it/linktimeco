// app/api/webhook/route.js
// Fires after a successful Stripe payment and sends the buyer their
// ball-instructions email. This is the email your success page promises.

import Stripe from "stripe";
import { Resend } from "resend";

// Stripe needs the RAW request body to verify the signature, so we must
// NOT let Next parse it. This export tells Next to hand us the raw body.
export const runtime = "nodejs";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const name = session.customer_details?.name || "there";
    const firstName = name.split(" ")[0];

    // Read which ball option they picked in the checkout dropdown
    const ballField = (session.custom_fields || []).find(
      (f) => f.key === "ballchoice"
    );
    const ballValue = ballField?.dropdown?.value || "";
    const sendingOwnBall = ballValue === "ownball";

    if (!email) {
      console.error("No email on completed session", session.id);
      return new Response("ok", { status: 200 });
    }

    try {
      await resend.emails.send({
        from: "Andrew at Links Time Co <hello@linkstimeco.com>",
        replyTo: "andrewwhitesides7@gmail.com",
        to: email,
        subject: sendingOwnBall
          ? "Your Links Time watch + how to send your ball in"
          : "Your Links Time watch is in the queue",
        html: sendingOwnBall
          ? ownBallEmail(firstName)
          : houseBallEmail(firstName),
      });
    } catch (err) {
      console.error("Order email failed:", err.message);
      // Still return 200 so Stripe does not retry forever. You will see
      // this in logs and can resend manually if needed.
    }
  }

  return new Response("ok", { status: 200 });
}

// ---- Email: customer is sending their own ball ----
function ownBallEmail(firstName) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #17251f;">
    <h2 style="color: #076652;">You're in, ${firstName}.</h2>
    <p>Andrew here, the guy who actually builds these. Thanks for the order,
    I'm fired up to build yours.</p>

    <p><strong>Next step: get me your ball.</strong> A prepaid shipping label
    is landing in this inbox within 24 hours, so you won't pay a cent to ship it.
    When it arrives, just:</p>

    <ul style="line-height:1.7;">
      <li>Wrap the ball so it doesn't rattle (a sock or bubble wrap is perfect)</li>
      <li>Drop in a quick note with the story of the shot, the hole, the yardage, the club, whoever saw it</li>
      <li>Stick the label on, and drop it at any USPS spot</li>
    </ul>

    <p>The second your ball hits my bench I get to work. Whole thing runs about
    two weeks, ball to wrist, and I'll send you photos along the way.</p>

    <p>Any questions, weird ball situation, anything at all, just reply. This
    goes straight to me.</p>

    <p style="color:#888; font-size:13px;">Andrew<br>Links Time Co.</p>
  </div>`;
}

// ---- Email: customer picked a ball for us to source ----
function houseBallEmail(firstName) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #17251f;">
    <h2 style="color: #076652;">You're in, ${firstName}.</h2>
    <p>Andrew here, the guy who actually builds these. Thanks for the order,
    I'm fired up to build yours.</p>

    <p><strong>You're all set, nothing to ship.</strong> I've got the ball you
    picked and I'll cut your dial from it by hand. Every dimple pattern is
    different, so yours ends up one of one no matter what.</p>

    <p>If there's a story behind why you picked that ball, reply and tell me,
    I like knowing what I'm building.</p>

    <p>Build runs about two weeks and I'll send photos along the way. Any
    questions at all, just reply. This goes straight to me.</p>

    <p style="color:#888; font-size:13px;">Andrew<br>Links Time Co.</p>
  </div>`;
}
