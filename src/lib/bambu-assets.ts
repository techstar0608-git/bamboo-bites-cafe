/**
 * Curated page assets from `src/assets/Bambu/`.
 * Product menu photos are resolved via `@/lib/product-images`.
 */

// — homepage —
import homeHeroStorefront from "@/assets/Bambu/homepage/figma-hero-storefront.png";
import homeHeroTropicalDrinks from "@/assets/Bambu/homepage/figma-hero-tropical-drinks.png";
import homeHeroSignatureCoffee from "@/assets/Bambu/homepage/figma-hero-signature-coffee.jpg";
import homeHeroStill from "@/assets/Bambu/homepage/032626.png";
import homeIcedCoffee from "@/assets/Bambu/homepage/032603.png";
import homeBranchCabramatta from "@/assets/Bambu/homepage/032626.png";
import favDessert from "@/assets/Bambu/homepage/fav-desert.png";
import homeBranchCanley from "@/assets/Bambu/homepage/canley .png";

// — Menu hub (sorted by filename time → grid order) —
import menuHeroVideo from "@/assets/Bambu/Menu/tạo_clip_cho_ảnh_202605312300.mp4";
import menuSweetDesserts from "@/assets/Bambu/Menu/ChatGPT Image 18_45_54 31 thg 5, 2026.png";
import menuFruitBowls from "@/assets/Bambu/Menu/ChatGPT Image 18_50_35 31 thg 5, 2026.png";
import menuPennywort from "@/assets/Bambu/Menu/ChatGPT Image 18_53_03 31 thg 5, 2026.png";
import menuFreshJuice from "@/assets/Bambu/Menu/ChatGPT Image 18_58_10 31 thg 5, 2026.png";
import menuMatcha from "@/assets/Bambu/Menu/ChatGPT Image 19_09_07 31 thg 5, 2026.png";
import menuFruitDrinksTea from "@/assets/Bambu/Menu/ChatGPT Image 19_19_24 31 thg 5, 2026.png";
import menuIceBlended from "@/assets/Bambu/Menu/ChatGPT Image 19_23_59 31 thg 5, 2026.png";
import menuIcedCoffee from "@/assets/Bambu/Menu/ChatGPT Image 19_25_30 31 thg 5, 2026.png";
import menuHotCoffee from "@/assets/Bambu/Menu/ChatGPT Image 19_32_23 31 thg 5, 2026.png";
import menuNewDrinks from "@/assets/Bambu/Menu/ChatGPT Image 19_34_21 31 thg 5, 2026.png";
import menuFoods from "@/assets/Bambu/Menu/ChatGPT Image 20_10_53 31 thg 5, 2026.png";
import menuSmoothies from "@/assets/Bambu/Menu/ChatGPT Image 19_42_14 31 thg 5, 2026.png";

// — Menu hub category thumbnails downloaded from Figma (mapped by category name) —
import catSweetDesserts from "@/assets/Bambu/Menu/figma-categories/cat-sweet-desserts.png";
import catFruitBowls from "@/assets/Bambu/Menu/figma-categories/cat-fruit-bowls.png";
import catPennywort from "@/assets/Bambu/Menu/figma-categories/cat-pennywort.png";
import catFreshJuice from "@/assets/Bambu/Menu/figma-categories/cat-fresh-juice.png";
import catMatcha from "@/assets/Bambu/Menu/figma-categories/cat-matcha.png";
import catFruitDrinksTea from "@/assets/Bambu/Menu/figma-categories/cat-fruit-drinks-tea.png";
import catIceBlended from "@/assets/Bambu/Menu/figma-categories/cat-ice-blended.png";
import catIcedCoffee from "@/assets/Bambu/Menu/figma-categories/cat-iced-coffee.png";
import catHotCoffee from "@/assets/Bambu/Menu/figma-categories/cat-hot-coffee.png";
import catNewDrinks from "@/assets/Bambu/Menu/figma-categories/cat-new-drinks.png";
import catFoods from "@/assets/Bambu/Menu/figma-categories/cat-foods.png";
import catSmoothies from "@/assets/Bambu/Menu/figma-categories/cat-smoothies.png";

// — About —
import aboutHero from "@/assets/Bambu/About Us/DSC05098.jpg";
import aboutValue1 from "@/assets/Bambu/About Us/DSC05124.jpg";
import aboutValue2 from "@/assets/Bambu/About Us/DSC05176.jpg";
import aboutValue3 from "@/assets/Bambu/About Us/DSC05108.jpg";
import aboutReview1 from "@/assets/Bambu/About Us/review.png";
import aboutReview2 from "@/assets/Bambu/About Us/review 2.png";

// — Signature coffee (Signature Pours images downloaded from Figma) —
import signatureSalted from "@/assets/Bambu/Signature/coffee/figma-salted-coffee.jpg";
import signatureCoconut from "@/assets/Bambu/Signature/coffee/figma-coconut-coffee.png";
import signatureHero from "@/assets/Bambu/Signature/coffee/figma-coffee-hero.jpg";

// — Category thumbnails (product folders) —
import thumbCoffee from "@/assets/Bambu/Ảnh sản phẩm/6.Iced Coffee/Bản sao của 46.png";
import thumbFood from "@/assets/Bambu/Ảnh sản phẩm/12. FOOD/Bản sao của 1.png";
import thumbDessert from "@/assets/Bambu/Ảnh sản phẩm/1.Sweet Dessert/Bản sao của 1.png";

/** Figma homepage hero carousel — 3 images downloaded from the Bambu Figma file */
export const bambuHomeHeroSlides = [
  {
    id: "storefront",
    type: "image" as const,
    src: homeHeroStorefront,
    alt: "Illustration of the Bambu Cafe & Desserts storefront",
  },
  {
    id: "tropical-drinks",
    type: "image" as const,
    src: homeHeroTropicalDrinks,
    alt: "Bambu tropical drinks and street food on a jungle backdrop",
  },
  {
    id: "signature-coffee",
    type: "image" as const,
    src: homeHeroSignatureCoffee,
    alt: "Bambu signature Vietnamese iced coffees",
  },
] as const;

export const bambuBranchPhotos = {
  cabramatta: homeBranchCabramatta,
  canley: homeBranchCanley,
} as const;

export const bambuMenuHero = {
  video: menuHeroVideo,
  poster: menuIcedCoffee,
} as const;

/**
 * Menu hub category thumbnails — keyed by destination route so each label on
 * the Our Menu grid shows its correct Figma representative image.
 * Smoothies has no Figma cell, so it keeps the existing themed photo.
 */
export const bambuMenuCategoryByRoute: Record<string, string> = {
  "/sweet-desserts": catSweetDesserts,
  "/pennywort": catPennywort,
  "/fresh-juice": catFreshJuice,
  "/matcha": catMatcha,
  "/fruit-drinks-tea": catFruitDrinksTea,
  "/ice-blended": catIceBlended,
  "/iced-coffee": catIcedCoffee,
  "/espresso-hot": catHotCoffee,
  "/new-drink": catNewDrinks,
  "/vietnamese-food": catFoods,
  "/smoothies": catSmoothies,
};

/** Figma "Fruit Bowls" cell uses its own image even though it links to desserts. */
export const bambuMenuFruitBowls = catFruitBowls;

/** Per-category hero = the themed photo shown for it on the Our Menu hub */
export const bambuCategoryHero = {
  sweetDesserts: menuSweetDesserts,
  fruitBowls: menuFruitBowls,
  pennywort: menuPennywort,
  freshJuice: menuFreshJuice,
  matcha: menuMatcha,
  fruitDrinksTea: menuFruitDrinksTea,
  iceBlended: menuIceBlended,
  icedCoffee: menuIcedCoffee,
  hotCoffee: menuHotCoffee,
  newDrink: menuNewDrinks,
  foods: menuFoods,
  smoothies: menuSmoothies,
} as const;

export const bambuAbout = {
  hero: aboutHero,
  values: [aboutValue1, aboutValue2, aboutValue3] as const,
  reviews: [aboutReview1, aboutReview2] as const,
} as const;

export const bambuSignature = {
  hero: signatureHero,
  salted: signatureSalted,
  coconut: signatureCoconut,
} as const;

export const bambuCategoryThumbs = {
  coffee: thumbCoffee,
  food: thumbFood,
  dessert: thumbDessert,
} as const;

/** Default inner-page hero when no override is passed */
export const bambuDefaultHero = homeHeroStill;
export const favDessertHero = favDessert;

/** Iced coffee photo used on the home "Our Favourites" card */
export const bambuHomeIcedCoffee = homeIcedCoffee;
