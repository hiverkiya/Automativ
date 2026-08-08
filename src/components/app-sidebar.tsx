"use client";

import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";
import {
  BookOpenIcon,
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const brandFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const menuItems = [
  {
    title: "Home",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions History",
        icon: HistoryIcon,
        url: "/executions",
      },
      {
        title: "Project Learnings",
        icon: BookOpenIcon,
        url: "/learnings",
        newTab: true,
      },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/50 bg-white/75"
    >
      <SidebarHeader className="border-b border-white/40 px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Automativ"
              className="
                group
                h-[52px]
                rounded-2xl
                px-2
                transition-all
                duration-300
                scale-105
                -translate-y-0.5
                bg-gradient-to-r
               from-blue-500/10
                to-cyan-500/10
                shadow-lg
                shadow-blue-500/10
                group-data-[collapsible=icon]:!p-0
                group-data-[collapsible=icon]:!justify-center
              "
            >
              <Link
                href="/workflows"
                prefetch
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  group-data-[collapsible=icon]:justify-center
                  group-data-[collapsible=icon]:gap-0
                "
              >
                <Image
                  src="/logo.svg"
                  alt="Automativ"
                  width={40}
                  height={40}
                  priority
                  className="shrink-0 transition-transform duration-300 scale-110"
                />

                <span
                  className={`
                    ${brandFont.className}
                    text-3xl
                    font-bold
                    tracking-[-0.035em]
                    text-slate-900
                    group-data-[collapsible=icon]:hidden
                  `}
                >
                  Automativ
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems[0].items.map((item) => {
                const isActive =
                  item.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      onClick={() => {
                        if (item.newTab) window.open(item.url, "_blank");
                        else router.push(item.url);
                      }}
                      className={`
                        group
                        h-11
                        rounded-2xl
                        px-4
                        text-sm
                        font-medium
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border border-blue-300/30 bg-gradient-to-r from-blue-500/12 via-blue-500/8 to-cyan-500/10 text-primary shadow-md scale-105 -translate-y-0.5"
                            : "text-slate-600 hover:text-slate-900 hover:border-blue-200/40 hover:bg-gradient-to-r hover:from-blue-500/8 hover:via-blue-500/6 hover:to-cyan-500/8 hover:shadow-lg hover:shadow-blue-500/5 hover:scale-105 hover:-translate-y-0.5"
                        }
                      `}
                    >
                      <div className="flex w-full items-center gap-3">
                        <item.icon
                          className={`size-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "text-primary scale-110" : ""
                          }`}
                        />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/40 px-2 py-3">
        <SidebarMenu className="space-y-2">
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
               className="
  group
  h-11
  rounded-2xl
  border
  border-blue-200/50
  bg-gradient-to-r
  from-blue-50
  via-sky-50
  to-cyan-50
  px-4
  text-blue-800
  shadow-[0_8px_24px_rgba(37,99,235,0.08)]
  transition-all
  duration-300
  hover:border-blue-300
  hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)]
  hover:-translate-y-0.5
"
                onClick={() =>
                  authClient.checkout({
                    slug: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_SLUG!,
                  })
                }
              >
                <div className="flex w-full items-center gap-3">
                  <div
                    className="
        flex
        size-6
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-[var(--brand-premium)]/15
        to-[var(--brand-primary)]/15
      "
                  >
                    <StarIcon
                      className="
          size-3.5
          text-[var(--color-chart-1)]
          transition-transform
          duration-300
          group-hover:rotate-12
        "
                    />
                  </div>

                  <span className="font-medium">Upgrade to Pro</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {isLoading && (
            <SidebarMenuItem>
              <div
                className="
      h-11
      rounded-2xl
      border
      border-blue-100/40
      bg-gradient-to-r
      from-blue-50/60
      via-white
      to-cyan-50/60
      animate-pulse
    "
              />
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="
  group
  h-11
  rounded-2xl
  px-4

  border
  border-blue-200/50
  bg-gradient-to-r
  from-blue-50
  via-blue-50
  to-cyan-50
  shadow-[0_8px_24px_rgba(37,99,235,0.08)]
  transition-all
  duration-200
  hover:border-blue-300
  hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)]
  hover:-translate-y-0.5
"
              onClick={() => authClient.customer.portal()}
            >
              <div className="flex w-full items-center gap-3">
                <CreditCardIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
                <span>Billing Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="
                group
                h-11
                rounded-2xl
                px-4
                text-red-500
                transition-all
                duration-300
                hover:bg-red-500/10
                hover:text-red-600
                hover:scale-105
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-red-500/10
                active:scale-[0.985]
                active:translate-y-0
              "
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
            >
              <div className="flex w-full items-center gap-3">
                <LogOutIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
