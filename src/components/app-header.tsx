import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = () => {
  return (
    <header
      className="
    sticky
    top-0
    z-30
    flex
    h-15
    shrink-0
    items-center
    justify-between
    border-b
    border-white/60
    bg-white/80
    shadow-[0_1px_0_rgba(255,255,255,0.5)]
  "
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger
          className="
    group
    !flex
    !h-8
    !w-8
    !p-0
    !items-center
    !justify-center
rounded-2xl
    ml-2

  "
        />
        <div className="h-6 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
        <div className="hidden md:flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Workspace
          </span>

          <span className="text-xs text-slate-500">
            AI workflow orchestration
          </span>
        </div>
      </div>
    </header>
  );
};
