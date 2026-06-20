import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { checkoutRequestId } = req.query;

  if (!checkoutRequestId) {
    return res.status(400).json({ error: "checkoutRequestId is required" });
  }

  const { data, error } = await supabase
    .from("payments")
    .select("status, mpesa_receipt, amount")
    .eq("checkout_request_id", checkoutRequestId)
    .single();

  if (error) {
    return res.status(404).json({ error: "Payment not found" });
  }

  return res.status(200).json(data);
}