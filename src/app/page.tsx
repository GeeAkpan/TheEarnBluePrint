"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/earnblueprint/Navbar";
import { HeroSection } from "@/components/earnblueprint/HeroSection";
import { PillarsSection } from "@/components/earnblueprint/PillarsSection";
import { ProductsSection } from "@/components/earnblueprint/ProductsSection";
import { InsightsSection } from "@/components/earnblueprint/InsightsSection";
import { CommunitySection } from "@/components/earnblueprint/CommunitySection";
import { AboutSection } from "@/components/earnblueprint/AboutSection";
import { FaqSection } from "@/components/earnblueprint/FaqSection";
import { ContactSection } from "@/components/earnblueprint/ContactSection";
import { Footer } from "@/components/earnblueprint/Footer";
import { ScrollToTop } from "@/components/earnblueprint/ScrollToTop";

export default function Home() {
  const [activePage, setActivePage] = useState<string>("home");
  const heroScrollRef = useRef<HTMLDivElement | null>(null);
  const isClickNav = useRef<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    isClickNav.current = true;
    setActivePage(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setTimeout(() => {
      isClickNav.current = false;
    }, 1000);
  };

  // Scroll Spy to detect active section dynamically as user scrolls
  useEffect(() => {
    const sections = ["home", "products", "insights", "community", "about", "contact"];

    const handleScroll = () => {
      if (isClickNav.current) return;

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActivePage(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white selection:bg-[#14b8a6] selection:text-white">
      <Navbar activePage={activePage} onNavigate={scrollToSection} />

      <main>
        <div id="home" ref={heroScrollRef}>
          <HeroSection
            containerRef={heroScrollRef}
            onExploreProducts={() => scrollToSection("products")}
            onReadGuides={() => scrollToSection("insights")}
          />
          <PillarsSection />
        </div>

        <div id="products">
          <ProductsSection />
        </div>

        <div id="insights">
          <InsightsSection />
        </div>

        <div id="community">
          <CommunitySection onJoinClick={() => scrollToSection("contact")} />
        </div>

        <div id="about">
          <AboutSection />
        </div>

        <div id="faq">
          <FaqSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />
      <ScrollToTop />
    </div>
  );
}
