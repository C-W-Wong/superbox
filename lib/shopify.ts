import "server-only";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2025-10";

if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
  throw new Error(
    "Missing Shopify env vars: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN must be set in .env.local"
  );
}

const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

type FetchInput = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  next,
}: FetchInput): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next,
  });
  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

// ─── Types ─────────────────────────────────────────────────────────────────
export type ShopifyMoney = { amount: string; currencyCode: string };
export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};
export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
};
export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: { name: string; values: string[] }[];
};
export type ShopifyPolicy = { handle: string; title: string; body: string };

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: ShopifyMoney };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    image: ShopifyImage | null;
    product: { handle: string; title: string };
  };
};
export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: ShopifyMoney; subtotalAmount: ShopifyMoney };
  lines: { edges: { node: ShopifyCartLine }[] };
};

// ─── Fragments ─────────────────────────────────────────────────────────────
const PRODUCT_FRAGMENT = /* GraphQL */ `
  id
  handle
  title
  description
  descriptionHtml
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 20) {
    edges {
      node { url altText width height }
    }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText width height }
      }
    }
  }
  options { name values }
`;

const CART_FRAGMENT = /* GraphQL */ `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions { name value }
            image { url altText width height }
            product { handle title }
          }
        }
      }
    }
  }
`;

// ─── Mappers ───────────────────────────────────────────────────────────────
type RawEdgeList<T> = { edges: { node: T }[] };
function flattenEdges<T>(list: RawEdgeList<T>): T[] {
  return list.edges.map((e) => e.node);
}

type RawProduct = Omit<ShopifyProduct, "images" | "variants"> & {
  images: RawEdgeList<ShopifyImage> | ShopifyImage[];
  variants: RawEdgeList<ShopifyVariant> | ShopifyVariant[];
};

function mapProduct(raw: RawProduct): ShopifyProduct {
  return {
    ...raw,
    images: Array.isArray(raw.images) ? raw.images : flattenEdges(raw.images),
    variants: Array.isArray(raw.variants)
      ? raw.variants
      : flattenEdges(raw.variants),
  };
}

// ─── Queries ───────────────────────────────────────────────────────────────
export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: `query Product($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FRAGMENT} }
    }`,
    variables: { handle },
    next: { revalidate: 3600 },
  });
  return data.product ? mapProduct(data.product) : null;
}

export async function getAllProductHandles(): Promise<string[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: { handle: string } }[] };
  }>({
    query: `{ products(first: 100) { edges { node { handle } } } }`,
    next: { revalidate: 3600 },
  });
  return data.products.edges.map((e) => e.node.handle);
}

export async function getShopPolicies() {
  const data = await shopifyFetch<{
    shop: {
      shippingPolicy: ShopifyPolicy | null;
      privacyPolicy: ShopifyPolicy | null;
      refundPolicy: ShopifyPolicy | null;
      termsOfService: ShopifyPolicy | null;
    };
  }>({
    query: `{ shop {
      shippingPolicy { handle title body }
      privacyPolicy { handle title body }
      refundPolicy { handle title body }
      termsOfService { handle title body }
    } }`,
    next: { revalidate: 86400 },
  });
  return data.shop;
}

// ─── Cart ──────────────────────────────────────────────────────────────────
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `query Cart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }`,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart;
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `mutation CartCreate {
      cartCreate { cart { ${CART_FRAGMENT} } }
    }`,
    cache: "no-store",
  });
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lines: [{ merchandiseId, quantity }] },
    cache: "no-store",
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    {
      query: `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
      }`,
      variables: { cartId, lines: [{ id: lineId, quantity }] },
      cache: "no-store",
    }
  );
  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    {
      query: `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FRAGMENT} } }
      }`,
      variables: { cartId, lineIds: [lineId] },
      cache: "no-store",
    }
  );
  return data.cartLinesRemove.cart;
}
