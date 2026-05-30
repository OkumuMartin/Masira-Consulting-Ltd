import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_PASSWORD = process.env.ADMIN_DASHBOARD_PASSWORD!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const { data: contacts, error: contactsError } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: subscribers, error: subscribersError } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (contactsError || subscribersError) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }

  return res.status(200).json({ contacts, subscribers });
}