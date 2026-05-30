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

  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 1. Save to Supabase database
  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert([{ name, email, phone, service, message }]);

  if (dbError) {
    console.error("DB Error:", dbError);
    return res.status(500).json({ error: "Failed to save your message" });
  }

  // 2. Send confirmation email to the client
  await resend.emails.send({
    from: "Masira Consulting <onboarding@resend.dev>",
    to: email,
    subject: "We received your message!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Hello ${name},</h2>
        <p>Thank you for reaching out to <strong>Masira Consulting Ltd</strong>.</p>
        <p>We have received your message and will get back to you within <strong>24–48 hours</strong>.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Your message:</strong></p>
        <p style="color: #555;">${message}</p>
        <br/>
        <p>Best regards,<br/><strong>Masira Consulting Team</strong></p>
      </div>
    `,
  });

  // 3. Send notification email to admin
  await resend.emails.send({
    from: "Masira Website <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL!,
    subject: `New Inquiry: ${service || "General"} — ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone || "Not provided"}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${service || "Not specified"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${message}</td></tr>
        </table>
      </div>
    `,
  });

  return res.status(200).json({ success: true });
}