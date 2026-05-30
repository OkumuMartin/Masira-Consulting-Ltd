import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Strategy", "HR", "Marketing", "Technology", "Finance"] as const;

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  fullContent: string;
  additionalInfo?: string;
}

const articles: Article[] = [
  {
    id: "digital-transformation-2025",
    title: "Digital Transformation: A Roadmap for East African SMEs",
    excerpt:
      "How small and mid-sized enterprises in Kenya can leverage cloud computing, automation, and data analytics to compete globally.",
    category: "Technology",
    date: "2025-06-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    fullContent: `
Digital transformation remains a critical priority for SMEs across East Africa in 2025–2026. Many Kenyan businesses still operate with legacy systems, limiting scalability and customer experience.

Core pillars for success include:

• Cloud adoption — migrate non-sensitive workloads to affordable providers such as AWS Lightsail, Azure for Startups, or Google Cloud’s regional instances.
• Process automation — implement low-code tools (Microsoft Power Automate, Zapier, or Make.com) to eliminate repetitive manual tasks.
• Data analytics — use cost-effective platforms like Google Looker Studio or Microsoft Power BI to turn raw sales and customer data into actionable insights.

Implementation roadmap:
1. Conduct a digital maturity assessment (free tools available from Google and Microsoft).
2. Prioritize quick wins with high ROI (e.g., WhatsApp Business API for customer service).
3. Invest in staff digital literacy training — allocate 2–4% of payroll annually.
4. Establish basic cybersecurity hygiene before scaling.

Real-world example: A Mombasa-based importer reduced order processing time from 48 hours to under 4 hours after adopting automated inventory alerts and cloud-based CRM.

Challenges to anticipate: unreliable power/internet, skills gaps, and initial resistance to change. Start small, measure results, and scale iteratively.
    `,
    additionalInfo: "Reference: Kenya Digital Economy Blueprint 2025–2030 and World Bank SME Digitalization Report 2025",
  },

  {
    id: "talent-retention-strategies",
    title: "5 Talent Retention Strategies That Actually Work",
    excerpt:
      "Beyond competitive salaries — discover the non-monetary levers that keep your best people engaged and loyal.",
    category: "HR",
    date: "2025-05-28",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
    fullContent: `
High employee turnover continues to erode profitability in many Kenyan and East African organisations. While salary increases help, research consistently shows they rank below purpose, growth, and culture in long-term retention drivers.

Proven non-monetary strategies:

1. Clear career progression paths — conduct quarterly growth conversations with documented next-role requirements.
2. Meaningful autonomy — reduce approval layers and allow teams to own end-to-end outcomes.
3. Recognition that matters — implement peer-nominated awards, public shout-outs in company channels, and small tangible rewards (gift cards, extra leave days).
4. Flexible working arrangements — offer hybrid models with core hours and trust-based output measurement.
5. Personal development investment — provide an annual learning budget (KES 50,000–120,000 per employee) for courses, certifications, books, or conferences.

Supporting data (2025 regional benchmarks):
• Companies with structured internal mobility retain 38–44% more high performers.
• Organisations with regular recognition see 31% lower voluntary turnover.

Start by surveying your current team anonymously to identify the highest-impact levers for your specific culture.
    `,
  },

  {
    id: "financial-reporting-best-practices",
    title: "Financial Reporting Best Practices for Growing Businesses",
    excerpt:
      "Streamline your financial reporting process with these proven frameworks that improve decision-making and investor confidence.",
    category: "Finance",
    date: "2025-05-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    fullContent: `
As Kenyan businesses scale beyond KES 100–500 million in revenue, informal record-keeping quickly becomes a liability for decision-making, tax compliance, and fundraising.

Recommended best practices:

1. Adopt standardised chart of accounts — align with IFRS for SMEs or Kenyan tax classification.
2. Implement monthly management accounts — include P&L, balance sheet, cash flow, and 3–5 key KPIs (gross margin, burn rate, debtor days).
3. Use accrual accounting — recognise revenue and expenses when earned/incurred, not when cash changes hands.
4. Automate bank reconciliations and inter-company transactions — tools such as QuickBooks Online, Xero, or Sage Business Cloud perform well in the region.
5. Maintain rolling 12-month forecasts — update quarterly and compare actuals vs budget monthly.
6. Segment reporting — track performance by product line, branch, or customer segment.

Investor & compliance benefits:
• Faster due diligence during fundraising rounds
• Reduced audit adjustments
• Improved banking relationships and credit terms

Common pitfalls to avoid: delaying reconciliations, mixing personal and business expenses, ignoring working capital trends.
    `,
    additionalInfo: "ICPAK guidance note: Financial Reporting for SMEs (updated 2025)",
  },

  {
    id: "market-entry-strategy",
    title: "Entering New Markets: A Strategic Framework",
    excerpt:
      "A step-by-step guide to evaluating, planning, and executing successful market expansion across East Africa.",
    category: "Strategy",
    date: "2025-04-22",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    fullContent: `
East Africa’s economic integration (EAC, AfCFTA) creates significant cross-border opportunities — yet many Kenyan firms underestimate localisation and regulatory differences.

Structured market-entry framework:

Phase 1 – Research & Validation (0–3 months)
• Macro analysis: GDP growth, population demographics, competitive density
• Customer discovery: 30–50 qualitative interviews + secondary data
• Legal/regulatory scan: import duties, standards, licensing

Phase 2 – Go-to-Market Design (3–6 months)
• Entry mode decision: direct export, distributor, local subsidiary, JV
• Pricing & positioning: account for purchasing power and perceived value
• Channel strategy: leverage existing wholesalers, e-commerce platforms (Jumia, Kilimall), or direct B2B sales

Phase 3 – Launch & Scale (6–18 months)
• Pilot in one city/segment before full rollout
• Local talent hiring or strong country manager
• Marketing tailored to local languages and cultural nuances

Risk mitigation:
• Currency hedging for USD/KES volatility
• Political & regulatory change monitoring
• Building relationships with local chambers and government bodies

Success example: Several Nairobi-based FMCG brands achieved 25–40% YoY growth in Uganda and Tanzania by prioritising distributor training and localised packaging.
    `,
  },

  {
    id: "social-media-roi",
    title: "Measuring Social Media ROI for B2B Companies",
    excerpt:
      "Move beyond vanity metrics — learn how to attribute revenue and pipeline growth to your social media efforts.",
    category: "Marketing",
    date: "2025-04-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    fullContent: `
Many B2B organisations in East Africa invest in LinkedIn, X, and Instagram without clear measurement frameworks, leading to misallocated budgets.

Shift from vanity to revenue-focused metrics:

1. Pipeline attribution — use UTM parameters + CRM integration (HubSpot, Zoho, Salesforce) to track leads from social posts.
2. Engagement-to-opportunity conversion rate — benchmark: 2–5% for high-quality content.
3. Customer acquisition cost (CAC) per channel — compare social vs paid search vs referrals.
4. Multi-touch attribution models — assign partial credit to social touchpoints in long sales cycles.
5. Lifetime value (LTV) of social-sourced customers — usually higher due to warmer leads.

Practical setup:
• Link tracking: bit.ly or native UTM builder
• Goal tracking: form submissions, demo bookings, content downloads
• Monthly dashboard: Google Data Studio / Looker Studio

Typical ROI benchmarks for B2B in 2025:
• LinkedIn thought-leadership posts → 3–8 qualified leads per 10,000 impressions
• Targeted video content → 1.5–4× higher engagement than static posts

Focus content on solving real pain points rather than product features.
    `,
  },

  {
    id: "cybersecurity-essentials",
    title: "Cybersecurity Essentials Every Business Leader Must Know",
    excerpt:
      "From phishing awareness to zero-trust architecture — the non-technical guide to protecting your organisation.",
    category: "Technology",
    date: "2025-03-18",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    fullContent: `
Cyber incidents targeting East African businesses increased by 47% in 2024–2025, with SMEs particularly vulnerable due to limited resources.

Essential controls every leader should enforce:

1. Multi-factor authentication (MFA) — mandate for email, banking, ERP, and cloud services.
2. Regular phishing simulation training — run quarterly tests (KnowBe4, Microsoft Attack Simulation).
3. Endpoint protection — deploy next-gen antivirus (CrowdStrike Falcon, Microsoft Defender for Business).
4. Backup discipline — 3-2-1 rule (3 copies, 2 media types, 1 offsite/air-gapped).
5. Access control — implement least-privilege and role-based access; review quarterly.
6. Incident response plan — document who to call, what to preserve, and communication steps.

Quick wins with high impact:
• Disable macros in Office files by default
• Use password manager + strong unique passwords
• Keep software and devices updated automatically

Cost-effective tools suitable for Kenyan SMEs:
• Microsoft 365 Business Premium (includes Defender + MFA)
• Google Workspace with enhanced security add-ons
• Open-source options (e.g., pfSense firewall, ClamAV)

Remember: 82% of breaches involve human error — training and awareness remain the strongest defence layer.
    `,
  },
];

const Blog = () => {
  const [active, setActive] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const filtered = articles.filter((a) => {
    const matchCat = active === "All" || a.category === active;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast({ title: "Subscribed!", description: "You'll receive our latest insights in your inbox." });
        setEmail("");
      } else {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
  title="Insights & Blog"
  description="Expert articles on management consulting, HR, marketing, finance, and technology from Masira Consulting Ltd — helping businesses grow in Nairobi, Kenya and East Africa."
  path="/blog"
/>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Insights</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Ideas That Drive Growth
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Expert perspectives on strategy, HR, technology, and finance to help your business thrive.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 border-b border-border sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
          <div className="container flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    active === cat ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="pl-9"
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">No articles found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((article, i) => {
                  const isExpanded = expandedId === article.id;

                  return (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary">
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(article.date).toLocaleDateString("en-KE", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {article.excerpt}
                        </p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 pb-2 border-t border-border mt-4">
                                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                  {article.fullContent}
                                </p>

                                {article.additionalInfo && (
                                  <p className="mt-4 text-sm italic text-muted-foreground/80 border-l-2 border-secondary/40 pl-3">
                                    {article.additionalInfo}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => toggleExpand(article.id)}
                          className="inline-flex items-center gap-1.5 text-secondary text-sm font-medium hover:gap-2 transition-all mt-3"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                          {isExpanded ? <ChevronUp size={14} /> : <ArrowRight size={14} />}
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-24 bg-gradient-surface">
          <div className="container max-w-2xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Stay Updated</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Subscribe for Insights
              </h2>
              <p className="text-muted-foreground mb-8">
                Get the latest articles on business strategy, technology, and growth delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={submitting} className="bg-gradient-primary border-0 text-primary-foreground hover:opacity-90">
                  {submitting ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;