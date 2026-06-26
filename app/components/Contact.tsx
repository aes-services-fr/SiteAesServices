import { site } from "../lib/site";
import { ContactForm } from "./ContactForm";
import { GoogleRating } from "./GoogleRating";
import { BookingButton } from "./BookingButton";
import { PhoneIcon, WhatsAppIcon, MailIcon, MapPinIcon } from "./icons";

const PREFILLED = `Bonjour ${site.name}, je souhaite un devis gratuit pour des travaux de peinture.`;

// Final CTA + contact section (#contact). Holds the quote form and every way
// to reach the painter.
export function Contact() {
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(PREFILLED)}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-bg-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Contact
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-ink sm:text-4xl">
            Demandez votre devis gratuit
          </h2>
          <p className="mt-3 text-ink-soft">
            Parlez-nous de votre projet : nous revenons vers vous rapidement avec
            un devis clair et sans engagement.
          </p>
          <div className="mt-4">
            <GoogleRating />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Direct contact methods */}
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <PhoneIcon className="text-xl" />
              </span>
              <span>
                <span className="block text-xs text-ink-soft">Par téléphone</span>
                <span className="block font-semibold text-ink">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            {site.whatsappEnabled && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: "#25d366" }}
                >
                  <WhatsAppIcon className="text-xl" />
                </span>
                <span>
                  <span className="block text-xs text-ink-soft">Sur WhatsApp</span>
                  <span className="block font-semibold text-ink">
                    Message direct
                  </span>
                </span>
              </a>
            )}

            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <MailIcon className="text-xl" />
              </span>
              <span>
                <span className="block text-xs text-ink-soft">Par email</span>
                <span className="block font-semibold text-ink">{site.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <MapPinIcon className="text-xl" />
              </span>
              <span>
                <span className="block text-xs text-ink-soft">Secteur</span>
                <span className="block font-semibold text-ink">
                  {site.address.city} et alentours de {site.city}
                </span>
              </span>
            </div>

            <div className="mt-1 sm:hidden">
              <BookingButton
                source="final_cta"
                action="phone"
                withIcon
                className="w-full"
              >
                Être rappelé au {site.phoneDisplay}
              </BookingButton>
            </div>
          </div>

          {/* Quote form */}
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
