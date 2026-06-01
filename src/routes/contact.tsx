import { createFileRoute } from "@tanstack/react-router";
import { FigmaPageFooter } from "@/components/figma/FigmaPageFooter";
import { FigmaPageHero } from "@/components/figma/FigmaPageHero";
import { FigmaPageIntro } from "@/components/figma/FigmaPageIntro";
import { HomeFindUsSection } from "@/components/home/HomeFindUsSection";
import { bambuAbout } from "@/lib/bambu-assets";

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
    <div className="bg-cream">
      <FigmaPageHero image={bambuAbout.hero} alt="Inside Bambu cafe" overlayTitle="Visit Us" />
      <div className="mx-auto max-w-3xl">
        <FigmaPageIntro title="Find Us" breadcrumb={{ current: "Contact" }} />

        <p className="px-5 pb-8 text-center text-sm text-[#2b2b2b]/75 md:px-6">
          Mon–Thu 7:00 AM – 10:00 PM · Fri–Sun 7:00 AM – 11:00 PM
        </p>

        <HomeFindUsSection />
      </div>
      <FigmaPageFooter />
    </div>
  );
}
