"use client";

import { ArrowRight } from "lucide-react";
import { useActionState } from "react";
import {
  subscribeAction,
  type SubscribeState,
} from "@/lib/newsletter-actions";

const INITIAL: SubscribeState = { status: "idle" };

type Variant = "footer" | "cta";

export function NewsletterForm({ variant = "footer" }: { variant?: Variant }) {
  const [state, formAction, pending] = useActionState(subscribeAction, INITIAL);

  if (variant === "cta") return <CTAForm state={state} action={formAction} pending={pending} />;
  return <FooterForm state={state} action={formAction} pending={pending} />;
}

type FormProps = {
  state: SubscribeState;
  action: (formData: FormData) => void;
  pending: boolean;
};

function FooterForm({ state, action, pending }: FormProps) {
  return (
    <form action={action} className="w-full" noValidate>
      <h3 className="border-b-2 border-primary pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
        Newsletter
      </h3>
      <p className="mt-4 text-sm text-foreground/80">
        Tool drops, restocks, and the occasional measuring trick. No spam.
      </p>

      <div className="mt-4 flex">
        <label className="sr-only" htmlFor="newsletter-email-footer">
          Email address
        </label>
        <input
          id="newsletter-email-footer"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          disabled={pending || state.status === "success"}
          className="h-11 w-full min-w-0 border border-border bg-background px-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none disabled:opacity-60"
        />
        <HoneyField />
        <button
          type="submit"
          disabled={pending || state.status === "success"}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 bg-primary px-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-60"
          aria-label="Subscribe to newsletter"
        >
          {pending ? "..." : state.status === "success" ? "Done" : "Join"}
          {!pending && state.status !== "success" && (
            <ArrowRight className="size-3.5" strokeWidth={2.5} />
          )}
        </button>
      </div>

      <Status state={state} className="mt-3" />
    </form>
  );
}

function CTAForm({ state, action, pending }: FormProps) {
  return (
    <form action={action} className="w-full max-w-xl" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email-cta">
          Email address
        </label>
        <input
          id="newsletter-email-cta"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          disabled={pending || state.status === "success"}
          className="h-14 w-full min-w-0 border border-foreground bg-background px-4 font-mono text-sm uppercase tracking-[0.12em] text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none disabled:opacity-60"
        />
        <HoneyField />
        <button
          type="submit"
          disabled={pending || state.status === "success"}
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 bg-primary px-7 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Sending..." : state.status === "success" ? "You’re in" : "Subscribe"}
          {!pending && state.status !== "success" && (
            <ArrowRight className="size-4" strokeWidth={2.5} />
          )}
        </button>
      </div>

      <Status state={state} className="mt-4" />
    </form>
  );
}

function HoneyField() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute -left-[9999px] h-0 w-0"
    />
  );
}

function Status({
  state,
  className = "",
}: {
  state: SubscribeState;
  className?: string;
}) {
  if (state.status === "idle") return null;
  if (state.status === "success") {
    return (
      <p
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary ${className}`}
        role="status"
      >
        ✓ You&rsquo;re on the list.
      </p>
    );
  }
  return (
    <p
      className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-destructive ${className}`}
      role="alert"
    >
      {state.message}
    </p>
  );
}
