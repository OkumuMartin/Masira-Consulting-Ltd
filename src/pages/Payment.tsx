import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, CheckCircle, XCircle, Loader2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", amount: "", purpose: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "waiting" | "success" | "failed">("idle");
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const pollStatus = (id: string) => {
    let attempts = 0;
    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/mpesa-status?checkoutRequestId=${id}`);
        const data = await res.json();

        if (data.status === "completed") {
          setStatus("success");
          setReceipt(data.mpesa_receipt);
          if (pollRef.current) clearInterval(pollRef.current);
        } else if (data.status === "failed") {
          setStatus("failed");
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {
        // keep polling
      }

      if (attempts >= 20) {
        // ~60 seconds timeout
        if (pollRef.current) clearInterval(pollRef.current);
        if (status === "waiting") setStatus("failed");
      }
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.phone || !form.amount) {
      toast({ title: "Missing details", description: "Please enter your phone number and amount.", variant: "destructive" });
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/mpesa-stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          amount: form.amount,
          purpose: form.purpose,
          clientName: form.name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("waiting");
        setCheckoutRequestId(data.checkoutRequestId);
        toast({ title: "Check your phone!", description: "Enter your M-Pesa PIN to complete the payment." });
        pollStatus(data.checkoutRequestId);
      } else {
        setStatus("failed");
        toast({ title: "Payment failed", description: data.error || "Please try again.", variant: "destructive" });
      }
    } catch {
      setStatus("failed");
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setCheckoutRequestId(null);
    setReceipt(null);
    setForm({ name: "", phone: "", amount: "", purpose: "" });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Make a Payment"
        description="Securely pay Masira & CO Consulting Ltd via M-Pesa for consultations, invoices, and service fees."
        path="/payment"
      />
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Make a Payment</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Pay Securely with M-Pesa
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Pay for consultations, invoices, or service fees instantly using M-Pesa.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              {status === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground mb-1">Thank you for your payment.</p>
                  {receipt && (
                    <p className="text-sm text-muted-foreground mb-6">
                      M-Pesa Receipt: <span className="font-mono font-semibold text-foreground">{receipt}</span>
                    </p>
                  )}
                  <Button onClick={resetForm} variant="outline">Make Another Payment</Button>
                </div>
              ) : status === "failed" ? (
                <div className="text-center py-8">
                  <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">Payment Not Completed</h2>
                  <p className="text-muted-foreground mb-6">The payment was cancelled or timed out. Please try again.</p>
                  <Button onClick={resetForm} className="bg-gradient-primary border-0 text-primary-foreground">Try Again</Button>
                </div>
              ) : status === "waiting" ? (
                <div className="text-center py-8">
                  <Loader2 className="w-16 h-16 text-secondary mx-auto mb-4 animate-spin" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">Check Your Phone</h2>
                  <p className="text-muted-foreground mb-2">
                    An M-Pesa prompt has been sent to <strong>{form.phone}</strong>
                  </p>
                  <p className="text-muted-foreground text-sm">Enter your M-Pesa PIN to complete the payment.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground">Pay with M-Pesa</h2>
                      <p className="text-muted-foreground text-sm">Fast, secure, and instant</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">M-Pesa Phone Number *</label>
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="07XX XXX XXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Amount (KES) *</label>
                      <Input
                        type="number"
                        min="1"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="e.g. 5000"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Payment For</label>
                      <Select value={form.purpose} onValueChange={(v) => setForm({ ...form, purpose: v })}>
                        <SelectTrigger><SelectValue placeholder="Select reason for payment" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Consultation Fee">Consultation Fee</SelectItem>
                          <SelectItem value="Service Invoice">Service Invoice</SelectItem>
                          <SelectItem value="Retainer Payment">Retainer Payment</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "sending"}
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-0"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-4 h-4 mr-2" /> Pay Now via M-Pesa
                        </>
                      )}
                    </Button>

                    <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground pt-2">
                      <ShieldCheck size={14} />
                      Secured by Safaricom M-Pesa
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
