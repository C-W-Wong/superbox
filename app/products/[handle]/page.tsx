import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProductHandles, getProduct } from "@/lib/shopify";
import { ProductPDP } from "./_components/product-pdp";

export const revalidate = 3600;

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product not found — SuperBox" };
  return {
    title: `${product.title} — SuperBox`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images[0] ? [product.images[0].url] : undefined,
    },
  };
}

export default async function PDPPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();
  return <ProductPDP product={product} />;
}
