import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShopPolicies } from "@/lib/shopify";

export const revalidate = 86400;

const DISPLAY = "var(--font-bebas)";

const POLICY_MAP = {
  "shipping-policy": "shippingPolicy",
  "privacy-policy": "privacyPolicy",
  "refund-policy": "refundPolicy",
  "terms-of-service": "termsOfService",
} as const;

type PolicyHandle = keyof typeof POLICY_MAP;

export function generateStaticParams() {
  return Object.keys(POLICY_MAP).map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const key = POLICY_MAP[handle as PolicyHandle];
  if (!key) return { title: "Policy — SuperBox" };
  const policies = await getShopPolicies();
  const policy = policies[key];
  return {
    title: policy ? `${policy.title} — SuperBox` : "Policy — SuperBox",
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const key = POLICY_MAP[handle as PolicyHandle];
  if (!key) notFound();

  const policies = await getShopPolicies();
  const policy = policies[key];
  if (!policy) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 md:px-8 md:py-20">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
        Policy
      </p>
      <h1
        className="mt-2 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
        style={{ fontFamily: DISPLAY }}
      >
        {policy.title.toUpperCase()}
      </h1>
      <div
        className="mt-10 max-w-none text-foreground/85 [&_a]:text-primary [&_a]:underline [&_div]:my-2 [&_div]:leading-relaxed [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:my-1 [&_p]:my-3 [&_p]:leading-relaxed [&_strong]:text-foreground [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: policy.body }}
      />
    </article>
  );
}
