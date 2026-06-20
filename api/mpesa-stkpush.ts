import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL =
  process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const data = await res.json();
  return data.access_token;
}

function getTimestamp() {
  const date = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { phone, amount, purpose, clientName } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: "Phone number and amount are required" });
  }

  let formattedPhone = phone.replace(/\s+/g, "").replace(/^0/, "254").replace(/^\+/, "");
  if (!formattedPhone.startsWith("254")) {
    formattedPhone = "254" + formattedPhone;
  }

  try {
    const accessToken = await getAccessToken();
    const timestamp = getTimestamp();
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const callbackUrl = `https://${req.headers.host}/api/mpesa-callback`;

    const stkRes = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: shortcode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: "Masira Consulting",
        TransactionDesc: purpose || "Consulting Payment",
      }),
    });

    const stkData = await stkRes.json();

    if (stkData.ResponseCode === "0") {
      await supabase.from("payments").insert([
        {
          checkout_request_id: stkData.CheckoutRequestID,
          merchant_request_id: stkData.MerchantRequestID,
          phone: formattedPhone,
          amount: amount,
          purpose: purpose || "Consulting Payment",
          client_name: clientName || "",
          status: "pending",
        },
      ]);

      return res.status(200).json({
        success: true,
        message: "STK Push sent. Check your phone to complete payment.",
        checkoutRequestId: stkData.CheckoutRequestID,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: stkData.errorMessage || "Failed to initiate payment",
      });
    }
  } catch (error) {
    console.error("STK Push error:", error);
    return res.status(500).json({ error: "Payment request failed. Please try again." });
  }
}