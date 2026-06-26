import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { BeforeAfter } from "./components/BeforeAfter";
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
import { Reveal } from "./components/Reveal";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Reveal><Services /></Reveal>
        <Reveal><Gallery /></Reveal>
        <Reveal><BeforeAfter /></Reveal>
        <Reveal><Method /></Reveal>
        <Reveal><About /></Reveal>
        <Reveal><Reviews /></Reveal>
        <Reveal><ServiceArea /></Reveal>
        <Reveal><Faq /></Reveal>
        <Reveal><FirstVisit /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyCta />
    </>
  );
}
