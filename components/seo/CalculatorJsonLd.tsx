import { siteConfig } from "@/lib/site";

type CalculatorJsonLdProps = {
  name: string;
  description: string;
  path: string;
};

export function CalculatorJsonLd({
  name,
  description,
  path,
}: CalculatorJsonLdProps) {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(calculatorSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
