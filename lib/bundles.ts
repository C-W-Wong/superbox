export type BundleId = "single" | "duo" | "trio";

export type Bundle = {
  id: BundleId;
  label: string;
  quantity: number;
  freeShipping: boolean;
  pitch: string;
  badge?: string;
};

export const BUNDLES: Bundle[] = [
  {
    id: "single",
    label: "1 Tool",
    quantity: 1,
    freeShipping: false,
    pitch: "Just for you",
  },
  {
    id: "duo",
    label: "2 Tools",
    quantity: 2,
    freeShipping: true,
    pitch: "Pair with a partner",
    badge: "Most Popular",
  },
  {
    id: "trio",
    label: "3 Tools",
    quantity: 3,
    freeShipping: true,
    pitch: "Gift one. Keep two.",
    badge: "Best Value",
  },
];

export function getBundle(id: BundleId): Bundle {
  return BUNDLES.find((b) => b.id === id) ?? BUNDLES[0];
}
