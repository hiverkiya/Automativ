"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Sparkles, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const icons = [
  "/github.svg",
  "/google.svg",
  "/openai.svg",
  "/slack.svg",
  "/discord.svg",
  "/vercel.svg",
  "/stripe.svg",
  "/anthropic.svg",
];

const nodes = [
  { id: 0, x: 60, y: 12, icon: icons[0] }, // top-left
  { id: 1, x: 82, y: 10, icon: icons[1] }, // top-right

  { id: 2, x: 55, y: 38, icon: icons[2] }, // left
  { id: 3, x: 92, y: 35, icon: icons[3] }, // right

  { id: 4, x: 56, y: 65, icon: icons[4] }, // lower-left
  { id: 5, x: 88, y: 75, icon: icons[5] }, // lower-right

  { id: 6, x: 70, y: 84, icon: icons[6] }, // bottom
  { id: 7, x: 70, y: 6, icon: icons[7] }, // top center
];

const connections = [
  [0, 2],
  [2, 4],
  [1, 3],
  [3, 5],
  [6, 2],
  [2, 3],
];

const brandPills = [
  {
    name: "OpenAI",
    className:
      "bg-gradient-to-r from-sky-50 via-blue-50 to-cyan-50 text-blue-700 border-blue-200/70",
  },
  {
    name: "Anthropic",
    className:
      "bg-gradient-to-r from-stone-50 via-orange-50 to-amber-50 text-stone-700 border-orange-200/70",
  },
  {
    name: "Google",
    className:
      "bg-gradient-to-r from-blue-50 via-red-50 to-yellow-50 text-slate-700 border-slate-200",
  },
  {
    name: "Slack",
    className:
      "bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50 text-blue-700 border-blue-200/70",
  },
  {
    name: "Stripe",
    className:
      "bg-gradient-to-r from-sky-50 via-blue-50 to-cyan-50 text-blue-700 border-blue-200/70",
  },
  {
    name: "GitHub",
    className:
      "bg-gradient-to-r from-slate-50 via-zinc-50 to-neutral-50 text-slate-700 border-slate-200/70",
  },
  {
    name: "Discord",
    className:
      "bg-gradient-to-r from-sky-50 via-blue-50 to-cyan-50 text-blue-700 border-blue-200/70",
  },
  {
    name: "Vercel",
    className:
      "bg-gradient-to-r from-zinc-50 via-neutral-50 to-slate-50 text-zinc-700 border-zinc-200/70",
  },
];
function LearningsButton() {
  return (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="fixed! bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full  px-6 "
    >
      <Link href="/learnings" target="_blank" prefetch>
        <span>What I Learned Building Automativ</span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}
function BackgroundAnimation() {
  return (
    <div className="pointer-events-none absolute inset-y-0 -right-[8%]  w-[135%] overflow-hidden">
      <motion.div
        className="absolute top-[2%] right-[14%] h-[340px] w-[340px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.16), transparent 48%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] right-[8%] h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.14), transparent 68%)",
        }}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.75, 0.95, 0.75],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg className="absolute inset-0 h-full w-full">
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="rgba(99,102,241,0.28)"
            strokeWidth="1"
            animate={{
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: 4,
              delay: i * 0.35,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>

      <svg className="absolute inset-0 h-full w-full">
        {connections.map(([from, to], i) => (
          <motion.circle
            key={i}
            r="2.8"
            fill="#06b6d4"
            initial={{
              cx: `${nodes[from].x}%`,
              cy: `${nodes[from].y}%`,
            }}
            animate={{
              cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
              cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              delay: i * 1.05,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex h-12 w-12  items-center justify-center rounded-2xl border border-white/50 bg-white/95 shadow-xl"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            y: [-4, 4, -4],
            scale: [0.98, 1.03, 0.98],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 6 + i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image src={node.icon} alt="" width={22} height={22} />
        </motion.div>
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(248,250,252,1) 0%, rgba(248,250,252,0.94) 18%, rgba(248,250,252,0.55) 34%, transparent 56%)",
        }}
      />
    </div>
  );
}
function Feature({
  icon,
  title,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  gradient: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{ duration: 0.18 }}
      className="flex items-center gap-3 rounded-3xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg hover:bg-white"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}
      >
        {icon}
      </div>

      <span className="text-sm font-semibold tracking-tight">{title}</span>
    </motion.div>
  );
}

function WorkflowPreview() {
  return (
    <div className="mt-7 rounded-3xl border border-white/60 bg-white/95 p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Workflow Execution</p>
          <p className="text-[11px] text-muted-foreground">
            Executing workflow in real time
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Running
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {["Webhook", "OpenAI", "Discord", "Stripe", "Completed"].map(
          (step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-xs font-medium shadow-sm">
                {step}
              </div>
              {i < 4 && <ArrowRight className="size-3.5 text-cyan-500" />}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cursor-automativ relative h-screen overflow-hidden bg-background">
      <BackgroundAnimation />

      <div className="relative z-10 grid h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center px-14 xl:px-20">
          <Link href="/" className="mb-8 inline-flex w-fit items-center gap-2">
            <Image src="/logo.svg" alt="Automativ" width={54} height={54} />
            <span className="-ml-4 text-4xl font-bold tracking-tight">
              utomativ
            </span>
          </Link>

          <div className="max-w-2xl">
            <h1 className="mb-5 text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-slate-900">
              Automate work.
              <br />
              Orchestrate agents.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500">
                Scale execution.
              </span>
            </h1>



            <div className="mb-6 flex flex-wrap gap-2">
              {brandPills.map((brand) => (
                <div
                  key={brand.name}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium",
                    "bg-white/50",
                    "transition-all duration-200",
                    "hover:scale-105 hover:shadow-md",
                    brand.className,
                  )}
                >
                  {brand.name}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Feature
                icon={<Workflow className="size-4" />}
                title="Drag & Drop Workflows"
                gradient="from-blue-500 to-sky-500"
              />

              <Feature
                icon={<Bot className="size-4" />}
                title="Multi-Agent Execution"
                gradient="from-cyan-500 to-blue-500"
              />

              <Feature
                icon={<Cpu className="size-4" />}
                title="Production Monitoring"
                gradient="from-emerald-500 to-teal-500"
              />

              <Feature
                icon={<Sparkles className="size-4" />}
                title="Real-Time Automation"
                gradient="from-amber-500 to-orange-500"
              />
            </div>

            <WorkflowPreview />
            <LearningsButton />
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-4 md:px-10">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-sky-500/20 to-cyan-500/30" />

            <div className="relative rounded-[2rem] border border-white/50 bg-white/95 p-2 shadow-[0_25px_80px_-20px_rgba(99,102,241,0.25)] md:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-[2rem] bg-gradient-to-b from-white/40 to-transparent" />
              <div className="pointer-events-none absolute inset-2 rounded-[1.65rem] border border-white/20" />

              <div className="relative mb-5 flex items-center gap-3 lg:hidden">
                <Image src="/logo.svg" alt="Automativ" width={42} height={42} />
                <span className="text-xl font-bold">Automativ</span>
              </div>

              <div className="relative">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
