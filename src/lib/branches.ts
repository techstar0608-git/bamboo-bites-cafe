/** Replace with direct Uber Eats store URLs when available. */
export const UBER_EATS_CANLEY =
  "https://www.ubereats.com/au/search?q=Bambu%20Cafe%20Canley%20Heights";
export const UBER_EATS_CABRAMATTA =
  "https://www.ubereats.com/au/search?q=Bambu%20Cafe%20Cabramatta";

export const UBER_EATS_DEFAULT = UBER_EATS_CANLEY;

export type Branch = {
  key: "canley" | "cabramatta";
  title: string;
  addressLine: string;
  mapUrl: string;
  mapEmbedSrc: string;
  hoursShort: string;
  uberEatsRating: string;
  uberEatsReviewNote: string;
  uberEatsUrl: string;
  phone: string;
};

export const branches: Branch[] = [
  {
    key: "canley",
    title: "Canley Heights",
    addressLine: "226 Canley Vale Road, Canley Heights NSW 2166",
    mapUrl: "https://maps.app.goo.gl/PQ56cYsXm821douu7",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=226+Canley+Vale+Road,+Canley+Heights+NSW+2166&z=15&output=embed",
    hoursShort: "Mon–Thu · 7:00 AM – 10:00 PM · Fri–Sun · 7:00 AM – 11:00 PM",
    uberEatsRating: "4.5 ★",
    uberEatsReviewNote: "Uber Eats — 45 reviews",
    uberEatsUrl: UBER_EATS_CANLEY,
    phone: "(+61) 282 013 894",
  },
  {
    key: "cabramatta",
    title: "Cabramatta",
    addressLine: "Shop 16/47 Park Road, Cabramatta NSW 2166",
    mapUrl: "https://maps.app.goo.gl/B1YhGF6TpeR2pNc19",
    mapEmbedSrc:
      "https://maps.google.com/maps?q=Shop+16/47+Park+Road,+Cabramatta+NSW+2166&z=15&output=embed",
    hoursShort: "Mon–Thu · 7:00 AM – 10:00 PM · Fri–Sun · 7:00 AM – 11:00 PM",
    uberEatsRating: "4.9 ★",
    uberEatsReviewNote: "Uber Eats — 13 reviews",
    uberEatsUrl: UBER_EATS_CABRAMATTA,
    phone: "(+61) 493 369 653",
  },
];
