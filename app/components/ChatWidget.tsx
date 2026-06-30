"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "../lib/site";
import { trackEvent } from "../lib/analytics";
import { WhatsAppIcon, PhoneIcon, CloseIcon } from "./icons";

const WA_PREFILL = `Bonjour ${site.name}, je souhaite un devis gratuit pour des travaux de peinture.`;
const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(WA_PREFILL)}`;

type Action =
  | { kind: "tel" }
  | { kind: "whatsapp" }
  | { kind: "devis" }
  | { kind: "scroll"; label: string; target: string };

type Msg = { from: "bot" | "user"; text: string; actions?: Action[] };

type Intent = { id: string; chip: string; reply: () => Omit<Msg, "from"> };

const intents: Intent[] = [
  {
    id: "tarifs",
    chip: "💶 Tarifs",
    reply: () => ({
      text:
        "Voici nos tarifs de base :\n• Mise en peinture : dès 20 €/m²\n• Ratissage & ponçage : dès 20 €/m²\n• Pose de bandes à placo : dès 10 €/m²\n• Déco, boiseries & extérieur : sur devis\n\nLe plus juste reste un devis gratuit adapté à votre chantier.",
      actions: [{ kind: "devis" }, { kind: "tel" }],
    }),
  },
  {
    id: "zone",
    chip: "📍 Zone",
    reply: () => ({
      text: `Nous intervenons à ${site.city} et dans un rayon d'environ ${site.radiusKm} km : Saint-Doulchard, Saint-Germain-du-Puy, Mehun-sur-Yèvre, Saint-Florent-sur-Cher, Trouy… Dites-moi votre commune, je vous confirme !`,
      actions: [
        { kind: "scroll", label: "Voir la zone", target: "zone" },
        { kind: "devis" },
      ],
    }),
  },
  {
    id: "prestations",
    chip: "🎨 Prestations",
    reply: () => ({
      text:
        "AES SERVICES réalise : mise en peinture, ratissage & ponçage, pose de bandes/placo, décoration & mise en couleur, boiseries & menuiseries, et peinture extérieure.",
      actions: [
        { kind: "scroll", label: "Voir les prestations", target: "prestations" },
        { kind: "devis" },
      ],
    }),
  },
  {
    id: "realisations",
    chip: "🖼️ Réalisations",
    reply: () => ({
      text: `Découvrez nos chantiers (avant/après inclus) et nos avis clients (${site.google.rating} ★ sur Google).`,
      actions: [
        { kind: "scroll", label: "Voir les réalisations", target: "realisations" },
        { kind: "scroll", label: "Voir les avis", target: "avis" },
      ],
    }),
  },
  {
    id: "devis",
    chip: "📅 Devis",
    reply: () => ({
      text:
        "Avec plaisir ! Le devis est gratuit et sans engagement. Comment préférez-vous ?",
      actions: [{ kind: "tel" }, { kind: "whatsapp" }, { kind: "devis" }],
    }),
  },
];

const delaiReply = (): Omit<Msg, "from"> => ({
  text:
    "La durée dépend de la surface et de l'état des supports ; elle est précisée sur votre devis. Nous tenons les délais annoncés et laissons le chantier propre.",
  actions: [{ kind: "devis" }],
});

const fallbackReply = (): Omit<Msg, "from"> => ({
  text:
    "Bonne question ! Le plus simple est d'en parler directement avec Sébastien :",
  actions: [{ kind: "tel" }, { kind: "whatsapp" }, { kind: "devis" }],
});

// Very light keyword routing for free-text input.
function route(input: string): Omit<Msg, "from"> {
  const t = input.toLowerCase();
  const has = (...w: string[]) => w.some((x) => t.includes(x));
  if (has("tarif", "prix", "coût", "cout", "combien", "€", "euro"))
    return intents[0].reply();
  if (has("zone", "secteur", "déplac", "deplac", "ville", "commune", "km", "loin"))
    return intents[1].reply();
  if (has("délai", "delai", "temps", "durée", "duree", "quand", "dispo", "rapide"))
    return delaiReply();
  if (has("devis", "rdv", "rendez", "contact", "appel", "télé", "tel", "rappel"))
    return intents[4].reply();
  if (
    has("presta", "service", "peinture", "placo", "bande", "façade", "facade", "enduit", "ratiss")
  )
    return intents[2].reply();
  if (has("avis", "réalis", "realis", "photo", "chantier", "exemple"))
    return intents[3].reply();
  if (has("bonjour", "salut", "coucou", "hello", "bonsoir"))
    return {
      text: "Bonjour 👋 Comment puis-je vous aider ? Choisissez un sujet ou posez votre question.",
    };
  return fallbackReply();
}

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: `Bonjour 👋 Je suis l'assistant d'${site.name}. Posez votre question ou choisissez un sujet.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const pushBot = (m: Omit<Msg, "from">) =>
    setMessages((prev) => [...prev, { from: "bot", ...m }]);

  // Short "is typing" pause so replies feel human without being slow.
  const TYPING_DELAY = 650;
  const botReply = (getReply: () => Omit<Msg, "from">) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushBot(getReply());
    }, TYPING_DELAY);
  };

  const handleIntent = (it: Intent) => {
    trackEvent("chat_intent", { source: "chat", intent: it.id });
    setMessages((prev) => [...prev, { from: "user", text: it.chip }]);
    botReply(() => it.reply());
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    trackEvent("chat_message", { source: "chat" });
    botReply(() => route(text));
  };

  const goScroll = (target: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const renderAction = (a: Action, i: number) => {
    const cls =
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors";
    if (a.kind === "tel")
      return (
        <a
          key={i}
          href={`tel:${site.phone}`}
          onClick={() => trackEvent("cta_call", { source: "chat" })}
          className={`${cls} bg-cta text-ink hover:bg-[color-mix(in_srgb,var(--color-cta)_88%,black)]`}
        >
          <PhoneIcon className="text-sm" /> Appeler
        </a>
      );
    if (a.kind === "whatsapp")
      return (
        <a
          key={i}
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "chat" })}
          className={`${cls} text-white`}
          style={{ backgroundColor: "#25d366" }}
        >
          <WhatsAppIcon className="text-sm" /> WhatsApp
        </a>
      );
    if (a.kind === "devis")
      return (
        <button
          key={i}
          type="button"
          onClick={() => {
            trackEvent("cta_quote", { source: "chat" });
            goScroll("contact");
          }}
          className={`${cls} bg-ink text-bg hover:bg-[color-mix(in_srgb,var(--color-ink)_88%,black)]`}
        >
          Demander un devis
        </button>
      );
    return (
      <button
        key={i}
        type="button"
        onClick={() => goScroll(a.target)}
        className={`${cls} bg-bg-soft text-ink ring-1 ring-line hover:bg-bg`}
      >
        {a.label}
      </button>
    );
  };

  return (
    <>
      {/* Launcher (sits above the WhatsApp button) */}
      <button
        type="button"
        aria-label="Ouvrir l'assistant AES SERVICES"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) trackEvent("chat_open", { source: "chat" });
        }}
        className="fixed left-4 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bg shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:left-6 md:bottom-6"
      >
        {open ? (
          <CloseIcon className="text-2xl" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="3" r="1" />
            <path d="M12 4v2.5" />
            <rect x="4" y="6.5" width="16" height="12" rx="3.5" />
            <path d="M2 12v3M22 12v3" />
            <circle cx="9.3" cy="12.2" r="1.25" fill="currentColor" stroke="none" />
            <circle cx="14.7" cy="12.2" r="1.25" fill="currentColor" stroke="none" />
            <path d="M9.5 15.6h5" />
          </svg>
        )}
        <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-sage ring-2 ring-bg" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 bottom-3 z-50 flex max-h-[78vh] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-[22rem]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-ink px-4 py-3 text-bg">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage text-sm font-bold text-ink">
                  A
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">Assistant AES</span>
                  <span className="flex items-center gap-1 text-[11px] text-bg/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" /> en ligne
                  </span>
                </span>
              </div>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-bg/80 hover:bg-white/10"
              >
                <CloseIcon className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-bg-soft px-3 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className="max-w-[85%]">
                    <div
                      className={`whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                        m.from === "user"
                          ? "rounded-br-sm bg-ink text-bg"
                          : "rounded-bl-sm bg-white text-ink ring-1 ring-line"
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map(renderAction)}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start" aria-label="L'assistant écrit…">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3 py-3 ring-1 ring-line">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-1.5 border-t border-line bg-bg px-3 pt-2">
              {intents.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => handleIntent(it)}
                  className="rounded-full bg-bg-soft px-2.5 py-1 text-xs font-medium text-ink ring-1 ring-line hover:bg-sage-soft"
                >
                  {it.chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-line bg-bg p-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre question…"
                className="min-w-0 flex-1 rounded-full border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                aria-label="Envoyer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,black)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
