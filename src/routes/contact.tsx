import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit Us — Bambu Cafe & Desserts Locations" },
      { name: "description", content: "Visit Bambu Cafe & Desserts at our Canley Heights and Cabramatta locations. Open 7 days, 8AM–10PM." },
      { property: "og:title", content: "Visit Bambu Cafe & Desserts" },
      { property: "og:description", content: "Two locations in NSW — open 7 days a week." },
    ],
  }),
  component: ContactPage,
});

const branches = [
  {
    name: "Bambu — Canley Heights",
    address: "226 Canley Vale Rd, Canley Heights NSW 2166",
    map: "https://maps.app.goo.gl/PQ56cYsXm821douu7",
    hours: "Mon–Sun · 08:00 AM – 10:00 PM",
    phone: "(+61) 282 013 894",
  },
  {
    name: "Bambu — Cabramatta",
    address: "16/47 Park Road, Cabramatta NSW 2166",
    map: "https://maps.app.goo.gl/B1YhGF6TpeR2pNc19",
    hours: "Mon–Sun · 08:00 AM – 10:00 PM",
    phone: "(+61) 493 369 653",
  },
];

function ContactPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Visit Us</SectionLabel>
          <h1 className="mt-6 font-display text-6xl md:text-7xl text-balance">
            Find your nearest <em className="text-primary">Bambu</em>
          </h1>
          <p className="mt-6 text-muted-foreground">
            Swing by for desserts, drinks and good times — we're open 7 days.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {branches.map((b) => (
            <article
              key={b.name}
              className="border border-border bg-card/40 p-10 hover:border-primary/60 transition-colors"
            >
              <h2 className="font-display text-3xl md:text-4xl italic text-primary">
                {b.name}
              </h2>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <a href={b.map} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">
                    {b.address}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Clock className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <span className="text-muted-foreground">{b.hours}</span>
                </li>
                <li className="flex gap-4">
                  <Phone className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <a href={`tel:${b.phone.replace(/[^+\d]/g, "")}`} className="text-muted-foreground hover:text-primary">
                    {b.phone}
                  </a>
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://www.ubereats.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-gold-foreground text-xs tracking-[0.25em] uppercase font-medium shadow-gold hover:opacity-90 transition"
                >
                  Order Pickup <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={b.map}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-xs tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition"
                >
                  Get Directions
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-card/40">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Stay in touch</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance">
            Got a question? <em className="text-primary">We're listening.</em>
          </h2>
          <p className="mt-5 text-muted-foreground">
            For catering, large groups or general enquiries, give us a call at either
            location — we'd love to hear from you.
          </p>
        </div>
      </section>
    </>
  );
}
