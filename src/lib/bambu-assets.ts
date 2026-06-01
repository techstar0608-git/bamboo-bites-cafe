/**
 * Curated page assets from `src/assets/Bambu/`.
 * Product menu photos are resolved via `@/lib/product-images`.
 */

// — homepage —
import homeHeroVideo1 from "@/assets/Bambu/homepage/create_clip_202605312219.mp4";
import homeHeroVideo2 from "@/assets/Bambu/homepage/tạo_clip_cho_ảnh_202605312238.mp4";
import homeHeroVideo3 from "@/assets/Bambu/homepage/Tạo_clip_đổ_nước_cốt_202605312237.mp4";
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

// — About —
import aboutHero from "@/assets/Bambu/About Us/DSC05098.jpg";
import aboutValue1 from "@/assets/Bambu/About Us/DSC05124.jpg";
import aboutValue2 from "@/assets/Bambu/About Us/DSC05176.jpg";
import aboutValue3 from "@/assets/Bambu/About Us/DSC05108.jpg";
import aboutReview1 from "@/assets/Bambu/About Us/review.png";
import aboutReview2 from "@/assets/Bambu/About Us/review 2.png";

// — Signature coffee —
import signatureSalted from "@/assets/Bambu/Signature/coffee/best 1.jpg";
import signatureCoconut from "@/assets/Bambu/Signature/coffee/Ultra_realistic_Vietnamese_café_beverage_202605312023.jpeg";
import signatureHero from "@/assets/Bambu/Signature/coffee/ChatGPT Image 23_23_10 31 thg 5, 2026.png";

// — Category thumbnails (product folders) —
import thumbCoffee from "@/assets/Bambu/Ảnh sản phẩm/6.Iced Coffee/Bản sao của 46.png";
import thumbFood from "@/assets/Bambu/Ảnh sản phẩm/12. FOOD/Bản sao của 1.png";
import thumbDessert from "@/assets/Bambu/Ảnh sản phẩm/1.Sweet Dessert/Bản sao của 1.png";

export const bambuHomeHeroSlides = [
  { id: "clip-1", type: "video" as const, src: homeHeroVideo1, poster: homeHeroStill, alt: "Bambu cafe drinks" },
  { id: "clip-2", type: "video" as const, src: homeHeroVideo2, poster: homeHeroStill, alt: "Fresh Bambu beverages" },
  { id: "clip-3", type: "video" as const, src: homeHeroVideo3, poster: homeHeroStill, alt: "Pouring Bambu coffee" },
] as const;

export const bambuBranchPhotos = {
  cabramatta: homeBranchCabramatta,
  canley: homeBranchCanley,
} as const;

export const bambuMenuHero = {
  video: menuHeroVideo,
  poster: menuIcedCoffee,
} as const;

export const bambuMenuGridImages = [
  menuSweetDesserts,
  menuFruitBowls,
  menuPennywort,
  menuFreshJuice,
  menuMatcha,
  menuFruitDrinksTea,
  menuIceBlended,
  menuIcedCoffee,
  menuHotCoffee,
  menuNewDrinks,
  menuFoods,
  menuSmoothies,
] as const;

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
