import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Method } from "./components/Method";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { ServiceArea } from "./components/ServiceArea";
import { Faq } from "./components/Faq";
import { FirstVisit } from "./components/FirstVisit";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { MobileStickyCta } from "./components/MobileStickyCta";
import { JsonLd } from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Gallery />
        <Method />
        <About />
        <Reviews />
        <ServiceArea />
        <Faq />
        <FirstVisit />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyCta />
    </>
  );
}
