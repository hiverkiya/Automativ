"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({
  open,
  onOpenChange,
}: UpgradeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);

      await authClient.checkout({
        slug: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_SLUG!,
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          overflow-hidden
          border
          border-blue-200/50
          bg-gradient-to-br
          from-white
          via-blue-50/95
          to-cyan-50/90
          shadow-[0_25px_80px_rgba(37,99,235,0.10)]
        "
      >
        {/* Top Accent */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-indigo-500
            via-blue-500
            to-cyan-500
          "
        />

        {/* Ambient Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -top-20
            left-1/2
            h-48
            w-48
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-indigo-500/15
            via-blue-500/15
            to-cyan-500/15
          "
        />

        <AlertDialogHeader className="relative z-10 space-y-5">
          

          <div className="space-y-2">
            <AlertDialogTitle
              className="
                bg-gradient-to-r
                from-indigo-700
                via-blue-600
                to-cyan-600
                bg-clip-text
                text-2xl
                font-bold
                tracking-tight
                text-transparent
              "
            >
              Unlock Automativ Pro
            </AlertDialogTitle>

            <AlertDialogDescription
              className="
                max-w-md
                text-sm
                leading-relaxed
                text-slate-600
              "
            >
              Access premium AI models, advanced workflow capabilities,
              higher usage limits, and future Pro features as Automativ grows.
            </AlertDialogDescription>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="size-2 rounded-full bg-indigo-500" />
              Premium AI Models
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="size-2 rounded-full bg-blue-500" />
              Unlimited Workflows
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="size-2 rounded-full bg-cyan-500" />
              Advanced Automations
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="size-2 rounded-full bg-sky-500" />
              Future Pro Features
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="relative z-10 mt-2 gap-2">
          <AlertDialogCancel asChild>
            <Button
              variant="ghostSoft"
              className="
                border-blue-200/40
                bg-white/95
              "
            >
              Maybe Later
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="aurora"
              disabled={isLoading}
              onClick={handleUpgrade}
              className="
                min-w-[180px]
                shadow-[0_12px_35px_rgba(37,99,235,0.18)]
              "
            >
              {isLoading ? "Redirecting..." : "Upgrade to Pro"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
