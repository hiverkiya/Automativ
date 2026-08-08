"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  Crown,
  Home,
  Loader2,
  Rocket,
  Signal,
  Sparkles,
  Workflow,
  Zap,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const variantGroups = [
  {
    title: "Primary Actions",
    description: "Core CTA buttons for launches, onboarding, workflows.",
    cardClass:
      "bg-[linear-gradient(135deg,rgba(37,99,235,0.05),rgba(6,182,212,0.04))]",
    variants: [
      "aurora",
      "default",
      "gradient",
      "shimmer",
      "workflow",
      "aiGlow",
      "premium",
      "premiumSoft",
    ] as const,
  },
  {
    title: "Glass & Surface Buttons",
    description: "For overlays, auth, dashboards, premium surfaces.",
    cardClass:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(240,247,255,0.55))]",
    variants: [
      "glassPrimary",
      "glass",
      "shimmerGlass",
      "frost",
      "floating",
      "loadingGlass",
    ] as const,
  },
  {
    title: "States & Signals",
    description: "Feedback, execution states, system actions.",
    cardClass:
      "bg-[linear-gradient(135deg,rgba(6,182,212,0.04),rgba(16,185,129,0.03))]",
    variants: [
      "signalSoft",
      "workflowSoft",
      "success",
      "destructive",
      "dangerGlass",
      "glow",
      "signal",
      "loading",
    ] as const,
  },
  {
    title: "Utilities",
    description: "Secondary actions and editor controls.",
    cardClass:
      "bg-[linear-gradient(135deg,rgba(37,99,235,0.04),rgba(255,255,255,0.55))]",
    variants: [
      "dashboard",
      "ghostBrand",
      "secondary",
      "outline",
      "subtle",
      "accent",
      "ghost",
      "ghostSoft",
      "toolbar",
    ] as const,
  },
  {
    title: "Brand Actions",
    description: "Actions highlighting specific brand semantic colours.",
    cardClass:
      "bg-[linear-gradient(135deg,rgba(6,182,212,0.04),rgba(217,70,239,0.04))]",
    variants: [
      "upgrade",
      "brandCyan",
      "brandSuccess",
      "brandPremium",
      "brandDanger",
    ] as const,
  },
] as const;

const sizes = ["xs", "sm", "default", "lg", "xl", "hero"] as const;

export default function TestPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-8%] h-[480px] w-[480px] rounded-full bg-blue-500/10" />
        <div className="absolute right-[-8%] top-[6%] h-[420px] w-[420px] rounded-full bg-cyan-400/10" />
        <div className="absolute bottom-[-10%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-400/8" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* HERO */}
        <section className="mb-20 rounded-[2rem] border border-white/50 bg-card/95 p-10 shadow-2xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/95 px-4 py-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Automativ Design System
                </span>
              </div>

              <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
                Premium Button System
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                AI-native dual-tone interface buttons built for automation,
                workflows, orchestration, dashboards, and premium SaaS UX.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            <Button variant="gradient" size="hero">
              Start Building
              <Rocket />
            </Button>

            <Button variant="workflow" size="hero">
              Launch Workflow
              <Workflow />
            </Button>

            <Button variant="aiGlow" size="hero">
              Run AI Agent
              <Brain />
            </Button>

            <Button variant="premium" size="hero">
              Upgrade
              <Crown />
            </Button>
          </div>
        </section>

        {/* VARIANT GROUPS */}
        {variantGroups.map((group) => (
          <section key={group.title} className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">{group.title}</h2>
              <p className="mt-2 text-muted-foreground">{group.description}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.variants.map((variant) => (
                <div
                  key={variant}
                  className={`rounded-3xl border border-white/50 p-6 shadow-xl ${group.cardClass}`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-white/70 px-3 py-1 font-mono text-xs text-muted-foreground">
                      {variant}
                    </span>

                    <Wand2 className="size-4 text-primary/70" />
                  </div>

                  <Button variant={variant} size="lg" className="w-full">
                    {variant}
                    <ArrowRight />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* SIZE */}
        <section className="mb-20 rounded-[2rem] border border-white/50 bg-card/95 p-10 shadow-2xl">
          <h2 className="mb-3 text-3xl font-bold">Sizing Scale</h2>
          <p className="mb-10 text-muted-foreground">
            Responsive sizing system for every interface surface.
          </p>

          <div className="flex flex-wrap items-end gap-5">
            {sizes.map((size) => (
              <Button key={size} variant="gradient" size={size}>
                {size}
              </Button>
            ))}
          </div>
        </section>

        {/* EFFECTS */}
        <section className="mb-20 rounded-[2rem] border border-white/50 bg-card/95 p-10 shadow-2xl">
          <h2 className="mb-3 text-3xl font-bold">Effects</h2>
          <p className="mb-10 text-muted-foreground">
            Motion and interaction states.
          </p>

          <div className="flex flex-wrap gap-5">
            <Button variant="shimmer" size="lg">
              Shimmer
              <Sparkles />
            </Button>

            <Button variant="shimmerGlass" size="lg">
              Glass Shimmer
              <Sparkles />
            </Button>

            <Button variant="glow" size="lg">
              Glow CTA
              <Zap />
            </Button>

            <Button variant="signal" size="lg">
              Signal
              <Signal />
            </Button>

            <Button variant="aurora" size="lg">
              Aurora
              <Bot />
            </Button>
          </div>
        </section>

        {/* LOADING */}
        <section className="mb-20 rounded-[2rem] border border-white/50 bg-card/95 p-10 shadow-2xl">
          <h2 className="mb-3 text-3xl font-bold">Loading States</h2>
          <p className="mb-10 text-muted-foreground">
            Async feedback patterns.
          </p>

          <div className="flex flex-wrap gap-5">
            <Button variant="loading" disabled>
              <Loader2 className="animate-spin" />
              Processing
            </Button>

            <Button variant="loadingGlass" disabled>
              <Loader2 className="animate-spin" />
              Authenticating
            </Button>

            <Button variant="workflow" disabled>
              <Loader2 className="animate-spin" />
              Running
            </Button>
          </div>
        </section>

        {/* TOASTS */}
        <section className="mb-20 rounded-[2rem] border border-white/50 bg-card/95 p-10 shadow-2xl">
          <h2 className="mb-3 text-3xl font-bold">Toasts</h2>
          <p className="mb-10 text-muted-foreground">
            Notification styles using sonner.
          </p>

          <div className="flex flex-wrap gap-5">
            <Button variant="default" onClick={() => toast("Default toast message")}>
              Default Toast
            </Button>
            <Button variant="success" onClick={() => toast.success("Success toast message")}>
              Success Toast
            </Button>
            <Button variant="destructive" onClick={() => toast.error("Error toast message")}>
              Error Toast
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Warning toast message")}>
              Warning Toast
            </Button>
            <Button variant="secondary" onClick={() => toast.info("Info toast message")}>
              Info Toast
            </Button>
            <Button variant="premium" onClick={() => toast("Upgraded to Pro!", { className: "toast-premium" })}>
              Premium Toast
            </Button>
            <Button variant="ghostBrand" onClick={() => toast("File saved securely", { className: "toast-secondary" })}>
              Secondary Toast
            </Button>
            <Button variant="brandCyan" onClick={() => toast("New message received", { className: "toast-cyan" })}>
              Cyan Toast
            </Button>
            <Button variant="loading" onClick={() => toast.loading("Uploading your files...")}>
              Loading Toast
            </Button>
            <Button variant="aiGlow" onClick={() => toast("AI action started", {
              description: "Generating your workflow...",
              icon: <Wand2 className="size-4" />
            })}>
              Custom Toast
            </Button>
          </div>
        </section>

        {/* FOOTER */}
        <section className="rounded-[2rem] border border-white/50 bg-card/95 p-14 text-center shadow-2xl">
          <h2 className="mb-4 text-4xl font-bold">
            Built for AI-native products
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Workflow-first interface primitives with premium visual identity.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Button variant="premium" size="hero">
              Launch Product
              <Rocket />
            </Button>

            <Link href="/">
              <Button variant="glass" size="hero">
                <Home />
                Back Home
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

