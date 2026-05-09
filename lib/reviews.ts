export type DisplayReview = {
  name: string;
  source: "verified" | "tiktok";
  meta: string;
  photo: string;
  alt: string;
  stars: number;
  quote: string;
};

export const FALLBACK_AVG = 4.7;
export const FALLBACK_COUNT = "1,000+";

export const FALLBACK_REVIEWS: DisplayReview[] = [
  {
    name: "peterdavies802",
    source: "tiktok",
    meta: "@peterdavies802",
    photo: "/images/reviews/review-peterdavies802.jpg",
    alt: "Peter in offshore high-vis gear on a wind-farm platform",
    stars: 5,
    quote: "Made my job site, perfect for around the house. Measurements way easier.",
  },
  {
    name: "Cotton B.",
    source: "verified",
    meta: "MAR 2026",
    photo: "/images/reviews/review-cottonb.png",
    alt: "Customer holding the SuperBox 3-in-1 tape measure",
    stars: 5,
    quote: "The laser measurement is so convenient, and I love that it saves previous readings.",
  },
  {
    name: "Howard K. James",
    source: "verified",
    meta: "FEB 2026",
    photo: "/images/reviews/review-howardkjames.jpg",
    alt: "SuperBox tape measure on a patterned rug",
    stars: 5,
    quote: "Didn't expect it to be this accurate and convenient. Totally worth it.",
  },
  {
    name: "david_10486",
    source: "tiktok",
    meta: "@david_10486",
    photo: "/images/reviews/review-david10486.jpg",
    alt: "David at home wearing red-tinted sunglasses",
    stars: 5,
    quote: "Measurements way easier. No more tape slipping — this is a lifesaver.",
  },
  {
    name: "Lorraine Clay",
    source: "verified",
    meta: "FEB 2026",
    photo: "/images/reviews/review-lorraineclay.jpg",
    alt: "Close-up of the SuperBox display module",
    stars: 5,
    quote: "Super reliable and saves me so much time. Love that the distance measurer and cross-line laser are all in one.",
  },
  {
    name: "mark.a.kor12",
    source: "tiktok",
    meta: "@mark.a.kor12",
    photo: "/images/reviews/review-markakor12.jpg",
    alt: "Mark wearing a cap and sunglasses",
    stars: 5,
    quote: "Laser is spot on. No second-guessing. Super accurate and easy to use.",
  },
];
