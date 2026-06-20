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

  const body = req.body;
  const callback = body?.Body?.stkCallback;

  if (!callback) {
    return res.status(400).json({ error: "Invalid callback data" });
  }

  const checkoutRequestId = callback.CheckoutRequestID;
  const resultCode = callback.ResultCode;
  const resultDesc = callback.ResultDesc;

  if (resultCode === 0) {
    const items = callback.CallbackMetadata?.Item || [];
    const getValue = (name: string) => items.find((i: any) => i.Name === name)?.Value;

    const mpesaReceipt = getValue("MpesaReceiptNumber");
    const amount = getValue("Amount");
    const phone = getValue("PhoneNumber");

    await supabase
      .from("payments")
      .update({
        status: "completed",
        mpesa_receipt: mpesaReceipt,
        result_desc: resultDesc,
        updated_at: new Date().toISOString(),
      })
      .eq("checkout_request_id", checkoutRequestId);

    await resend.emails.send({
      from: "Masira & CO Consulting <info@masiraconsultingltd.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Payment Received — KES ${amount}`,
      html: `
        <h2>New Payment Received</h2>
        <p><strong>Amount:</strong> KES ${amount}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>M-Pesa Receipt:</strong> ${mpesaReceipt}</p>
      `,
    });
  } else {
    await supabase
      .from("payments")
      .update({
        status: "failed",
        result_desc: resultDesc,
        updated_at: new Date().toISOString(),
      })
      .eq("checkout_request_id", checkoutRequestId);
  }

  return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
}