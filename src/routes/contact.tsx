import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { branches } from "@/lib/branches";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit Us — Bambu Cafe & Desserts Locations" },
      {
        name: "description",
        content:
          "Bambu in Canley Heights and Cabramatta — hours, phone, maps and Uber Eats links.",
      },
      { property: "og:title", content: "Visit Us — Bambu Cafe & Desserts" },
      { property: "og:description", content: "Two locations in Sydney's southwest." },
    ],
  }),
  component: ContactPage,
});

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
            Mon–Thu 7:00 AM – 10:00 PM · Fri–Sun 7:00 AM – 11:00 PM
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {branches.map((b) => (
            <article
              key={b.key}
              className="border border-border bg-card/40 p-10 hover:border-primary/60 transition-colors"
            >
              <h2 className="font-display text-3xl md:text-4xl italic text-primary">
                {b.title}
              </h2>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    {b.addressLine}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Clock className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <span className="text-muted-foreground">{b.hoursShort}</span>
                </li>
                <li className="flex gap-4">
                  <Phone className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <a
                    href={`tel:${b.phone.replace(/[^+\d]/g, "")}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {b.phone}
                  </a>
                </li>
              </ul>

              <p className="mt-6 text-sm text-muted-foreground">
                {b.uberEatsRating} on Uber Eats · {b.uberEatsReviewNote}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={b.uberEatsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B5E20] text-white text-xs tracking-[0.25em] uppercase font-medium hover:opacity-90 transition"
                >
                  Order on Uber Eats <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={b.mapUrl}
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
            Got a question? <em className="text-primary">We&apos;re listening.</em>
          </h2>
          <p className="mt-5 text-muted-foreground">
            For catering, large groups or general enquiries, call either location — we&apos;d love to
            hear from you.
          </p>
        </div>
      </section>
    </>
  );
}
