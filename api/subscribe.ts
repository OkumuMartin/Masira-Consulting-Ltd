import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Save subscriber to Supabase (upsert = no duplicates)
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert([{ email }], { onConflict: "email" });

  if (error) {
    console.error("DB Error:", error);
    return res.status(500).json({ error: "Subscription failed" });
  }

  // Send welcome email
  await resend.emails.send({
    from: "Masira Consulting <info@masiraconsultingltd.com>",
    to: email,
    subject: "Welcome to Masira Consulting Insights!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">You're subscribed! 🎉</h2>
        <p>Thank you for subscribing to the <strong>Masira Consulting</strong> newsletter.</p>
        <p>You'll receive our latest insights, industry news, and business tips directly to your inbox.</p>
        <br/>
        <p>Best regards,<br/><strong>Masira Consulting Team</strong></p>
      </div>
    `,
  });

  return res.status(200).json({ success: true });
}