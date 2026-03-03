import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          _subject: `New inquiry: ${form.service} — ${form.name}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast({ title: "Submission Failed", description: "Please try again or contact us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network Error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
    if (submitted) setSubmitted(false);
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact Us"
        description="Get in touch with IBS Consulting for a free consultation on management, HR, accounting, ICT, or marketing services."
        path="/contact"
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
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Contact Us</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Let's Start a Conversation
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Reach out to discuss how we can help your business grow. Your first consultation is free.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <div className="bg-card rounded-xl p-8 shadow-card">
                  {submitted ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                      <h2 className="text-2xl font-display font-bold text-foreground mb-2">Thank You!</h2>
                      <p className="text-muted-foreground mb-6">We've received your message and will respond within 24 hours.</p>
                      <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-display font-bold text-foreground mb-6">Send Us a Message</h2>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                            <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" aria-invalid={!!errors.name} />
                            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                            <Input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" type="email" aria-invalid={!!errors.email} />
                            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254 7XX XXX XXX" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Service Needed *</label>
                            <Select value={form.service} onValueChange={(v) => update("service", v)}>
                              <SelectTrigger aria-invalid={!!errors.service}><SelectValue placeholder="Select a service" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="management">Management Consulting</SelectItem>
                                <SelectItem value="hr">HR Solutions</SelectItem>
                                <SelectItem value="marketing">Sales & Marketing</SelectItem>
                                <SelectItem value="accounting">Accounting & Bookkeeping</SelectItem>
                                <SelectItem value="ict">ICT Consultancy</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                          <Textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} placeholder="Tell us about your project..." aria-invalid={!!errors.message} />
                          {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                        </div>
                        <Button type="submit" size="lg" disabled={submitting} className="w-full bg-gradient-primary border-0 text-primary-foreground hover:opacity-90">
                          {submitting ? "Sending…" : "Send Message"}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Office</p>
                        <p className="text-muted-foreground text-sm">Nairobi, Kenya</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Phone</p>
                        <a href="tel:+254700000000" className="text-muted-foreground text-sm hover:text-secondary transition-colors">+254 7XX XXX XXX</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Mail size={18} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Email</p>
                        <a href="mailto:info@ibsconsulting.co.ke" className="text-muted-foreground text-sm hover:text-secondary transition-colors">info@ibsconsulting.co.ke</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <MessageCircle size={18} className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">WhatsApp</p>
                        <a
                          href={`https://wa.me/254700000000?text=${encodeURIComponent("Hi, I'd like to inquire about your consulting services.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                        >
                          Chat with us
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl overflow-hidden shadow-card">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.32335!2d36.68!3d-1.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
