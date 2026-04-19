import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import {
  AboutSection,
  QualificationsSection,
  MembershipSection,
  ExperienceSection,
  ServicesSection,
  GallerySection,
} from "@/components/Sections";
import { ChambersSection } from "@/components/ChambersSection";
import { ContactSection, Footer } from "@/components/ContactSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useSiteData } from "@/hooks/use-site-data";
import GoogleMap from "@/components/GoogleMap"; // Import the new component

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Barkot Ali - Child Specialist Khulna | Pediatrician" },
      {
        name: "description",
        content:
          "Professor Dr. Md. Barkot Ali – Leading Newborn, Child & Adolescent Health Specialist in Khulna. MBBS, DCH, FCPS, FRCPCH. Book appointment now.",
      },
      {
        name: "keywords",
        content: "Child Specialist Khulna, Pediatrician Khulna, Dr Barkot Ali, Newborn Care Khulna, Baby Doctor Khulna",
      },
      { property: "og:title", content: "Dr. Barkot Ali - Child Specialist Khulna" },
      {
        property: "og:description",
        content: "Leading Newborn, Child & Adolescent Health Specialist in Khulna. Book your appointment today.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data } = useSiteData();

  // Wait for the data to be loaded
  if (!data) {
    return <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: data.doctor.name,
    description: data.doctor.intro,
    medicalSpecialty: "Pediatrics",
    image: data.doctor.imageUrl,
    telephone: "+8801784052339",
    address: data.chambers.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: "Khulna",
      addressCountry: "BD",
    })),
  };

  const floatingWa = data.contact.whatsappNumbers?.[0];
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430138!2d90.3903140759656!3d23.7508581887627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55555555%3A0x1d4a8d9a9f4c3b2!2sPanpacific%20Sonargaon%20Dhaka!5e0!3m2!1sen!2sbd!4v1713545000000!5m2!1sen!2sbd";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <HeroSection data={data} />
        <AboutSection data={data} />
        <QualificationsSection data={data} />
        <MembershipSection data={data} />
        <ExperienceSection data={data} />
        <ServicesSection data={data} />
        <GallerySection data={data} />
        <ChambersSection data={data} />

        {/* New Google Map Section Added Here */}
        <section id="location" className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Location</h2>
            <GoogleMap embedUrl={mapUrl} />
          </div>
        </section>

        <ContactSection data={data} />
      </main>
      <Footer data={data} />
      <FloatingWhatsApp phone={floatingWa} />
    </>
  );
}
