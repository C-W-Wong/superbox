import "server-only";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = "2025-10";

if (!STORE_DOMAIN || !ADMIN_TOKEN) {
  throw new Error(
    "Missing Shopify Admin env vars: SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN must be set in .env.local"
  );
}

const ENDPOINT = `https://${STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

async function adminFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Shopify Admin HTTP ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify Admin GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

type CustomerCreateResponse = {
  customerCreate: {
    customer: { id: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "server" };

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  const data = await adminFetch<CustomerCreateResponse>({
    query: `mutation NewsletterSignup($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer { id }
        userErrors { field message }
      }
    }`,
    variables: {
      input: {
        email,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "SINGLE_OPT_IN",
        },
      },
    },
  });

  const errors = data.customerCreate.userErrors;
  if (errors.length === 0) return { ok: true };

  const dupe = errors.some((e) => /taken|already/i.test(e.message));
  if (dupe) return { ok: true };

  const invalid = errors.some(
    (e) =>
      (e.field?.includes("email") ?? false) ||
      /invalid|email/i.test(e.message)
  );
  return { ok: false, reason: invalid ? "invalid" : "server" };
}
