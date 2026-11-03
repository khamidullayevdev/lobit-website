import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { ProofGrid } from "@/components/ProofGrid";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Faq } from "@/components/Faq";
import { RepStats } from "@/components/RepStats";
import { ScrollBackground } from "@/components/ScrollBackground";
import { faqs } from "@/lib/faqs";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lobbit",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollBackground />
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <Mission />
        <Features />
        <HowItWorks />
        <ProofGrid />
        <RepStats />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
