"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "@/components/ui/sonner";
import { generateGoogleFormScript } from "./utils";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleFormTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const [scriptCopied, setScriptCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const workflowId = params.workflowId as string;
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
  const webhookUrl = `${baseUrl}/api/webhooks/google-form?workflowId=${workflowId}`;
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);

      setUrlCopied(true);
      toast.info("Webhook URL copied");

      setTimeout(() => setUrlCopied(false), 1500);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const copyScript = async () => {
    try {
      const script = generateGoogleFormScript(webhookUrl);

      await navigator.clipboard.writeText(script);

      setScriptCopied(true);
      toast.info("Script copied");

      setTimeout(() => setScriptCopied(false), 1500);
    } catch {
      toast.error("Failed to copy script");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
sm:max-w-lg


      [&>button]:transition-all
      [&>button]:duration-200
      [&>button]:ease-out
      [&>button]:rounded-md
      [&>button]:p-1
      [&>button]:hover:bg-muted
      [&>button]:hover:scale-110
      [&>button]:active:scale-95
    "
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2">
             <Image src="/googleform.svg" alt="Google Form" width={18} height={18} />
            Google Form Trigger
          </DialogTitle>

          <DialogDescription className="text-sm">
            Connect a Google Form and automatically trigger this workflow
            whenever a response is submitted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div
            className="
          rounded-xl
          border
          border-sky-200/50
          bg-gradient-to-r
          from-sky-50
          via-white
          to-cyan-50
          p-3
          space-y-2
        "
          >
            <Label htmlFor="webhook-url">Webhook URL</Label>

            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}

                readOnly
                className="
font-mono
text-xs
bg-white
min-w-0
truncate
"
              />

              <Button
                type="button"
                size="icon"
                variant="workflowSoft"
                onClick={copyToClipboard}
              >
                {urlCopied ? (
                  <CheckIcon className="size-4 text-emerald-600 transition-all duration-200" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </Button>
            </div>
          </div>

          <div
            className="
          rounded-xl
          border
          border-sky-200/40
          bg-gradient-to-r
          from-sky-50/60
          via-white
          to-cyan-50/40
          p-3
          space-y-3
        "
          >
            <h4 className="text-sm font-semibold text-slate-800">
              Setup Instructions
            </h4>

            <ol className="space-y-1.5 text-sm text-muted-foreground">
              {[
                "Open your Google Form",
                "Click the three-dot menu → Apps Script editor",
                "Copy and paste the Google Apps script listed below",
                "Replace WEBHOOK_URL with the URL listed above",
                "Save & Go to Triggers → Add Trigger",
                "Function to run: onFormSubmit",
                "Select Event Source: From form",
                "Select Event Type: On form submit",
                "Save and authorize the script",
                "Submit the form once to verify the workflow runs",
              ].map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span
                    className="
  flex
  size-5
  shrink-0
  items-center
  justify-center
  rounded-full
  bg-sky-100
  text-[10px]
  font-semibold
  text-sky-700
"
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="
          rounded-xl
          border
          border-violet-200/40
          bg-gradient-to-r
          from-violet-50/60
          via-white
          to-fuchsia-50/40
          p-3
          space-y-3
        "
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-800">
                Google Apps Script
              </h4>

              <Button
                type="button"
                size="sm"
                variant="workflowSoft"
                onClick={copyScript}
                className="w-[120px]"
              >
                {scriptCopied ? (
                  <>
                    <CheckIcon className="size-4 text-emerald-600 transition-all duration-200" />{" "}
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="size-4" />
                    Copy Script
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Includes your webhook URL and automatically forwards form
              submissions to Automativ.
            </p>

            <p className="text-xs text-slate-500">
              Submit the form once after setup to verify the workflow executes
              correctly.
            </p>
          </div>

          <div
            className="
          rounded-xl
          border
          border-emerald-200/40
          bg-gradient-to-r
          from-emerald-50/60
          via-white
          to-green-50/40
          p-3
          space-y-3
        "
          >
            <h4 className="text-sm font-semibold text-slate-800">
              Available Variables
            </h4>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <code
                  className="
rounded-md
border
border-emerald-200/60
bg-emerald-50
px-2
py-1
font-mono
text-xs
text-emerald-800
max-w-full
break-all
"
                >
                  {"{{googleForm.respondentEmail}}"}
                </code>

                <span className="text-xs text-muted-foreground">
                  Respondent email
                </span>
              </div>

              <div className="flex items-center gap-2">
                <code
                  className="
rounded-md
border
border-emerald-200/60
bg-emerald-50
px-2
py-1
font-mono
text-xs
text-emerald-800
max-w-full
break-all
"
                >
                  {"{{googleForm.responses['Question Name']}}"}
                </code>

                <span className="text-xs text-muted-foreground">
                  Specific answer
                </span>
              </div>

              <div className="flex items-center gap-2">
                <code
                  className="
rounded-md
border
border-emerald-200/60
bg-emerald-50
px-2
py-1
font-mono
text-xs
text-emerald-800
max-w-full
break-all
"
                >
                  {"{{googleForm.responses}}"}
                </code>

                <span className="text-xs text-muted-foreground">
                  All responses as JSON
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
