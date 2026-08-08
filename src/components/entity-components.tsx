import {
  AlertTriangleIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div
      className="
  flex
  flex-col
  gap-4
  rounded-3xl
  border
  border-blue-200/30
  bg-gradient-to-br
  from-white/95
  via-blue-50/90
  to-cyan-50/80
  p-6
  shadow-[0_10px_40px_rgba(37,99,235,0.06)]
  md:flex-row
  md:items-center
  md:justify-between
"
    >
      <div className="flex flex-col gap-1.5">
        <h1
          className="
  text-xl
  font-semibold
  tracking-tight
  text-slate-900
  md:text-2xl
"
        >
          {title}
        </h1>

        {description && (
          <p
            className="
  max-w-2xl
  text-sm
  leading-relaxed
  text-slate-500
"
          >
            {description}
          </p>
        )}
      </div>

      {onNew && !newButtonHref && (
        <Button
          disabled={isCreating || disabled}
          size="lg"
          variant={isCreating ? "shimmer" : "default"}
          className="w-40"
          onClick={onNew}
        >
          {isCreating ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <PlusIcon className="size-4" />
          )}
          {isCreating ? "Creating..." : newButtonLabel}
        </Button>
      )}

      {newButtonHref && !onNew && (
        <Button size="lg" variant="default" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};
type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};
export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="h-full p-6 md:px-10 md:py-8">
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col gap-y-10">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};
interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto w-[240px]">
      <div
        className="
      absolute
      inset-0
      rounded-xl
      bg-gradient-to-r
      from-blue-500/5
      to-cyan-500/5
    "
      />
      <SearchIcon className="pointer-events-none z-10 size-4 absolute left-3 top-1/2 -translate-y-1/2 text-sky-600" />
      <Input
        className="
  relative
  w-full
  border-sky-100
  bg-white/95
  pl-8
  shadow-sm
  focus-visible:border-sky-300
  focus-visible:ring-sky-500
"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}
export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          disabled={page === 1 || disabled}
          variant="glassPrimary"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant="glassPrimary"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
interface StateViewProps {
  message?: string;
}
interface LoadingViewProps extends StateViewProps {
  entity?: string;
}

export const LoadingView = ({ message }: LoadingViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-6">
      <div className="relative flex items-center justify-center size-14">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500/80"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner reverse rotating ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyan-500/80"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Center glowing pulse */}
        <div className="size-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
      </div>

      {!!message && <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-5 px-6">
      <div
  className="
    flex size-14 items-center justify-center
    rounded-2xl
    border border-indigo-200/50
    bg-gradient-to-br
    from-indigo-50
    via-blue-50
    to-cyan-50
    shadow-[0_10px_30px_rgba(79,70,229,0.08)]
  "
>
  <AlertTriangleIcon className="size-6 text-indigo-500" />
</div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-sm font-semibold text-slate-800">
          Something went wrong
        </h3>

        {!!message && (
          <p
            className="
              max-w-sm
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}
export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <div
      className="
        flex h-full flex-1 flex-col items-center justify-center
        animate-in fade-in slide-in-from-bottom-2 duration-500
        px-6
      "
    >
      <div className="relative flex max-w-sm flex-col items-center text-center">
        {/* Ambient Glow */}
        <div
          className="
            absolute
            -top-10
            h-40
            w-40
            rounded-full
            bg-gradient-to-r
            from-violet-400/15
            via-blue-400/15
            to-cyan-400/15
          "
        />

        {/* Floating Icon */}
        <div className="relative mb-6">
          {/* Orbital Ring */}
          <div
            className="
              absolute inset-0
              scale-125
              rounded-full
              border border-blue-200/40
            "
          />

          <div
            className="
              absolute inset-0
              scale-[1.45]
              rounded-full
              border border-cyan-200/30
            "
          />

          {/* Floating Dots */}
          <div className="absolute -left-3 top-3 size-2 rounded-full bg-violet-400/70" />
          <div className="absolute -right-4 top-8 size-2 rounded-full bg-cyan-400/70" />
          <div className="absolute bottom-0 left-0 size-2 rounded-full bg-blue-400/70" />

          {/* Main Icon Container */}
          <div
            className="
              relative
              flex h-20 w-20 items-center justify-center
              rounded-[28px]
              border border-white/70
              bg-gradient-to-br
              from-white
              via-blue-50
              to-cyan-50
              shadow-[0_20px_50px_rgba(79,70,229,0.12)]
              animate-[float_4s_ease-in-out_infinite]
            "
          >
            <PackageOpenIcon
              className="
                size-10
                text-foreground
                bg-gradient-to-br
                from-violet-500
                via-blue-500
                to-cyan-500
                bg-clip-text
              "
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3
            className="
              bg-gradient-to-r
              from-violet-700
              via-blue-600
              to-cyan-600
              bg-clip-text
              text-xl
              font-semibold
              text-transparent
            "
          >
            Nothing here yet
          </h3>

          <p
            className="
              max-w-xs
              text-sm
              leading-relaxed
              text-slate-500
            "
          >
            {message ||
              "Create your first workflow and start building powerful automations."}
          </p>
        </div>

        {/* CTA */}
        {!!onNew && (
          <Button
            onClick={onNew}
            size="lg"
            variant="shimmer"
            className="
              mt-7
          flex items-center
          transition-all transition-300 ease-in-out
              shadow-[0_12px_35px_rgba(79,70,229,0.18)]
            "
          >
            <PlusIcon className="size-4" />
            Create
          </Button>
        )}
      </div>
    </div>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}
export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}
export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving) return;
    setDropdownOpen(false);
    if (onRemove) await onRemove();
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "group overflow-hidden rounded-3xl border border-white/40 bg-white/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200/40 hover:shadow-[0_12px_30px_rgba(37,99,235,0.08)] hover:bg-gradient-to-r hover:from-blue-50/90 hover:via-white hover:to-cyan-50/80 focus-visible:ring-2 focus-visible:ring-blue-300/40 focus-visible:ring-offset-2",
          isRemoving && "scale-95 opacity-40 pointer-events-none-[1px]",
          className,
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {image && (
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                {image}
              </div>
            )}
            <div>
              <CardTitle
                className={cn(
                  "text-base  font-medium  text-slate-900  transition-colors  duration-200  group-hover:text-blue-700  ",
                  isRemoving && "text-destructive/60",
                )}
              >
                {title}
              </CardTitle>
              {!!subtitle && (
                <CardDescription className="text-xs">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex gap-x-4 items-center">
              {actions}
              {onRemove && (
                <DropdownMenu
                  open={dropdownOpen}
                  onOpenChange={setDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon-lg"
                      variant="ghost"
                      className="rounded-xl hover:bg-blue-50 hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isRemoving ? (
                        <Loader2Icon className="size-4 animate-spin text-destructive/60" />
                      ) : (
                        <MoreVerticalIcon className="size-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem
                      className="
    text-red-600
    focus:text-red-600
    focus:bg-red-50
    cursor-pointer
  "
                      onClick={handleRemove}
                    >
                      <TrashIcon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
