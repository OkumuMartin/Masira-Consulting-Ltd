import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Building2, CheckCircle, Copy, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bankDetails = {
  accountName: "MASIRA CONSULTING LTD",
  accountNumber: "1600287121641",
  branch: "FEDHA BRANCH, NAIROBI",
  bank: "EQUITY BANK KENYA",
  swiftCode: "EQBLKENA",
};

const Payment = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"mpesa" | "bank">("mpesa");
  const [form, setForm] = useState({ name: "", phone: "", amount: "", purpose: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "waiting" | "success" | "failed">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({ title: "Copied!", description: `${label} copied to clipboard.` });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleMpesaSubmit = async (e: React.FormEvent) => {
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
        setStatus("success");
        toast({ title: "Check your phone!", description: "Enter your M-Pesa PIN to complete the payment." });
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
    setForm({ name: "", phone: "", amount: "", purpose: "" });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Make a Payment"
        description="Securely pay Masira & CO Consulting Ltd via M-Pesa or Equity Bank transfer."
        path="/payment"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary text-sm font-medium">Secure Payments</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Make a Payment
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Pay for consultations, invoices, or service fees securely using M-Pesa or direct bank transfer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Payment Section */}
        <section className="py-20">
          <div className="container max-w-2xl">

            {/* Tab Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              <button
                onClick={() => setActiveTab("mpesa")}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  activeTab === "mpesa"
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : "border-border bg-card hover:border-green-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeTab === "mpesa" ? "bg-green-500" : "bg-muted"
                }`}>
                  <Smartphone className={`w-5 h-5 ${activeTab === "mpesa" ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <div className="text-left">
                  <p className={`font-semibold text-sm ${activeTab === "mpesa" ? "text-green-700 dark:text-green-400" : "text-foreground"}`}>
                    M-Pesa
                  </p>
                  <p className="text-xs text-muted-foreground">Instant payment</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("bank")}
                className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  activeTab === "bank"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-border bg-card hover:border-blue-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeTab === "bank" ? "bg-blue-600" : "bg-muted"
                }`}>
                  <Building2 className={`w-5 h-5 ${activeTab === "bank" ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <div className="text-left">
                  <p className={`font-semibold text-sm ${activeTab === "bank" ? "text-blue-700 dark:text-blue-400" : "text-foreground"}`}>
                    Bank Transfer
                  </p>
                  <p className="text-xs text-muted-foreground">Equity Bank</p>
                </div>
              </button>
            </motion.div>

            {/* M-Pesa Tab */}
            {activeTab === "mpesa" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                {status === "success" ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">STK Push Sent!</h2>
                    <p className="text-muted-foreground mb-6">Check your phone and enter your M-Pesa PIN to complete the payment.</p>
                    <Button onClick={resetForm} variant="outline">Make Another Payment</Button>
                  </div>
                ) : status === "failed" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">Payment Failed</h2>
                    <p className="text-muted-foreground mb-6">Something went wrong. Please try again.</p>
                    <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700 text-white border-0">Try Again</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-bold text-foreground">Pay with M-Pesa</h2>
                        <p className="text-muted-foreground text-sm">You will receive a prompt on your phone</p>
                      </div>
                    </div>

                    <form onSubmit={handleMpesaSubmit} className="space-y-5">
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
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                        ) : (
                          <><Smartphone className="w-4 h-4 mr-2" /> Pay Now via M-Pesa</>
                        )}
                      </Button>
                      <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                        <ShieldCheck size={14} />
                        Secured by Safaricom M-Pesa
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* Bank Transfer Tab */}
            {activeTab === "bank" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground">Bank Transfer</h2>
                    <p className="text-muted-foreground text-sm">Transfer directly to our Equity Bank account</p>
                  </div>
                </div>

                {/* Bank Details Cards */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Bank Name", value: bankDetails.bank },
                    { label: "Account Name", value: bankDetails.accountName },
                    { label: "Account Number", value: bankDetails.accountNumber },
                    { label: "Branch", value: bankDetails.branch },
                    { label: "Swift Code", value: bankDetails.swiftCode },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border"
                    >
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="font-semibold text-foreground">{item.value}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className={`p-2 rounded-lg transition-colors ${
                          copied === item.label
                            ? "bg-green-100 text-green-600 dark:bg-green-950"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {copied === item.label ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mb-6">
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-3">
                    📋 Payment Instructions
                  </p>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li className="flex gap-2"><span className="font-bold shrink-0">1.</span> Open your banking app or visit any Equity Bank branch</li>
                    <li className="flex gap-2"><span className="font-bold shrink-0">2.</span> Transfer your payment to the account details above</li>
                    <li className="flex gap-2"><span className="font-bold shrink-0">3.</span> Use your name or invoice number as the reference</li>
                    <li className="flex gap-2"><span className="font-bold shrink-0">4.</span> Send your proof of payment to info@masiraconsultingltd.com</li>
                    <li className="flex gap-2"><span className="font-bold shrink-0">5.</span> We will confirm receipt within 24 hours</li>
                  </ol>
                </div>

                {/* Send Proof of Payment Button */}
                <a href="mailto:info@masiraconsultingltd.com?subject=Payment%20Proof%20-%20Bank%20Transfer&body=Hello%20Masira%20Consulting%2C%0A%0AI%20have%20made%20a%20bank%20transfer%20payment.%20Please%20find%20attached%20my%20proof%20of%20payment.%0A%0AName%3A%0AAmount%3A%0ADate%3A%0AReference%3A">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Send Proof of Payment via Email
                  </Button>
                </a>

                <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mt-4">
                  <ShieldCheck size={14} />
                  Secured by Equity Bank Kenya
                </div>
              </motion.div>
            )}

            {/* Need Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-muted-foreground text-sm">
                Need help with your payment?{" "}
                <a href="tel:+254141482542" className="text-secondary font-medium hover:underline">
                  Call us: +254 141 482 542
                </a>
              </p>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
