import { Resend } from "resend";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return Response.json({ error: "Invalid email." }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (err) {
        console.error("Contact save failed:", err.message);
      }
    }

    await resend.emails.send({
      from: "Links Time Co <hello@linkstimeco.com>",
      to: email,
      subject: "Your 20% off code for Links Time Co.",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #0b5d3b;">Here's your code.</h2>
        <p>Use this at checkout for 20% off your first build:</p>
        <div style="background:#f2f7f4; border-radius:10px; padding:16px; text-align:center; font-size:24px; font-weight:700; letter-spacing:2px; color:#0b5d3b;">
          Holein1
        </div>
        <p style="margin-top:20px;">Every Dimple Dial is cut by hand from a real golf ball and built
        one at a time. If you've got a hole-in-one ball or one with a story,
        we'll build yours from it, and shipping the ball to us is on us.</p>
        <p>Don't have a ball? No worries. We can build your watch from any
        ball, including one of ours, and it'll still be one of one, because
        no two dimple patterns are alike.</p>
        <p><a href="https://linkstimeco.com" style="color:#0b5d3b; font-weight:600;">Order your build</a></p>
        <p style="color:#888; font-size:13px;">— AJ, Links Time Co.</p>
      </div>`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
