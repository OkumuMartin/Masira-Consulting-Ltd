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
    excerpt: "How small and mid-sized enterprises in Kenya can leverage cloud computing, automation, and data analytics to compete globally.",
    category: "Technology",
    date: "2025-06-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    fullContent: `Digital transformation remains a critical priority for SMEs across East Africa in 2025-2026. Many Kenyan businesses still operate with legacy systems, limiting scalability and customer experience.\n\nCore pillars for success include:\n\n• Cloud adoption — migrate non-sensitive workloads to affordable providers such as AWS Lightsail, Azure for Startups, or Google Cloud's regional instances.\n• Process automation — implement low-code tools (Microsoft Power Automate, Zapier, or Make.com) to eliminate repetitive manual tasks.\n• Data analytics — use cost-effective platforms like Google Looker Studio or Microsoft Power BI to turn raw sales and customer data into actionable insights.\n\nImplementation roadmap:\n1. Conduct a digital maturity assessment (free tools available from Google and Microsoft).\n2. Prioritize quick wins with high ROI (e.g., WhatsApp Business API for customer service).\n3. Invest in staff digital literacy training — allocate 2-4% of payroll annually.\n4. Establish basic cybersecurity hygiene before scaling.\n\nReal-world example: A Mombasa-based importer reduced order processing time from 48 hours to under 4 hours after adopting automated inventory alerts and cloud-based CRM.\n\nChallenges to anticipate: unreliable power/internet, skills gaps, and initial resistance to change. Start small, measure results, and scale iteratively.`,
    additionalInfo: "Reference: Kenya Digital Economy Blueprint 2025-2030 and World Bank SME Digitalization Report 2025",
  },
  {
    id: "talent-retention-strategies",
    title: "5 Talent Retention Strategies That Actually Work",
    excerpt: "Beyond competitive salaries — discover the non-monetary levers that keep your best people engaged and loyal.",
    category: "HR",
    date: "2025-05-28",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
    fullContent: `High employee turnover continues to erode profitability in many Kenyan and East African organisations. While salary increases help, research consistently shows they rank below purpose, growth, and culture in long-term retention drivers.\n\nProven non-monetary strategies:\n\n1. Clear career progression paths — conduct quarterly growth conversations with documented next-role requirements.\n2. Meaningful autonomy — reduce approval layers and allow teams to own end-to-end outcomes.\n3. Recognition that matters — implement peer-nominated awards, public shout-outs in company channels, and small tangible rewards (gift cards, extra leave days).\n4. Flexible working arrangements — offer hybrid models with core hours and trust-based output measurement.\n5. Personal development investment — provide an annual learning budget (KES 50,000-120,000 per employee) for courses, certifications, books, or conferences.\n\nSupporting data (2025 regional benchmarks):\n• Companies with structured internal mobility retain 38-44% more high performers.\n• Organisations with regular recognition see 31% lower voluntary turnover.\n\nStart by surveying your current team anonymously to identify the highest-impact levers for your specific culture.`,
  },
  {
    id: "financial-reporting-best-practices",
    title: "Financial Reporting Best Practices for Growing Businesses",
    excerpt: "Streamline your financial reporting process with these proven frameworks that improve decision-making and investor confidence.",
    category: "Finance",
    date: "2025-05-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    fullContent: `As Kenyan businesses scale beyond KES 100-500 million in revenue, informal record-keeping quickly becomes a liability for decision-making, tax compliance, and fundraising.\n\nRecommended best practices:\n\n1. Adopt standardised chart of accounts — align with IFRS for SMEs or Kenyan tax classification.\n2. Implement monthly management accounts — include P&L, balance sheet, cash flow, and 3-5 key KPIs (gross margin, burn rate, debtor days).\n3. Use accrual accounting — recognise revenue and expenses when earned/incurred, not when cash changes hands.\n4. Automate bank reconciliations and inter-company transactions — tools such as QuickBooks Online, Xero, or Sage Business Cloud perform well in the region.\n5. Maintain rolling 12-month forecasts — update quarterly and compare actuals vs budget monthly.\n6. Segment reporting — track performance by product line, branch, or customer segment.\n\nInvestor & compliance benefits:\n• Faster due diligence during fundraising rounds\n• Reduced audit adjustments\n• Improved banking relationships and credit terms\n\nCommon pitfalls to avoid: delaying reconciliations, mixing personal and business expenses, ignoring working capital trends.`,
    additionalInfo: "ICPAK guidance note: Financial Reporting for SMEs (updated 2025)",
  },
  {
    id: "market-entry-strategy",
    title: "Entering New Markets: A Strategic Framework",
    excerpt: "A step-by-step guide to evaluating, planning, and executing successful market expansion across East Africa.",
    category: "Strategy",
    date: "2025-04-22",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    fullContent: `East Africa's economic integration (EAC, AfCFTA) creates significant cross-border opportunities — yet many Kenyan firms underestimate localisation and regulatory differences.\n\nStructured market-entry framework:\n\nPhase 1 - Research & Validation (0-3 months)\n• Macro analysis: GDP growth, population demographics, competitive density\n• Customer discovery: 30-50 qualitative interviews + secondary data\n• Legal/regulatory scan: import duties, standards, licensing\n\nPhase 2 - Go-to-Market Design (3-6 months)\n• Entry mode decision: direct export, distributor, local subsidiary, JV\n• Pricing & positioning: account for purchasing power and perceived value\n• Channel strategy: leverage existing wholesalers, e-commerce platforms (Jumia, Kilimall), or direct B2B sales\n\nPhase 3 - Launch & Scale (6-18 months)\n• Pilot in one city/segment before full rollout\n• Local talent hiring or strong country manager\n• Marketing tailored to local languages and cultural nuances\n\nRisk mitigation:\n• Currency hedging for USD/KES volatility\n• Political & regulatory change monitoring\n• Building relationships with local chambers and government bodies`,
  },
  {
    id: "social-media-roi",
    title: "Measuring Social Media ROI for B2B Companies",
    excerpt: "Move beyond vanity metrics — learn how to attribute revenue and pipeline growth to your social media efforts.",
    category: "Marketing",
    date: "2025-04-05",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    fullContent: `Many B2B organisations in East Africa invest in LinkedIn, X, and Instagram without clear measurement frameworks, leading to misallocated budgets.\n\nShift from vanity to revenue-focused metrics:\n\n1. Pipeline attribution — use UTM parameters + CRM integration (HubSpot, Zoho, Salesforce) to track leads from social posts.\n2. Engagement-to-opportunity conversion rate — benchmark: 2-5% for high-quality content.\n3. Customer acquisition cost (CAC) per channel — compare social vs paid search vs referrals.\n4. Multi-touch attribution models — assign partial credit to social touchpoints in long sales cycles.\n5. Lifetime value (LTV) of social-sourced customers — usually higher due to warmer leads.\n\nPractical setup:\n• Link tracking: bit.ly or native UTM builder\n• Goal tracking: form submissions, demo bookings, content downloads\n• Monthly dashboard: Google Data Studio / Looker Studio\n\nTypical ROI benchmarks for B2B in 2025:\n• LinkedIn thought-leadership posts: 3-8 qualified leads per 10,000 impressions\n• Targeted video content: 1.5-4x higher engagement than static posts\n\nFocus content on solving real pain points rather than product features.`,
  },
  {
    id: "cybersecurity-essentials",
    title: "Cybersecurity Essentials Every Business Leader Must Know",
    excerpt: "From phishing awareness to zero-trust architecture — the non-technical guide to protecting your organisation.",
    category: "Technology",
    date: "2025-03-18",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    fullContent: `Cyber incidents targeting East African businesses increased by 47% in 2024-2025, with SMEs particularly vulnerable due to limited resources.\n\nEssential controls every leader should enforce:\n\n1. Multi-factor authentication (MFA) — mandate for email, banking, ERP, and cloud services.\n2. Regular phishing simulation training — run quarterly tests (KnowBe4, Microsoft Attack Simulation).\n3. Endpoint protection — deploy next-gen antivirus (CrowdStrike Falcon, Microsoft Defender for Business).\n4. Backup discipline — 3-2-1 rule (3 copies, 2 media types, 1 offsite/air-gapped).\n5. Access control — implement least-privilege and role-based access; review quarterly.\n6. Incident response plan — document who to call, what to preserve, and communication steps.\n\nQuick wins with high impact:\n• Disable macros in Office files by default\n• Use password manager + strong unique passwords\n• Keep software and devices updated automatically\n\nCost-effective tools suitable for Kenyan SMEs:\n• Microsoft 365 Business Premium (includes Defender + MFA)\n• Google Workspace with enhanced security add-ons\n• Open-source options (e.g., pfSense firewall, ClamAV)\n\nRemember: 82% of breaches involve human error — training and awareness remain the strongest defence layer.`,
  },
  {
    id: "kenya-labour-laws-2025",
    title: "Kenya Labour Laws Every Employer Must Know in 2025",
    excerpt: "A practical guide to employment contracts, termination procedures, leave entitlements, and NSSF/NHIF obligations for Kenyan employers.",
    category: "HR",
    date: "2025-07-01",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    fullContent: `Kenya's employment landscape is governed primarily by the Employment Act (Cap 226), the Labour Relations Act, and the Work Injury Benefits Act. Non-compliance exposes employers to fines, tribunal hearings, and reputational damage.\n\nKey obligations every employer must meet:\n\n1. Written employment contracts — Every employee must receive a written contract within 3 months of starting work.\n\n2. Statutory deductions — NSSF, NHIF/SHIF, and PAYE must be deducted and remitted monthly.\n\n3. Leave entitlements — Annual leave: 21 working days. Sick leave: 7 days full pay. Maternity: 3 months fully paid. Paternity: 2 weeks fully paid.\n\n4. Termination procedures — Redundancy requires 1 month notice and severance of 15 days pay per year of service. Always hold a disciplinary hearing before termination.\n\n5. Working hours — Maximum 52 hours per week. Overtime paid at 1.5x on weekdays, 2x on public holidays.\n\nMasira & CO Consulting Ltd offers HR compliance audits to help your business stay fully compliant with Kenyan labour laws.`,
    additionalInfo: "Reference: Employment Act Cap 226 (Kenya), NSSF Act 2013, Labour Relations Act 2007",
  },
  {
    id: "recruitment-process-kenya",
    title: "How to Build a Winning Recruitment Process for Your Business",
    excerpt: "Step-by-step guide to attracting, screening, and hiring top talent in Kenya — without wasting time or money.",
    category: "HR",
    date: "2025-07-08",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    fullContent: `A poor recruitment process costs Kenyan businesses thousands of shillings in wasted salaries, lost productivity, and rehiring costs. Research shows a bad hire can cost up to 30% of that employee's annual salary.\n\nPhase 1 - Define the role clearly: Document job title, key responsibilities, must-have qualifications, salary range, and reporting structure before posting.\n\nPhase 2 - Source candidates strategically: Use LinkedIn for professional roles, BrighterMonday and Fuzu for general roles, and employee referrals for cultural fits.\n\nPhase 3 - Screen efficiently: CV shortlisting based on must-have criteria, a 10-15 minute phone screen, and a practical skills assessment.\n\nPhase 4 - Interview best practices: Use STAR-format questions, include at least 2 interviewers, and give a realistic job preview.\n\nPhase 5 - Make the offer: Verbal offer first, then written within 24 hours. State salary, start date, probation period, and benefits clearly.\n\nPhase 6 - Onboarding: Create a structured 90-day onboarding plan with weekly check-ins and clear 30/60/90-day goals.`,
  },
  {
    id: "business-plan-kenya",
    title: "Business Planning 101: How to Write a Business Plan That Works",
    excerpt: "A practical, no-nonsense guide to writing a business plan that attracts investors, secures bank loans, and guides your growth in Kenya.",
    category: "Strategy",
    date: "2025-07-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    fullContent: `A business plan is your roadmap for running and growing a successful business. The 8 essential sections:\n\n1. Executive Summary — Write last. Summarize your business, problem you solve, solution, target market, and funding requirement.\n\n2. Business Description — Legal structure, registration details, location, and current stage.\n\n3. Market Analysis — Industry overview, target market demographics, competitive analysis, and your competitive advantage.\n\n4. Products and Services — Detailed description, pricing strategy, and unique selling proposition.\n\n5. Marketing and Sales Strategy — How you will reach customers, sales process, and marketing budget.\n\n6. Operations Plan — Day-to-day operations, key suppliers, technology, and quality control.\n\n7. Management Team — Founders, key staff qualifications, organizational chart, and hiring plan.\n\n8. Financial Projections — 3-5 year revenue forecast, cost structure, break-even analysis, and cash flow statement.\n\nMasira & CO Consulting Ltd helps businesses develop investor-ready business plans tailored to the Kenyan market.`,
    additionalInfo: "Reference: Kenya Private Sector Alliance (KEPSA) SME Guidelines, KRA Business Registration Requirements 2025",
  },
  {
    id: "leadership-skills-kenya",
    title: "Leadership Skills Every Kenyan Business Owner Needs",
    excerpt: "From decision-making under pressure to building high-performance teams — the leadership capabilities that separate thriving businesses from struggling ones.",
    category: "Strategy",
    date: "2025-07-22",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    fullContent: `Many Kenyan business owners are brilliant at their craft but struggle with leadership as the business grows. The 7 critical leadership skills:\n\n1. Strategic thinking — Work on your business, not just in it. Schedule 2 hours weekly to review numbers and plan your next quarter.\n\n2. Financial literacy — Understand your P&L, cash flow, gross margin, and break-even point at all times.\n\n3. Delegation and trust — Hire people better than you in their area and give them clear outcomes. Micromanagement kills growth.\n\n4. Decision-making under uncertainty — Assess information available, consider worst-case outcomes, decide, and move forward. Paralysis costs more than imperfect choices.\n\n5. Communication and influence — Hold regular team meetings, give honest feedback, and listen actively. Culture is built through daily communication.\n\n6. Resilience and emotional intelligence — Manage your emotions, stay calm under pressure, and bounce back from setbacks quickly.\n\n7. Continuous learning — Read 1-2 business books per month, attend industry events, and invest in coaching or consulting support.`,
  },
  {
    id: "kra-tax-compliance-kenya",
    title: "KRA Tax Compliance Guide for Small Businesses in Kenya 2025",
    excerpt: "Everything you need to know about VAT, PAYE, corporate tax, and iTax filing to keep your business compliant and avoid KRA penalties.",
    category: "Finance",
    date: "2025-07-29",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    fullContent: `Tax compliance is one of the most common pain points for Kenyan SMEs. Key taxes every business must understand:\n\n1. Corporate Income Tax — 30% of net profit. SMEs below KES 50M may qualify for Turnover Tax at 1% of gross sales. File within 6 months of year end.\n\n2. VAT — 16% standard rate. Mandatory registration if turnover exceeds KES 5 million. File monthly by the 20th via iTax.\n\n3. PAYE — Deducted from employee salaries per KRA tax bands. Remit by 9th of following month. Personal relief of KES 2,400 per employee per month.\n\n4. Withholding Tax — 5% on consultancy, 10% on rent, 15% on dividends. Remit by 20th of following month.\n\nKey compliance rules: File nil returns even when you have no tax to pay (penalty: KES 20,000). Keep all records for 5 years. Late payment attracts 5% penalty plus 1% monthly interest.\n\nMasira & CO Consulting Ltd provides tax advisory and KRA compliance support for SMEs across Kenya.`,
    additionalInfo: "Reference: KRA Tax Laws (Amendment) Act 2024, Finance Act 2024 (Kenya)",
  },
  {
    id: "cash-flow-management-kenya",
    title: "How to Manage Cash Flow and Avoid Business Failure in Kenya",
    excerpt: "Cash flow problems are the number one reason Kenyan SMEs fail. Learn practical strategies to forecast, manage, and improve your cash position.",
    category: "Finance",
    date: "2025-08-05",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    fullContent: `Over 60% of businesses that fail do so not because they are unprofitable, but because they run out of cash. Six proven strategies:\n\n1. Build a 13-week cash flow forecast — Project inflows and outflows weekly to identify shortfalls early.\n\n2. Invoice immediately and follow up aggressively — Send invoices same day, use Net 7 or Net 14 terms, follow up on day 1 of overdue payment.\n\n3. Negotiate supplier payment terms — Extend payables to Net 30 or Net 45 while tightening your receivables.\n\n4. Maintain a cash reserve — Target minimum 3 months of operating expenses in a business savings account.\n\n5. Manage inventory lean — Stock only what you can sell within 30-60 days. Use demand forecasting.\n\n6. Use short-term financing wisely — Invoice discounting, bank overdraft, M-Shwari Business, or MSME loans from KCB, Equity, or Co-op Bank.\n\nWarning signs: Delaying supplier payments, borrowing to pay salaries, avoiding your bank account. Act immediately if you see these signs.\n\nMasira & CO Consulting Ltd offers cash flow assessment and financial management advisory across Kenya.`,
  },
  {
    id: "brand-identity-kenya",
    title: "How to Build a Strong Brand Identity for Your Business in Kenya",
    excerpt: "Your brand is more than a logo — it is the total experience clients have with your business. Learn how to build a brand that commands trust and premium prices.",
    category: "Marketing",
    date: "2025-08-12",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=600&q=80",
    fullContent: `Businesses with strong brands consistently outperform competitors — attracting better clients, charging higher prices, and retaining customers longer. The 7 pillars of a strong brand identity:\n\n1. Brand purpose and positioning — Why does your business exist? Who do you serve? What unique value do you deliver?\n\n2. Brand name and logo — Easy to pronounce in English and Swahili. Invest in a professional logo. Register your trademark with KIPI.\n\n3. Brand colors and typography — Choose 2-3 primary colors. Blue conveys trust, green conveys growth. Maximum 2 fonts.\n\n4. Brand voice and messaging — Consistent tone across all platforms. Create a tagline under 10 words. Write 25, 50, and 100-word company descriptions.\n\n5. Digital brand presence — Mobile-first website, fully completed Google My Business profile, active LinkedIn page, WhatsApp Business with auto-reply.\n\n6. Consistent visual identity — Templates for email signatures, letterheads, PowerPoint, social media posts, and proposals.\n\n7. Client experience as brand — Response speed, proposal quality, follow-up consistency. In Kenya's relationship-driven market, personal trust is core to brand identity.`,
  },
  {
    id: "customer-retention-strategies",
    title: "Customer Retention Strategies That Grow Revenue in Kenya",
    excerpt: "Acquiring a new client costs 5-7 times more than retaining an existing one. Discover proven strategies to keep your best clients coming back.",
    category: "Marketing",
    date: "2025-08-19",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    fullContent: `Increasing customer retention by just 5% can increase profits by 25-95%. Eight proven retention strategies:\n\n1. Onboarding excellence — Structured first 30 days with welcome call, clear timeline, and regular progress updates.\n\n2. Proactive communication — Send regular updates without waiting for clients to chase you. WhatsApp for quick updates, email for formal reports.\n\n3. Quarterly business reviews — Formal review every 3 months for key clients discussing results, challenges, and next quarter plans.\n\n4. Loyalty recognition — Acknowledge client anniversaries, offer preferential rates for long-term clients, and send personalized appreciation.\n\n5. Value-added services — Regularly share relevant articles, regulatory updates, and useful introductions. Be a trusted advisor, not just a service provider.\n\n6. Fast complaint resolution — Acknowledge within 2 hours, resolution plan within 24 hours, follow up after resolution.\n\n7. Referral programme — Ask for referrals after successful projects, offer a meaningful thank-you, and make sharing easy.\n\n8. Client satisfaction surveys — Send 3-question surveys every 6 months. Act visibly on feedback — clients who see their input lead to change become more loyal.`,
  },
  {
    id: "business-registration-kenya",
    title: "Business Registration and Compliance Requirements in Kenya 2025",
    excerpt: "A step-by-step guide to registering your business in Kenya — from choosing the right structure to getting your licenses, KRA PIN, and county permits.",
    category: "Strategy",
    date: "2025-08-26",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
    fullContent: `Starting a business in Kenya requires navigating several registration and compliance steps. Seven key steps:\n\n1. Choose your business structure — Sole Proprietorship (KES 950), Partnership (requires a deed), or Limited Company (KES 10,650) via eCitizen.\n\n2. Register your business name — Via ecitizen.go.ke Business Registration Service. Name reservation costs KES 150.\n\n3. Get your KRA PIN — Via itax.kra.go.ke. Required for banking, taxes, tenders, and imports.\n\n4. Register for taxes — TOT (below KES 1M), Income Tax (KES 1-5M), VAT (above KES 5M), and PAYE/NSSF/NHIF for employees.\n\n5. County Business Permit — Required from your county government. Costs KES 5,000-50,000 per year. Renew by January 31st annually.\n\n6. Sector-specific licenses — Food businesses (KEBS), financial services (CBK/CMA), healthcare (Ministry of Health), education (TSC).\n\n7. Open a business bank account — Requires Certificate of Incorporation, KRA PIN, director IDs, and board resolution.\n\nMasira & CO Consulting Ltd assists businesses with registration, compliance, and legal structuring across Kenya.`,
    additionalInfo: "Reference: Business Registration Service (BRS) Kenya, eCitizen Portal, Companies Act 2015 (Kenya)",
  },
  {
    id: "mpesa-mobile-money-business",
    title: "How to Use M-Pesa and Mobile Money to Grow Your Business in Kenya",
    excerpt: "From M-Pesa Business Till to Lipa Na M-Pesa APIs — practical ways Kenyan businesses can use mobile money to increase sales, manage payments, and access credit.",
    category: "Technology",
    date: "2025-09-02",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&q=80",
    fullContent: `Kenya leads the world in mobile money adoption with over 32 million M-Pesa users. Seven M-Pesa tools every business should use:\n\n1. M-Pesa Business Till — Customers pay directly to your till number. Instant confirmation via SMS. Free to set up at any Safaricom shop.\n\n2. M-Pesa Paybill — Customers pay using your Paybill + account number (e.g. invoice number). Best for schools, landlords, and professional services.\n\n3. Lipa Na M-Pesa API (Daraja) — Integrate M-Pesa into your website or app. Supports STK Push, C2B, and B2C payments. Access via developer.safaricom.co.ke.\n\n4. B2C Disbursements — Pay salaries, suppliers, and commissions in bulk directly to M-Pesa numbers. Up to 1,000 transactions per batch.\n\n5. M-Pesa Business Loans — M-Shwari Business and KCB M-Pesa offer up to KES 1 million based on transaction history.\n\n6. Mobile money record-keeping — Request monthly M-Pesa statements for reconciliation. QuickBooks, Xero, and Sage support M-Pesa imports via APIs.\n\n7. Other platforms — Airtel Money (Western Kenya), PesaLink for bank-to-bank transfers up to KES 999,999.\n\nDisplay your Till or Paybill prominently everywhere — website, business cards, email signature, and premises.`,
    additionalInfo: "Reference: Safaricom M-Pesa Daraja API Documentation, CBK National Payments Report 2024",
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
        description="Expert articles on management consulting, HR, marketing, finance, and technology from Masira & CO Consulting Ltd — helping businesses grow in Nairobi, Kenya and East Africa."
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
                placeholder="Search articles..."
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
                  {submitting ? "Subscribing..." : "Subscribe"}
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
