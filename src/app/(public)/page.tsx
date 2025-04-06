import { AboutSection } from "@/components/landing/about-section"
import { ContactSection } from "@/components/landing/contact-section"
import { HeroSection } from "@/components/landing/hero-section"
import { ServicesSection } from "@/components/landing/service-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
