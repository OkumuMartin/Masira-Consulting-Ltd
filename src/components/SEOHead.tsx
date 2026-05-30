import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE = {
  name: "Masira & CO Consulting Ltd",
  url: "https://masira-consulting-ltd.vercel.app",
  description:
    "Masira & Co Consulting Ltd — professional management consulting, HR solutions, accounting, ICT, and marketing services for SMEs, startups, and corporates in Nairobi, Kenya and East Africa.",
};
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: "+254141482542",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fedha",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: ["KE", "TZ", "UG", "RW"],
  serviceType: [
    "Management Consulting",
    "Human Resource Solutions",
    "Sales and Marketing",
    "Accounting and Bookkeeping",
    "ICT Consultancy",
  ],
  keywords: "management consulting Kenya, HR solutions Nairobi, accounting services Kenya, ICT consultancy Nairobi, business consulting East Africa, SME consulting Kenya, marketing services Nairobi",
};

const SEOHead = ({ title, description, path = "/", type = "website", jsonLd }: SEOHeadProps) => {
  const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — Professional Business Consulting in Kenya`;
  const pageDesc = description || SITE.description;
  const url = `${SITE.url}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd || orgSchema)}</script>
    </Helmet>
  );
};

export default SEOHead;
